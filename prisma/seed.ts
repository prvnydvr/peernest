import { PrismaClient, PostKind, ResourceKind } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env["DATABASE_URL"], max: 1 }),
});

const supabaseAdmin =
  process.env["NEXT_PUBLIC_SUPABASE_URL"] && process.env["SUPABASE_SERVICE_ROLE_KEY"]
    ? createClient(process.env["NEXT_PUBLIC_SUPABASE_URL"], process.env["SUPABASE_SERVICE_ROLE_KEY"], {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    : null;

async function getSeedUserId(email: string, password: string, metadata: Record<string, unknown>) {
  if (!supabaseAdmin) {
    return undefined;
  }

  const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: metadata,
  });

  if (created.user) {
    return created.user.id;
  }

  if (!error?.message.toLowerCase().includes("already")) {
    throw error;
  }

  const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  if (listError) {
    throw listError;
  }

  return users.users.find((user) => user.email === email)?.id;
}

async function main() {
  await prisma.notification.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversationParticipant.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.answerVote.deleteMany();
  await prisma.postVote.deleteMany();
  await prisma.answer.deleteMany();
  await prisma.post.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.communityMembership.deleteMany();
  await prisma.community.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await hash("Password123!", 12);
  const [avaAuthId, ryanAuthId, nehaAuthId, leoAuthId] = await Promise.all([
    getSeedUserId("ava@peernest.dev", "Password123!", { name: "Ava Sharma", username: "ava_codes" }),
    getSeedUserId("ryan@peernest.dev", "Password123!", { name: "Ryan Mathew", username: "ryan_dsa" }),
    getSeedUserId("neha@peernest.dev", "Password123!", { name: "Neha Kapoor", username: "neha_builds" }),
    getSeedUserId("leo@peernest.dev", "Password123!", { name: "Leo Joseph", username: "leo_networks" }),
  ]);

  const [ava, ryan, neha, leo] = await Promise.all([
    prisma.user.create({
      data: {
        id: avaAuthId,
        email: "ava@peernest.dev",
        username: "ava_codes",
        name: "Ava Sharma",
        passwordHash,
        college: "NIT Trichy",
        bio: "Frontend engineer in progress. I love systems that feel calm and fast.",
        interests: ["React", "Design Systems", "Startups"],
        skills: ["UI Engineering", "Tailwind", "Product Thinking"],
        reputation: 146,
      },
    }),
    prisma.user.create({
      data: {
        id: ryanAuthId,
        email: "ryan@peernest.dev",
        username: "ryan_dsa",
        name: "Ryan Mathew",
        passwordHash,
        college: "BITS Pilani",
        bio: "DSA mentor and competitive programming enthusiast.",
        interests: ["DSA", "C++", "Interview Prep"],
        skills: ["Problem Solving", "Algorithms", "Mentoring"],
        reputation: 218,
      },
    }),
    prisma.user.create({
      data: {
        id: nehaAuthId,
        email: "neha@peernest.dev",
        username: "neha_builds",
        name: "Neha Kapoor",
        passwordHash,
        college: "IIIT Hyderabad",
        bio: "Building campus-first products and hackathon teams.",
        interests: ["Hackathons", "Product", "Node.js"],
        skills: ["Backend", "MongoDB", "Leadership"],
        reputation: 172,
      },
    }),
    prisma.user.create({
      data: {
        id: leoAuthId,
        email: "leo@peernest.dev",
        username: "leo_networks",
        name: "Leo Joseph",
        passwordHash,
        college: "VIT Chennai",
        bio: "Systems and network security learner. Always sharing notes.",
        interests: ["Networking", "Cybersecurity", "Linux"],
        skills: ["Shell", "Linux", "Teaching"],
        reputation: 98,
      },
    }),
  ]);

  const [dsa, engineering, startups] = await Promise.all([
    prisma.community.create({
      data: {
        name: "DSA",
        slug: "dsa",
        description: "Interview prep, graphs, DP, contest strategy, and collaborative debugging.",
        topicColor: "#0084ff",
        createdById: ryan.id,
      },
    }),
    prisma.community.create({
      data: {
        name: "Engineering",
        slug: "engineering",
        description: "Core engineering concepts, semester survival, and peer-led resources.",
        topicColor: "#0f172a",
        createdById: ava.id,
      },
    }),
    prisma.community.create({
      data: {
        name: "Startups",
        slug: "startups",
        description: "Find cofounders, ship MVPs, and discuss student startup playbooks.",
        topicColor: "#14b8a6",
        createdById: neha.id,
      },
    }),
  ]);

  await prisma.communityMembership.createMany({
    data: [
      { communityId: dsa.id, userId: ryan.id, role: "OWNER" },
      { communityId: dsa.id, userId: ava.id },
      { communityId: dsa.id, userId: neha.id },
      { communityId: engineering.id, userId: ava.id, role: "OWNER" },
      { communityId: engineering.id, userId: leo.id },
      { communityId: engineering.id, userId: ryan.id },
      { communityId: startups.id, userId: neha.id, role: "OWNER" },
      { communityId: startups.id, userId: ava.id },
      { communityId: startups.id, userId: leo.id },
    ],
  });

  const postOne = await prisma.post.create({
    data: {
      title: "How do you optimize Dijkstra when edge weights are small?",
      content:
        "I understand the binary heap approach, but I keep hearing about bucket-based optimizations. Looking for intuition plus when it is worth using in contests.",
      kind: PostKind.QUESTION,
      tags: ["graphs", "algorithms", "contests"],
      authorId: ryan.id,
      communityId: dsa.id,
    },
  });

  const postTwo = await prisma.post.create({
    data: {
      title: "Looking for 2 teammates for a campus productivity MVP",
      content:
        "We have design and product covered. Need one full-stack engineer and one ML-minded builder who can move quickly over the next 3 weeks.",
      kind: PostKind.PROJECT,
      tags: ["hackathon", "nextjs", "startup"],
      authorId: neha.id,
      communityId: startups.id,
    },
  });

  const postThree = await prisma.post.create({
    data: {
      title: "Best way to structure OS exam revision notes?",
      content:
        "I want notes that are short enough to revise in one sitting but detailed enough for viva questions. Any frameworks that worked for you?",
      kind: PostKind.DISCUSSION,
      tags: ["os", "notes", "semester"],
      authorId: ava.id,
      communityId: engineering.id,
    },
  });

  const answerOne = await prisma.answer.create({
    data: {
      postId: postOne.id,
      authorId: ava.id,
      content:
        "If weights are very small non-negative integers, Dial's algorithm is the standard alternative. Think of it as replacing the heap with buckets indexed by tentative distance.",
    },
  });

  await prisma.answer.create({
    data: {
      postId: postOne.id,
      authorId: leo.id,
      content:
        "Another way to think about it: you are exploiting the bounded delta between current and future distances. For sparse graphs with tiny weights, it can outperform a heap cleanly.",
    },
  });

  await prisma.post.update({
    where: { id: postOne.id },
    data: { acceptedAnswerId: answerOne.id },
  });

  await prisma.postVote.createMany({
    data: [
      { postId: postOne.id, userId: ava.id, value: 1 },
      { postId: postOne.id, userId: neha.id, value: 1 },
      { postId: postTwo.id, userId: ava.id, value: 1 },
      { postId: postThree.id, userId: leo.id, value: 1 },
    ],
  });

  await prisma.answerVote.createMany({
    data: [
      { answerId: answerOne.id, userId: ryan.id, value: 1 },
      { answerId: answerOne.id, userId: neha.id, value: 1 },
    ],
  });

  await prisma.resource.createMany({
    data: [
      {
        authorId: ava.id,
        communityId: engineering.id,
        title: "Operating Systems revision sheet",
        description: "A one-evening revision sheet covering scheduling, memory, deadlocks, and file systems.",
        kind: ResourceKind.NOTE,
        notes:
          "Use this as a compression guide before end-sem exams. Every section is organized by likely viva prompts.",
        tags: ["os", "revision", "semester"],
      },
      {
        authorId: leo.id,
        communityId: engineering.id,
        title: "Linux networking primer",
        description: "Short PDF-style notes on sockets, TCP, UDP, and packet flow fundamentals.",
        kind: ResourceKind.LINK,
        linkUrl: "https://roadmap.sh/backend",
        tags: ["networking", "linux", "backend"],
      },
      {
        authorId: neha.id,
        communityId: startups.id,
        title: "Student startup launch checklist",
        description: "Validation, landing page, pilot users, and a clean first-week roadmap.",
        kind: ResourceKind.LINK,
        linkUrl: "https://www.ycombinator.com/library",
        tags: ["startup", "product", "mvp"],
      },
    ],
  });

  const conversation = await prisma.conversation.create({ data: {} });

  await prisma.conversationParticipant.createMany({
    data: [
      { conversationId: conversation.id, userId: ava.id },
      { conversationId: conversation.id, userId: neha.id },
    ],
  });

  await prisma.message.createMany({
    data: [
      {
        conversationId: conversation.id,
        senderId: ava.id,
        body: "I can help with the frontend system. Do you already have a design direction?",
      },
      {
        conversationId: conversation.id,
        senderId: neha.id,
        body: "Yes. Clean SaaS, fast interactions, and very lightweight onboarding. Sending a rough scope tonight.",
      },
    ],
  });
}

main()
  .catch(async (error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
