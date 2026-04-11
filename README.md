> 🚀 Agentic AI system that transforms rough product ideas into structured, review-ready PRDs with built-in critique and refinement.

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

## 🎥 Demo

1. Input a rough feature idea  
2. System runs multi-stage pipeline  
3. Generates structured PRD  
4. Evaluates quality and identifies gaps  
5. Suggests improvements  
6. Exports to PDF  

### UI
![UI Screenshot](./screenshots/PRD-UI.png)

### 🔹 Generated PRD (Markdown / PDF)

Structured, review-ready output with quality scoring and improvement suggestions

[PRD Preview](./screenshots/UI-Output.md)

👉 [View Full PDF](./screenshots/PDF-Output.pdf)
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

- **PRD Status:** Minor review needed  
- **Quality Score:** 6  
- **Gap Count:** 3  

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
## ⚙️ Running Locally

### Backend (bash)
- cd src
- npm install
- node server.js

###  Frontend (bash)
- cd ui
- npm install
- npm run dev

Then open:
http://localhost:5173

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

👉 Unlike typical AI tools, this is not a single prompt — it is a structured, multi-agent reasoning system.

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
