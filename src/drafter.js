import { generateJson } from "./llm.js";
import { buildDraftPrompt } from "./prompts.js";

export async function draftPrd(analysis) {
  return generateJson(buildDraftPrompt(analysis));
}