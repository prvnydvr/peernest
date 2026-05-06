import { PrismaClient, PostKind, ResourceKind } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env["DATABASE_URL"],
    max: Number(process.env["DATABASE_POOL_MAX"] ?? 4),
  }),
});

const starterCommunities = [
  {
    name: "DSA",
    slug: "dsa",
    description: "Interview prep, graphs, DP, contest strategy, and collaborative debugging.",
    topicColor: "#2563eb",
  },
  {
    name: "Engineering",
    slug: "engineering",
    description: "Core engineering concepts, semester survival, and peer-led resources.",
    topicColor: "#0f172a",
  },
  {
    name: "Startups",
    slug: "startups",
    description: "Find cofounders, ship MVPs, and discuss student startup playbooks.",
    topicColor: "#14b8a6",
  },
  {
    name: "AI Study Circle",
    slug: "ai-study-circle",
    description: "Machine learning, practical AI tools, research papers, and project feedback.",
    topicColor: "#7c3aed",
  },
];

async function ensurePost({
  authorId,
  communityId,
  title,
  content,
  kind,
  tags,
}: {
  authorId: string;
  communityId: string;
  title: string;
  content: string;
  kind: PostKind;
  tags: string[];
}) {
  const existing = await prisma.post.findFirst({
    where: { title, communityId },
    select: { id: true },
  });

  if (existing) {
    return existing;
  }

  return prisma.post.create({
    data: {
      authorId,
      communityId,
      title,
      content,
      kind,
      tags,
    },
    select: { id: true },
  });
}

async function ensureResource({
  authorId,
  communityId,
  title,
  description,
  kind,
  tags,
  linkUrl,
  notes,
}: {
  authorId: string;
  communityId: string;
  title: string;
  description: string;
  kind: ResourceKind;
  tags: string[];
  linkUrl?: string;
  notes?: string;
}) {
  const existing = await prisma.resource.findFirst({
    where: { title, communityId },
    select: { id: true },
  });

  if (existing) {
    return existing;
  }

  return prisma.resource.create({
    data: {
      authorId,
      communityId,
      title,
      description,
      kind,
      tags,
      linkUrl,
      notes,
    },
    select: { id: true },
  });
}

async function main() {
  const team = await prisma.user.upsert({
    where: { email: "team@peernest.local" },
    update: {
      name: "PeerNest Team",
      college: "PeerNest",
      bio: "Starter account for helpful launch content and community prompts.",
      interests: ["Community", "Resources", "Peer learning"],
      skills: ["Moderation", "Curation"],
    },
    create: {
      email: "team@peernest.local",
      username: "peernest_team",
      name: "PeerNest Team",
      college: "PeerNest",
      bio: "Starter account for helpful launch content and community prompts.",
      interests: ["Community", "Resources", "Peer learning"],
      skills: ["Moderation", "Curation"],
      reputation: 25,
    },
    select: { id: true },
  });

  const communities = new Map<string, { id: string }>();

  for (const community of starterCommunities) {
    const saved = await prisma.community.upsert({
      where: { slug: community.slug },
      update: {
        name: community.name,
        description: community.description,
        topicColor: community.topicColor,
      },
      create: {
        ...community,
        createdById: team.id,
      },
      select: { id: true },
    });

    communities.set(community.slug, saved);

    await prisma.communityMembership.upsert({
      where: {
        userId_communityId: {
          userId: team.id,
          communityId: saved.id,
        },
      },
      update: {},
      create: {
        userId: team.id,
        communityId: saved.id,
        role: "OWNER",
      },
    });
  }

  const dsa = communities.get("dsa")!;
  const engineering = communities.get("engineering")!;
  const startups = communities.get("startups")!;
  const ai = communities.get("ai-study-circle")!;

  const dsaPost = await ensurePost({
    authorId: team.id,
    communityId: dsa.id,
    title: "How do you optimize Dijkstra when edge weights are small?",
    content:
      "I understand the binary heap approach, but I keep hearing about bucket-based optimizations. Looking for intuition plus when it is worth using in contests.",
    kind: PostKind.QUESTION,
    tags: ["graphs", "algorithms", "contests"],
  });

  const answer = await prisma.answer.findFirst({
    where: {
      postId: dsaPost.id,
      content: {
        startsWith: "If weights are very small non-negative integers",
      },
    },
    select: { id: true },
  });

  const savedAnswer =
    answer ??
    (await prisma.answer.create({
      data: {
        postId: dsaPost.id,
        authorId: team.id,
        content:
          "If weights are very small non-negative integers, Dial's algorithm is the standard alternative. Think of it as replacing the heap with buckets indexed by tentative distance.",
      },
      select: { id: true },
    }));

  await prisma.post.update({
    where: { id: dsaPost.id },
    data: { acceptedAnswerId: savedAnswer.id },
  });

  await Promise.all([
    ensurePost({
      authorId: team.id,
      communityId: startups.id,
      title: "Looking for a full-stack teammate for a 3-week MVP sprint",
      content:
        "Use this thread to pitch compact campus MVPs, find collaborators, and agree on a build scope that can actually ship before the next review.",
      kind: PostKind.PROJECT,
      tags: ["hackathon", "mvp", "team"],
    }),
    ensurePost({
      authorId: team.id,
      communityId: engineering.id,
      title: "Best way to structure OS exam revision notes?",
      content:
        "Share one-session revision formats for scheduling, memory, deadlocks, and file systems. Bonus points for viva prompts and common mistakes.",
      kind: PostKind.DISCUSSION,
      tags: ["os", "notes", "semester"],
    }),
    ensurePost({
      authorId: team.id,
      communityId: ai.id,
      title: "What should a beginner AI project include to look credible?",
      content:
        "Collecting practical advice on datasets, evaluation, demos, and writeups that help a student AI project feel clear and serious.",
      kind: PostKind.QUESTION,
      tags: ["ai", "projects", "portfolio"],
    }),
    ensureResource({
      authorId: team.id,
      communityId: engineering.id,
      title: "Operating Systems revision sheet",
      description: "A one-evening revision sheet covering scheduling, memory, deadlocks, and file systems.",
      kind: ResourceKind.NOTE,
      notes: "Use this as a compression guide before end-sem exams. Organize each section by likely viva prompts.",
      tags: ["os", "revision", "semester"],
    }),
    ensureResource({
      authorId: team.id,
      communityId: startups.id,
      title: "Student startup launch checklist",
      description: "Validation, landing page, pilot users, and a clean first-week roadmap.",
      kind: ResourceKind.LINK,
      linkUrl: "https://www.ycombinator.com/library",
      tags: ["startup", "product", "mvp"],
    }),
    ensureResource({
      authorId: team.id,
      communityId: ai.id,
      title: "Machine learning project rubric",
      description: "A quick rubric for dataset quality, baseline comparison, evaluation, and demo clarity.",
      kind: ResourceKind.NOTE,
      notes:
        "A credible ML project needs a clear problem, a documented dataset, a simple baseline, measurable evaluation, and a demo that explains failure cases.",
      tags: ["ai", "rubric", "portfolio"],
    }),
  ]);

  console.log("Starter PeerNest content is ready.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
