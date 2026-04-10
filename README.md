# PRD Copilot v1

An AI-powered product copilot that converts unstructured feature ideas into structured, executive-ready Product Requirement Documents (PRDs) using a multi-step agent workflow.

---

## 🚀 Overview

PRD Copilot v1 simulates how strong product leaders think.

Instead of relying on a single LLM prompt, it breaks the workflow into multiple specialized agents that:

- structure ambiguity
- generate product artifacts
- critique quality
- refine outputs

This creates a **critique-and-revision loop**, significantly improving output quality and realism.

---

## 🎯 What It Generates

From simple inputs like:
- Feature idea
- Target user
- Business problem
- Constraints

The system produces:

- Clear problem statement with impact
- Measurable goals and non-goals
- End-to-end workflow (system + user flow)
- User stories with acceptance criteria
- Risks and mitigation strategies
- Dependencies and operational constraints
- Rollout plan (phased)
- Success metrics with definitions
- Tradeoffs and prioritization rationale

👉 Outputs are generated in:
- Markdown (human-readable PRD)
- JSON (structured for reuse)

---

## 🧠 Architecture

The system follows a multi-step AI agent pipeline:

### 1. Analyzer Agent
- Converts raw input into structured product thinking
- Extracts problem, users, constraints, assumptions

### 2. Drafter Agent
- Generates a full PRD
- Includes goals, user stories, workflows, metrics

### 3. Reviewer Agent
- Critiques PRD quality like a product director
- Identifies gaps, weak metrics, unclear logic
- Assigns a quality score

### 4. Refiner Agent
- Improves PRD using structured feedback
- Produces higher-quality, executive-ready output

---

## 🔄 Workflow
Input → Analyze → Draft → Review → Refine → Format → Output

This mirrors real-world product development:
- ideation
- structuring
- critique
- iteration

---

## ⚙️ Tech Stack

- Node.js
- OpenAI API
- CLI-based interaction
- JSON + Markdown outputs

---

## 📄 Sample Output

👉 [AI Generated Release Notes PRD](outputs/ai-generated-release-notes.md)

This example demonstrates:
- structured thinking
- measurable goals
- system-level workflow
- risk + rollout planning

---

## 💡 Key Design Decisions

- **Multi-agent over single prompt** → improves quality and reasoning
- **Critique loop** → simulates senior product review
- **Structured JSON schema** → ensures consistency
- **Custom formatter** → removes raw JSON and improves readability

---

## 🚧 Future Improvements

- Web UI for interactive PRD generation
- Jira / Notion integrations
- RAG-based context enrichment
- Template customization
- Improved scoring and refinement logic

---

## 👤 Author

Rahul Bhalerao  
Senior Product Leader | Cloud Platforms | AI Products | DevSecOps  

---

## 🧭 Positioning

This project demonstrates:
- Product thinking + AI integration
- Multi-step agent system design
- Translating ambiguity into structured execution
- Building practical AI workflows for real use cases