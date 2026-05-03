import { type ResourceKind } from "@/generated/prisma/client";
import { AppError } from "@/lib/api";
import { db } from "@/lib/db";
import { savePdfUpload } from "@/lib/storage";
import { createNotification, recalculateUserReputation } from "@/server/reputation";

export async function createPost({
  userId,
  title,
  content,
  kind,
  communityId,
  tags,
}: {
  userId: string;
  title: string;
  content: string;
  kind: "QUESTION" | "DISCUSSION" | "PROJECT";
  communityId?: string | null;
  tags: string[];
}) {
  if (communityId) {
    const membership = await db.communityMembership.findFirst({
      where: { userId, communityId },
      select: { id: true },
    });

    if (!membership) {
      throw new AppError("Join the community before posting inside it.", 403);
    }
  }

  const post = await db.post.create({
    data: {
      authorId: userId,
      title,
      content,
      kind,
      communityId: communityId ?? null,
      tags,
    },
    select: {
      id: true,
      community: {
        select: { slug: true },
      },
    },
  });

  if (communityId) {
    const community = await db.community.findUnique({
      where: { id: communityId },
      select: { id: true, name: true, slug: true },
    });

    if (community) {
      const members = await db.communityMembership.findMany({
        where: {
          communityId,
          userId: { not: userId },
        },
        select: { userId: true },
      });

      await Promise.all(
        members.slice(0, 12).map((member) =>
          createNotification({
            userId: member.userId,
            type: "COMMUNITY_ACTIVITY",
            title: `New post in ${community.name}`,
            body: title,
            href: `/communities/${community.slug}`,
          }),
        ),
      );
    }
  }

  await recalculateUserReputation(userId);

  return post;
}

export async function createAnswer({
  userId,
  postId,
  content,
}: {
  userId: string;
  postId: string;
  content: string;
}) {
  const post = await db.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      authorId: true,
      title: true,
      community: {
        select: { slug: true },
      },
    },
  });

  if (!post) {
    throw new AppError("The original post no longer exists.", 404);
  }

  const answer = await db.answer.create({
    data: {
      postId,
      authorId: userId,
      content,
    },
    select: { id: true },
  });

  if (post.authorId !== userId) {
    await createNotification({
      userId: post.authorId,
      type: "ANSWER_POSTED",
      title: "New answer on your post",
      body: post.title,
      href: post.community?.slug ? `/communities/${post.community.slug}` : "/feed",
    });
  }

  await recalculateUserReputation(userId);

  return answer;
}

async function toggleVote<T extends "post" | "answer">({
  target,
  targetId,
  userId,
  value,
}: {
  target: T;
  targetId: string;
  userId: string;
  value: 1 | -1;
}) {
  if (target === "post") {
    const existing = await db.postVote.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: targetId,
        },
      },
    });

    if (existing?.value === value) {
      await db.postVote.delete({ where: { id: existing.id } });
    } else if (existing) {
      await db.postVote.update({ where: { id: existing.id }, data: { value } });
    } else {
      await db.postVote.create({
        data: { userId, postId: targetId, value },
      });
    }

    const post = await db.post.findUnique({
      where: { id: targetId },
      select: { authorId: true },
    });

    if (post) {
      await recalculateUserReputation(post.authorId);
    }

    return;
  }

  const existing = await db.answerVote.findUnique({
    where: {
      userId_answerId: {
        userId,
        answerId: targetId,
      },
    },
  });

  if (existing?.value === value) {
    await db.answerVote.delete({ where: { id: existing.id } });
  } else if (existing) {
    await db.answerVote.update({ where: { id: existing.id }, data: { value } });
  } else {
    await db.answerVote.create({
      data: { userId, answerId: targetId, value },
    });
  }

  const answer = await db.answer.findUnique({
    where: { id: targetId },
    select: { authorId: true },
  });

  if (answer) {
    await recalculateUserReputation(answer.authorId);
  }
}

export async function togglePostVote(userId: string, postId: string, value: 1 | -1) {
  await toggleVote({ target: "post", targetId: postId, userId, value });
}

export async function toggleAnswerVote(userId: string, answerId: string, value: 1 | -1) {
  await toggleVote({ target: "answer", targetId: answerId, userId, value });
}

export async function acceptAnswer(userId: string, answerId: string) {
  const answer = await db.answer.findUnique({
    where: { id: answerId },
    select: {
      id: true,
      authorId: true,
      post: {
        select: {
          id: true,
          authorId: true,
          title: true,
        },
      },
    },
  });

  if (!answer) {
    throw new AppError("Answer not found.", 404);
  }

  if (answer.post.authorId !== userId) {
    throw new AppError("Only the original author can accept an answer.", 403);
  }

  await db.post.update({
    where: { id: answer.post.id },
    data: { acceptedAnswerId: answer.id },
  });

  if (answer.authorId !== userId) {
    await createNotification({
      userId: answer.authorId,
      type: "ANSWER_ACCEPTED",
      title: "Your answer was marked as best",
      body: answer.post.title,
      href: "/feed",
    });
  }

  await recalculateUserReputation(answer.authorId);
}

export async function createCommunity({
  userId,
  name,
  description,
  topicColor,
  slug,
}: {
  userId: string;
  name: string;
  description: string;
  topicColor: string;
  slug: string;
}) {
  const community = await db.community.create({
    data: {
      name,
      description,
      topicColor,
      slug,
      createdById: userId,
      memberships: {
        create: {
          userId,
          role: "OWNER",
        },
      },
    },
    select: { slug: true },
  });

  return community;
}

export async function joinCommunity(userId: string, slug: string) {
  const community = await db.community.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!community) {
    throw new AppError("Community not found.", 404);
  }

  await db.communityMembership.upsert({
    where: {
      userId_communityId: {
        userId,
        communityId: community.id,
      },
    },
    update: {},
    create: {
      communityId: community.id,
      userId,
    },
  });
}

export async function toggleBookmark(userId: string, postId: string) {
  const existing = await db.bookmark.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
    select: { id: true },
  });

  if (existing) {
    await db.bookmark.delete({ where: { id: existing.id } });
    return false;
  }

  await db.bookmark.create({
    data: { userId, postId },
  });

  return true;
}

export async function createResource({
  userId,
  title,
  description,
  kind,
  communityId,
  tags,
  linkUrl,
  notes,
  file,
}: {
  userId: string;
  title: string;
  description: string;
  kind: ResourceKind;
  communityId?: string | null;
  tags: string[];
  linkUrl?: string | null;
  notes?: string | null;
  file?: File | null;
}) {
  if (communityId) {
    const membership = await db.communityMembership.findFirst({
      where: { userId, communityId },
      select: { id: true },
    });

    if (!membership) {
      throw new AppError("Join the community before sharing resources there.", 403);
    }
  }

  let fileInfo: { fileUrl: string; fileName: string } | null = null;

  if (kind === "PDF") {
    if (!file) {
      throw new AppError("Please upload a PDF file.", 400);
    }

    fileInfo = await savePdfUpload(file, userId);
  }

  const resource = await db.resource.create({
    data: {
      authorId: userId,
      communityId: communityId ?? null,
      title,
      description,
      kind,
      tags,
      linkUrl: linkUrl ?? null,
      notes: notes ?? null,
      fileUrl: fileInfo?.fileUrl ?? null,
      fileName: fileInfo?.fileName ?? null,
    },
    select: { id: true },
  });

  await recalculateUserReputation(userId);

  return resource;
}

export async function updateProfile({
  userId,
  name,
  college,
  bio,
  interests,
  skills,
}: {
  userId: string;
  name: string;
  college: string;
  bio: string;
  interests: string[];
  skills: string[];
}) {
  return db.user.update({
    where: { id: userId },
    data: {
      name,
      college,
      bio,
      interests,
      skills,
    },
    select: { id: true },
  });
}

export async function createOrGetConversation(userId: string, recipientId: string) {
  if (userId === recipientId) {
    throw new AppError("You cannot message yourself.", 400);
  }

  const sharedConversation = await db.conversation.findFirst({
    where: {
      AND: [
        { participants: { some: { userId } } },
        { participants: { some: { userId: recipientId } } },
      ],
    },
    select: { id: true },
  });

  if (sharedConversation) {
    return sharedConversation.id;
  }

  const conversation = await db.conversation.create({
    data: {
      participants: {
        createMany: {
          data: [{ userId }, { userId: recipientId }],
        },
      },
    },
    select: { id: true },
  });

  return conversation.id;
}

export async function sendMessage({
  userId,
  conversationId,
  recipientId,
  body,
}: {
  userId: string;
  conversationId?: string | null;
  recipientId?: string | null;
  body: string;
}) {
  const resolvedConversationId =
    conversationId ?? (recipientId ? await createOrGetConversation(userId, recipientId) : null);

  if (!resolvedConversationId) {
    throw new AppError("Choose a conversation or recipient first.", 400);
  }

  const participant = await db.conversationParticipant.findFirst({
    where: {
      conversationId: resolvedConversationId,
      userId,
    },
    select: { id: true },
  });

  if (!participant) {
    throw new AppError("You cannot post in this conversation.", 403);
  }

  const message = await db.message.create({
    data: {
      conversationId: resolvedConversationId,
      senderId: userId,
      body,
    },
    select: { id: true },
  });

  await db.conversation.update({
    where: { id: resolvedConversationId },
    data: { updatedAt: new Date() },
  });

  const recipients = await db.conversationParticipant.findMany({
    where: {
      conversationId: resolvedConversationId,
      userId: { not: userId },
    },
    select: { userId: true },
  });

  await Promise.all(
    recipients.map((recipient) =>
      createNotification({
        userId: recipient.userId,
        type: "MESSAGE_RECEIVED",
        title: "New direct message",
        body: body.slice(0, 140),
        href: `/messages?conversation=${resolvedConversationId}`,
      }),
    ),
  );

  return {
    id: message.id,
    conversationId: resolvedConversationId,
  };
}

export async function markNotificationsRead(userId: string) {
  await db.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
}
