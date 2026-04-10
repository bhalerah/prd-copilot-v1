import { generateJson } from "./llm.js";
import { buildReviewPrompt } from "./prompts.js";

export async function reviewPrd(prd) {
  return generateJson(buildReviewPrompt(prd));
}