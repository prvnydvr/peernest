export type RankablePost = {
  upvotes: number;
  downvotes: number;
  answers: number;
  createdAt: Date | string;
};

export function scorePostForTrending(post: RankablePost) {
  const createdAt = new Date(post.createdAt);
  const ageHours = Math.max(1, (Date.now() - createdAt.getTime()) / (1000 * 60 * 60));
  const engagement = post.upvotes * 5 - post.downvotes * 3 + post.answers * 2;
  const freshness = 96 / Math.pow(ageHours + 2, 0.65);

  return Number((engagement + freshness).toFixed(2));
}
