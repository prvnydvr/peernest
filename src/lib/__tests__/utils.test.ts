import { describe, expect, it } from "vitest";

import { scorePostForTrending } from "../ranking";
import { parseListInput, parseTagInput, slugify } from "../utils";

describe("PeerNest utility behavior", () => {
  it("normalizes comma-separated profile and tag input", () => {
    expect(parseListInput("react, react, dbms")).toEqual(["React", "Dbms"]);
    expect(parseTagInput("Graphs, DP, Systems")).toEqual(["graphs", "dp", "systems"]);
  });

  it("creates stable slugs for community names", () => {
    expect(slugify("  Data Science & AI Club  ")).toBe("data-science-ai-club");
  });

  it("ranks stronger, fresher posts higher", () => {
    const now = new Date();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

    expect(scorePostForTrending({ upvotes: 5, downvotes: 0, answers: 3, createdAt: now })).toBeGreaterThan(
      scorePostForTrending({ upvotes: 0, downvotes: 2, answers: 0, createdAt: yesterday }),
    );
  });
});
