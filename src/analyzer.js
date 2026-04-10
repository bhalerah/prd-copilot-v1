import { generateJson } from "./llm.js";
import { buildAnalyzePrompt } from "./prompts.js";

export async function analyzeInput(input) {
  return generateJson(buildAnalyzePrompt(input));
}