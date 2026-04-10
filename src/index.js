import fs from "fs";
import path from "path";
import readline from "readline";
import { analyzeInput } from "./analyzer.js";
import { draftPrd } from "./drafter.js";
import { reviewPrd } from "./reviewer.js";
import { finalizePrd } from "./finalizer.js";
import { toMarkdown } from "./format.js";

function askQuestion(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  try {
    const featureIdea = await askQuestion(rl, "Feature idea: ");
    const targetUser = await askQuestion(rl, "Target user: ");
    const businessProblem = await askQuestion(rl, "Business problem: ");
    const constraints = await askQuestion(rl, "Constraints: ");

    rl.close();

    const combinedInput = `
Feature idea: ${featureIdea}
Target user: ${targetUser}
Business problem: ${businessProblem}
Constraints: ${constraints}
`;

    console.log("\nAnalyzing input...");
    const analysis = await analyzeInput(combinedInput);

    console.log("Drafting PRD...");
    const draft = await draftPrd(analysis);

    console.log("Reviewing PRD...");
    const review = await reviewPrd(draft);

    console.log("Finalizing PRD...");
    const finalPrd = await finalizePrd(draft, review);

    const markdown = toMarkdown(finalPrd, review);

    const outputDir = path.resolve("outputs");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const baseName = slugify(finalPrd.title || featureIdea || "prd-output");
    const markdownPath = path.join(outputDir, `${baseName}.md`);
    const jsonPath = path.join(outputDir, `${baseName}.json`);

    fs.writeFileSync(markdownPath, markdown, "utf8");
    fs.writeFileSync(
      jsonPath,
      JSON.stringify({ analysis, draft, review, finalPrd }, null, 2),
      "utf8"
    );

    console.log(`\nDone.`);
    console.log(`Markdown PRD: ${markdownPath}`);
    console.log(`JSON output: ${jsonPath}`);
  } catch (error) {
    rl.close();
    console.error("\nError:", error.message);
  }
}

main();