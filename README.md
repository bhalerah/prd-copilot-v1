# PRD Copilot v1

An AI-powered product copilot that converts unstructured feature ideas into structured, high-quality Product Requirement Documents (PRDs) using a multi-step agent workflow.

---

## 🚀 Overview

PRD Copilot v1 is designed to simulate how strong product managers think.

Instead of relying on a single LLM prompt, it breaks the workflow into multiple specialized agents:

- Analyzer → structures ambiguity
- Drafter → generates PRD
- Reviewer → critiques output
- Refiner → improves quality

This approach significantly improves output quality through a **critique-and-revision loop**.

---

## 🧠 Architecture

The system follows a multi-step AI agent pipeline:

1. **Analyzer Agent**
   - Converts raw input into structured product thinking
   - Extracts problem, users, constraints, assumptions

2. **Drafter Agent**
   - Generates a full PRD
   - Includes goals, user stories, acceptance criteria

3. **Reviewer Agent**
   - Critiques PRD quality
   - Identifies gaps, weak metrics, unclear logic
   - Assigns a quality score

4. **Refiner Agent**
   - Improves PRD using structured feedback
   - Produces final, higher-quality output

---

## ⚙️ Tech Stack

- Node.js
- OpenAI API
- CLI-based interaction
- JSON + Markdown outputs

---

## 📂 Project Structure
