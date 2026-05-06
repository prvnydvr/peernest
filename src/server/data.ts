import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { createExcerpt } from "@/lib/utils";
import { scorePostForTrending } from "@/lib/ranking";
import type {
  AnswerCardData,
  CommunitySummary,
  ConversationSummary,
  PostCardData,
  ResourceCardData,
  UserSummary,
} from "@/lib/view-models";

function mapUserSummary(user: {
  id: string;
  name: string;
  username: string;
  avatarUrl: string | null;
  college?: string | null;
  reputation?: number;
}): UserSummary {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    avatarUrl: user.avatarUrl,
    college: user.college ?? null,
    reputation: user.reputation,
  };
}

function mapCommunitySummary(community: {
  id: string;
  name: string;
  slug: string;
  topicColor: string;
  description: string;
  _count?: {
    memberships: number;
    posts: number;
    resources: number;
  };
}): CommunitySummary {
  return {
    id: community.id,
    name: community.name,
    slug: community.slug,
    topicColor: community.topicColor,
    description: community.description,
    memberCount: community._count?.memberships,
    postCount: community._count?.posts,
    resourceCount: community._count?.resources,
  };
}

function mapPostCard(post: {
  id: string;
  title: string;
  content: string;
  kind: "QUESTION" | "DISCUSSION" | "PROJECT";
  tags: string[];
  createdAt: Date;
  acceptedAnswerId: string | null;
  author: {
    id: string;
    name: string;
    username: string;
    avatarUrl: string | null;
    college: string | null;
    reputation: number;
  };
  community: {
    id: string;
    name: string;
    slug: string;
    topicColor: string;
    description: string;
  } | null;
  answers: { id: string }[];
  votes: { userId: string; value: number }[];
  bookmarks: { id: string }[];
}, viewerId?: string): PostCardData {
  const upvotes = post.votes.filter((vote) => vote.value > 0).length;
  const downvotes = post.votes.filter((vote) => vote.value < 0).length;

  return {
    id: post.id,
    title: post.title,
    content: createExcerpt(post.content, 220),
    kind: post.kind,
    tags: post.tags,
    createdAt: post.createdAt,
    acceptedAnswerId: post.acceptedAnswerId,
    answerCount: post.answers.length,
    upvotes,
    downvotes,
    viewerVote: post.votes.find((vote) => vote.userId === viewerId)?.value ?? 0,
    isBookmarked: post.bookmarks.length > 0,
    author: mapUserSummary(post.author),
    community: post.community ? mapCommunitySummary(post.community) : null,
    trendingScore: scorePostForTrending({
      upvotes,
      downvotes,
      answers: post.answers.length,
      createdAt: post.createdAt,
    }),
  };
}

function mapAnswerCard(answer: {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    username: string;
    avatarUrl: string | null;
    college: string | null;
    reputation: number;
  };
  votes: { value: number }[];
} & { isAccepted: boolean; viewerVote: number }): AnswerCardData {
  const upvotes = answer.votes.filter((vote) => vote.value > 0).length;
  const downvotes = answer.votes.filter((vote) => vote.value < 0).length;

  return {
    id: answer.id,
    content: answer.content,
    createdAt: answer.createdAt,
    author: mapUserSummary(answer.author),
    upvotes,
    downvotes,
    viewerVote: answer.viewerVote,
    isAccepted: answer.isAccepted,
  };
}

function mapResourceCard(resource: {
  id: string;
  title: string;
  description: string;
  kind: "LINK" | "PDF" | "NOTE";
  linkUrl: string | null;
  fileUrl: string | null;
  fileName: string | null;
  notes: string | null;
  tags: string[];
  createdAt: Date;
  author: {
    id: string;
    name: string;
    username: string;
    avatarUrl: string | null;
    college: string | null;
    reputation: number;
  };
  community: {
    id: string;
    name: string;
    slug: string;
    topicColor: string;
    description: string;
  } | null;
}): ResourceCardData {
  return {
    id: resource.id,
    title: resource.title,
    description: resource.description,
    kind: resource.kind,
    linkUrl: resource.linkUrl,
    fileUrl: resource.fileUrl,
    fileName: resource.fileName,
    notes: resource.notes,
    tags: resource.tags,
    createdAt: resource.createdAt,
    author: mapUserSummary(resource.author),
    community: resource.community ? mapCommunitySummary(resource.community) : null,
  };
}

export async function getAppShellData(userId: string) {
  const [sidebarCommunities, unreadNotifications] = await Promise.all([
    db.communityMembership.findMany({
      where: { userId },
      orderBy: {
        community: {
          name: "asc",
        },
      },
      select: {
        role: true,
        community: {
          select: {
            id: true,
            name: true,
            slug: true,
            topicColor: true,
            description: true,
          },
        },
      },
    }),
    db.notification.count({
      where: {
        userId,
        isRead: false,
      },
    }),
  ]);

  return {
    sidebarCommunities: sidebarCommunities.map(({ community, role }) => ({
      ...mapCommunitySummary(community),
      role,
      isJoined: true,
    })),
    unreadNotifications,
  };
}

export async function getFeedPageData(userId: string, sort: "trending" | "latest") {
  const joinedCommunitiesPromise = db.communityMembership.findMany({
    where: { userId },
    select: { communityId: true },
  });
  const suggestionsPromise = db.community.findMany({
    where: {
      memberships: {
        none: { userId },
      },
    },
    take: 4,
    orderBy: {
      memberships: {
        _count: "desc",
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      topicColor: true,
      description: true,
      _count: {
        select: {
          memberships: true,
          posts: true,
          resources: true,
        },
      },
    },
  });
  const contributorsPromise = db.user.findMany({
    take: 4,
    orderBy: { reputation: "desc" },
    select: {
      id: true,
      name: true,
      username: true,
      avatarUrl: true,
      college: true,
      reputation: true,
    },
  });

  const joinedCommunities = await joinedCommunitiesPromise;
  const joinedCommunityIds = joinedCommunities.map((item) => item.communityId);

  const [posts, suggestions, contributors] = await Promise.all([
    db.post.findMany({
      where: {
        OR: [{ communityId: { in: joinedCommunityIds } }, { communityId: null }],
      },
      orderBy: { createdAt: "desc" },
      take: 24,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            avatarUrl: true,
            college: true,
            reputation: true,
          },
        },
        community: {
          select: {
            id: true,
            name: true,
            slug: true,
            topicColor: true,
            description: true,
          },
        },
        answers: {
          select: { id: true },
        },
        votes: {
          select: { userId: true, value: true },
        },
        bookmarks: {
          where: { userId },
          select: { id: true },
        },
      },
    }),
    suggestionsPromise,
    contributorsPromise,
  ]);

  const postCards = posts.map((post) =>
    mapPostCard({
      ...post,
      kind: post.kind as PostCardData["kind"],
    }, userId),
  );

  const personalizedPosts =
    sort === "trending"
      ? [...postCards].sort((left, right) => right.trendingScore - left.trendingScore)
      : postCards;

  return {
    feedPosts: personalizedPosts,
    joinedCommunityCount: joinedCommunities.length,
    suggestedCommunities: suggestions.map(mapCommunitySummary),
    topContributors: contributors.map(mapUserSummary),
  };
}

export async function getAskPageData(userId: string) {
  const communities = await db.communityMembership.findMany({
    where: { userId },
    orderBy: {
      community: {
        name: "asc",
      },
    },
    select: {
      community: {
        select: {
          id: true,
          name: true,
          slug: true,
          topicColor: true,
          description: true,
        },
      },
    },
  });

  return communities.map(({ community }) => mapCommunitySummary(community));
}

export async function getCommunitiesPageData(userId: string) {
  const communities = await db.community.findMany({
    orderBy: [{ memberships: { _count: "desc" } }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      slug: true,
      topicColor: true,
      description: true,
      memberships: {
        where: { userId },
        select: { role: true },
      },
      _count: {
        select: {
          memberships: true,
          posts: true,
          resources: true,
        },
      },
    },
  });

  return communities.map((community) => ({
    ...mapCommunitySummary(community),
    isJoined: community.memberships.length > 0,
    role: community.memberships[0]?.role,
  }));
}

export async function getCommunityPageData(slug: string, userId: string) {
  const community = await db.community.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      topicColor: true,
      description: true,
      createdBy: {
        select: {
          id: true,
          name: true,
          username: true,
          avatarUrl: true,
          college: true,
          reputation: true,
        },
      },
      memberships: {
        where: { userId },
        select: { role: true },
      },
      _count: {
        select: {
          memberships: true,
          posts: true,
          resources: true,
        },
      },
      posts: {
        orderBy: { createdAt: "desc" },
        take: 18,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              avatarUrl: true,
              college: true,
              reputation: true,
            },
          },
          community: {
            select: {
              id: true,
              name: true,
              slug: true,
              topicColor: true,
              description: true,
            },
          },
          answers: {
            select: { id: true },
          },
          votes: {
            select: { userId: true, value: true },
          },
          bookmarks: {
            where: { userId },
            select: { id: true },
          },
        },
      },
      resources: {
        orderBy: { createdAt: "desc" },
        take: 4,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              avatarUrl: true,
              college: true,
              reputation: true,
            },
          },
          community: {
            select: {
              id: true,
              name: true,
              slug: true,
              topicColor: true,
              description: true,
            },
          },
        },
      },
    },
  });

  if (!community) {
    redirect("/communities");
  }

  return {
    community: {
      ...mapCommunitySummary(community),
      isJoined: community.memberships.length > 0,
      role: community.memberships[0]?.role,
    },
    creator: mapUserSummary(community.createdBy),
    posts: community.posts.map((post) => mapPostCard({ ...post, kind: post.kind as PostCardData["kind"] }, userId)),
    resources: community.resources.map((resource) =>
      mapResourceCard({ ...resource, kind: resource.kind as ResourceCardData["kind"] }),
    ),
  };
}

export async function getPostThreadData(postId: string, userId: string) {
  const post = await db.post.findUnique({
    where: { id: postId },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          avatarUrl: true,
          college: true,
          reputation: true,
        },
      },
      community: {
        select: {
          id: true,
          name: true,
          slug: true,
          topicColor: true,
          description: true,
        },
      },
      answers: {
        orderBy: { createdAt: "asc" },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              avatarUrl: true,
              college: true,
              reputation: true,
            },
          },
          votes: {
            select: { userId: true, value: true },
          },
        },
      },
          votes: {
            select: { userId: true, value: true },
          },
      bookmarks: {
        where: { userId },
        select: { id: true },
      },
    },
  });

  if (!post) {
    return null;
  }

  const postCard = {
    ...mapPostCard({ ...post, kind: post.kind as PostCardData["kind"] }, userId),
    content: post.content,
  };
  const answers = post.answers.map((answer) =>
    mapAnswerCard({
      ...answer,
      isAccepted: post.acceptedAnswerId === answer.id,
      viewerVote: answer.votes.find((vote) => vote.userId === userId)?.value ?? 0,
    }),
  );

  return {
    post: postCard,
    answers,
  };
}

export async function getResourcesPageData(userId: string) {
  const [resources, communities, memberships] = await Promise.all([
    db.resource.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            avatarUrl: true,
            college: true,
            reputation: true,
          },
        },
        community: {
          select: {
            id: true,
            name: true,
            slug: true,
            topicColor: true,
            description: true,
          },
        },
      },
      take: 24,
    }),
    db.community.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        topicColor: true,
        description: true,
      },
    }),
    db.communityMembership.findMany({
      where: { userId },
      select: { communityId: true },
    }),
  ]);

  return {
    resources: resources.map((resource) =>
      mapResourceCard({ ...resource, kind: resource.kind as ResourceCardData["kind"] }),
    ),
    communities: communities.map(mapCommunitySummary),
    canShareToCommunityIds: memberships.map((item) => item.communityId),
  };
}

export async function getBookmarksPageData(userId: string) {
  const bookmarks = await db.bookmark.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      post: {
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              avatarUrl: true,
              college: true,
              reputation: true,
            },
          },
          community: {
            select: {
              id: true,
              name: true,
              slug: true,
              topicColor: true,
              description: true,
            },
          },
          answers: {
            select: { id: true },
          },
          votes: {
            select: { userId: true, value: true },
          },
          bookmarks: {
            where: { userId },
            select: { id: true },
          },
        },
      },
    },
  });

  return bookmarks.map((bookmark) => mapPostCard({ ...bookmark.post, kind: bookmark.post.kind as PostCardData["kind"] }, userId));
}

export async function getMessagesPageData(userId: string, composeWith?: string | null, activeConversationId?: string | null) {
  const [conversations, suggestedPeers, composeTarget] = await Promise.all([
    db.conversation.findMany({
      where: {
        participants: {
          some: { userId },
        },
      },
      orderBy: { updatedAt: "desc" },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                avatarUrl: true,
                college: true,
                reputation: true,
              },
            },
          },
        },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: {
            body: true,
            createdAt: true,
            senderId: true,
          },
        },
      },
    }),
    db.user.findMany({
      where: {
        id: { not: userId },
      },
      orderBy: { reputation: "desc" },
      take: 6,
      select: {
        id: true,
        name: true,
        username: true,
        avatarUrl: true,
        college: true,
        reputation: true,
      },
    }),
    composeWith
      ? db.user.findUnique({
          where: { username: composeWith },
          select: {
            id: true,
            name: true,
            username: true,
            avatarUrl: true,
            college: true,
            reputation: true,
          },
        })
      : Promise.resolve(null),
  ]);

  const activeId = activeConversationId ?? conversations[0]?.id ?? null;

  const activeConversation = activeId
    ? await db.conversation.findFirst({
        where: {
          id: activeId,
          participants: {
            some: { userId },
          },
        },
        include: {
          participants: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  username: true,
                  avatarUrl: true,
                  college: true,
                  reputation: true,
                },
              },
            },
          },
          messages: {
            orderBy: { createdAt: "asc" },
            include: {
              sender: {
                select: {
                  id: true,
                  name: true,
                  username: true,
                  avatarUrl: true,
                },
              },
            },
            take: 80,
          },
        },
      })
    : null;

  return {
    conversations: conversations.map<ConversationSummary>((conversation) => ({
      id: conversation.id,
      updatedAt: conversation.updatedAt,
      participants: conversation.participants.map((participant) => mapUserSummary(participant.user)),
      latestMessage: conversation.messages[0]
        ? {
            body: conversation.messages[0].body,
            createdAt: conversation.messages[0].createdAt,
            senderId: conversation.messages[0].senderId,
          }
        : null,
    })),
    activeConversation: activeConversation
      ? {
          id: activeConversation.id,
          participants: activeConversation.participants.map((participant) => mapUserSummary(participant.user)),
          messages: activeConversation.messages.map((message) => ({
            id: message.id,
            body: message.body,
            createdAt: message.createdAt,
            senderId: message.senderId,
            senderName: message.sender.name,
          })),
        }
      : null,
    composeTarget: composeTarget ? mapUserSummary(composeTarget) : null,
    suggestedPeers: suggestedPeers.map(mapUserSummary),
  };
}

export async function getProfilePageData(username: string, viewerId: string) {
  const user = await db.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      avatarUrl: true,
      bio: true,
      college: true,
      interests: true,
      skills: true,
      reputation: true,
      createdAt: true,
      memberships: {
        include: {
          community: {
            select: {
              id: true,
              name: true,
              slug: true,
              topicColor: true,
              description: true,
            },
          },
        },
      },
      posts: {
        orderBy: { createdAt: "desc" },
        take: 8,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              avatarUrl: true,
              college: true,
              reputation: true,
            },
          },
          community: {
            select: {
              id: true,
              name: true,
              slug: true,
              topicColor: true,
              description: true,
            },
          },
          answers: {
            select: { id: true },
          },
          votes: {
            select: { userId: true, value: true },
          },
          bookmarks: {
            where: { userId: viewerId },
            select: { id: true },
          },
        },
      },
      answers: {
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          post: {
            select: {
              id: true,
              title: true,
              acceptedAnswerId: true,
            },
          },
          votes: {
            select: { userId: true, value: true },
          },
        },
      },
      resources: {
        orderBy: { createdAt: "desc" },
        take: 6,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              avatarUrl: true,
              college: true,
              reputation: true,
            },
          },
          community: {
            select: {
              id: true,
              name: true,
              slug: true,
              topicColor: true,
              description: true,
            },
          },
        },
      },
      _count: {
        select: {
          posts: true,
          answers: true,
          resources: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/feed");
  }

  return {
    user: {
      ...mapUserSummary(user),
      bio: user.bio,
      email: user.email,
      interests: user.interests,
      skills: user.skills,
      createdAt: user.createdAt,
      counts: user._count,
      isCurrentUser: user.id === viewerId,
    },
    communities: user.memberships.map(({ community, role }) => ({
      ...mapCommunitySummary(community),
      role,
      isJoined: true,
    })),
    posts: user.posts.map((post) => mapPostCard({ ...post, kind: post.kind as PostCardData["kind"] }, viewerId)),
    recentAnswers: user.answers.map((answer) => ({
      id: answer.id,
      content: answer.content,
      createdAt: answer.createdAt,
      postId: answer.post.id,
      postTitle: answer.post.title,
      isAccepted: answer.post.acceptedAnswerId === answer.id,
      upvotes: answer.votes.filter((vote) => vote.value > 0).length,
    })),
    resources: user.resources.map((resource) =>
      mapResourceCard({ ...resource, kind: resource.kind as ResourceCardData["kind"] }),
    ),
  };
}

export async function getSettingsPageData(userId: string) {
  const [user, notifications] = await Promise.all([
    db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        bio: true,
        college: true,
        interests: true,
        skills: true,
      },
    }),
    db.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 15,
    }),
  ]);

  if (!user) {
    redirect("/sign-in");
  }

  return { user, notifications };
}
