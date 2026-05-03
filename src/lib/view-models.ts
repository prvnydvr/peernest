export type UserSummary = {
  id: string;
  name: string;
  username: string;
  avatarUrl: string | null;
  college?: string | null;
  reputation?: number;
};

export type CommunitySummary = {
  id: string;
  name: string;
  slug: string;
  topicColor: string;
  description?: string;
  memberCount?: number;
  postCount?: number;
  resourceCount?: number;
  isJoined?: boolean;
  role?: string;
};

export type PostCardData = {
  id: string;
  title: string;
  content: string;
  kind: "QUESTION" | "DISCUSSION" | "PROJECT";
  tags: string[];
  createdAt: Date;
  author: UserSummary;
  community: CommunitySummary | null;
  answerCount: number;
  upvotes: number;
  downvotes: number;
  viewerVote: number;
  isBookmarked: boolean;
  acceptedAnswerId: string | null;
  trendingScore: number;
};

export type AnswerCardData = {
  id: string;
  content: string;
  createdAt: Date;
  author: UserSummary;
  upvotes: number;
  downvotes: number;
  viewerVote: number;
  isAccepted: boolean;
};

export type ResourceCardData = {
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
  author: UserSummary;
  community: CommunitySummary | null;
};

export type ConversationSummary = {
  id: string;
  updatedAt: Date;
  participants: UserSummary[];
  latestMessage: {
    body: string;
    createdAt: Date;
    senderId: string;
  } | null;
};
