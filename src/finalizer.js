import { generateJson } from "./llm.js";
import { buildFinalizePrompt } from "./prompts.js";

export async function finalizePrd(prd, review) {
  return generateJson(buildFinalizePrompt(prd, review));
}