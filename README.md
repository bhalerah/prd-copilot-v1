# AI-Driven PRD Generator & Refiner

## 🚀 Agentic Workflow for Structured Product Thinking

Most product managers don’t struggle with ideas.  
They struggle with turning ideas into something a team can actually build.

This project is an **agentic AI workflow** that transforms a rough feature idea into a structured, review-ready Product Requirements Document (PRD).

---

## ✨ What This Does

- Converts rough ideas → structured PRDs
- Applies automated quality scoring
- Identifies gaps in clarity, metrics, and scope
- Generates actionable improvements
- Exports to UI, Markdown, and PDF

---

## 🧠 How It Works

Instead of a single prompt, this system uses a **multi-stage pipeline**:
Analyze → Draft → Review → Refine → Output

### Pipeline Stages

- **Analysis Agent** → Understands intent and context  
- **Draft Agent** → Generates full PRD  
- **Review Agent** → Scores quality + identifies gaps  
- **Finalize Agent** → Refines using feedback  
- **Formatter** → Converts to Markdown/UI/PDF  

---

## 🏗️ Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS

**Backend**
- Node.js
- Express
- LLM APIs (OpenAI or equivalent)

**Data**
- Structured JSON pipeline
- Deterministic formatting layer

---

## 📊 Output Example

- PRD Status: *Minor review needed*
- Quality Score: *6*
- Gap Count: *3*

### Suggested Improvements
- Unclear problem → refine scope  
- Weak metrics → add measurable success criteria  
- Vague acceptance criteria → increase specificity  

---

## 🧩 Key Files
/frontend
PRDAgentFlowUI.jsx → UI rendering + improvements

/backend
prompt.js → LLM prompts (core logic)
format.js → Markdown generation

---

## 🐛 Debugging Guide

| Issue | Where to Check |
|------|---------------|
| UI blank | React component |
| Missing improvements | review object |
| Bad output quality | prompt.js |
| Formatting issues | format.js |

---

## 🎯 Why This Matters

This is not a PRD generator.

It’s a **product thinking system** that:
- standardizes how PRDs are created
- reduces cognitive load
- improves consistency across teams

---

## 🔮 Roadmap

- Apply suggestions (auto-refine sections)
- Section-level regeneration
- Editable PRD blocks
- Jira / Notion integrations

---

## 📌 Positioning

**AI Product System: Agentic PRD Generator**

From idea → structured product thinking.
