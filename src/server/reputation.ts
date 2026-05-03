import { db } from "@/lib/db";
import { AppError } from "@/lib/api";
import { scorePostForTrending } from "@/lib/ranking";

export async function recalculateUserReputation(userId: string) {
  const [posts, answers, resources] = await Promise.all([
    db.post.findMany({
      where: { authorId: userId },
      include: { votes: true, answers: true },
    }),
    db.answer.findMany({
      where: { authorId: userId },
      include: {
        votes: true,
        post: {
          select: {
            acceptedAnswerId: true,
          },
        },
      },
    }),
    db.resource.count({
      where: { authorId: userId },
    }),
  ]);

  const postReputation = posts.reduce((total, post) => {
    const upvotes = post.votes.filter((vote) => vote.value > 0).length;
    const downvotes = post.votes.filter((vote) => vote.value < 0).length;
    return total + 3 + upvotes * 2 - downvotes;
  }, 0);

  const answerReputation = answers.reduce((total, answer) => {
    const upvotes = answer.votes.filter((vote) => vote.value > 0).length;
    const downvotes = answer.votes.filter((vote) => vote.value < 0).length;
    const acceptedBonus = answer.post.acceptedAnswerId === answer.id ? 15 : 0;
    return total + 4 + upvotes * 3 - downvotes + acceptedBonus;
  }, 0);

  const reputation = postReputation + answerReputation + resources * 2;

  await db.user.update({
    where: { id: userId },
    data: { reputation },
    select: { id: true },
  });
}

export async function createNotification({
  userId,
  title,
  body,
  href,
  type,
}: {
  userId: string;
  title: string;
  body: string;
  href?: string;
  type: "ANSWER_POSTED" | "ANSWER_ACCEPTED" | "MESSAGE_RECEIVED" | "COMMUNITY_ACTIVITY";
}) {
  if (!userId) {
    throw new AppError("Cannot create notification without a user.", 500);
  }

  await db.notification.create({
    data: {
      userId,
      title,
      body,
      href,
      type,
    },
  });
}

export function sortByTrending<T extends { upvotes: number; downvotes: number; answers: number; createdAt: Date | string }>(
  items: T[],
) {
  return [...items].sort((left, right) => scorePostForTrending(right) - scorePostForTrending(left));
}
