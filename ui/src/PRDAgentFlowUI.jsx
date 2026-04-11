import { useRef, useState } from "react";
function getPrdStatus(score) {
  if (score >= 8) return "Ready for stakeholders";
  if (score >= 6) return "Minor review needed";
  return "Review recommended";
}
function toDisplayText(value) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return item;
        if (typeof item === "object" && item !== null) {
          return Object.entries(item)
            .map(([key, val]) => `${key}: ${val}`)
            .join(", ");
        }
        return String(item);
      })
      .join("\n");
  }

  if (typeof value === "object") {
    return Object.entries(value)
      .map(([key, val]) => `${key}: ${val}`)
      .join(", ");
  }

  return String(value);
}
export default function PRDAgentFlowUI() {
  const [steps, setSteps] = useState([
    { id: 1, name: "Analyze Problem", status: "upcoming", summary: "...", details: [] },
    { id: 2, name: "Draft PRD", status: "upcoming", summary: "...", details: [] },
    { id: 3, name: "Review Gaps", status: "upcoming", summary: "...", details: [] },
    { id: 4, name: "Refine Output", status: "upcoming", summary: "...", details: [] },
  ]);

  const [running, setRunning] = useState(false);
  const [markdownContent, setMarkdownContent] = useState("");
  const [featureIdea, setFeatureIdea] = useState(
  "Generate a complete PRD from a rough feature idea, then review and refine it through visible AI workflow steps."
);
const [generatedTitle, setGeneratedTitle] = useState("");
const [targetUser, setTargetUser] = useState(
  "Product managers at growing software teams"
);
const [reviewSummary, setReviewSummary] = useState(null);

const [constraints, setConstraints] = useState(
  "Must reduce cognitive load, show agent progress clearly, and produce stakeholder-ready output."
);
const prdExportRef = useRef(null);
const runWorkflow = async () => {
  try {
    setRunning(true);
    setGeneratedTitle("");
setMarkdownContent("");
setReviewSummary(null);
    setSteps((prev) =>
      prev.map((step) => ({
        ...step,
        status: "upcoming",
        details: [],
      }))
    );

    setDocSections((prev) =>
      prev.map((section) => ({
        ...section,
        content: "",
        status: "empty",
      }))
    );

    const responsePromise = fetch("/api/prd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        featureIdea,
        targetUser,
        businessProblem: "",
        constraints,
      }),
    });

    setSteps((prev) =>
      prev.map((step, idx) =>
        idx === 0 ? { ...step, status: "active" } : step
      )
    );
    await new Promise((r) => setTimeout(r, 500));

    setSteps((prev) =>
      prev.map((step, idx) =>
        idx === 1 ? { ...step, status: "active" } : step
      )
    );
    await new Promise((r) => setTimeout(r, 500));

    setSteps((prev) =>
      prev.map((step, idx) =>
        idx === 2 ? { ...step, status: "active" } : step
      )
    );
    await new Promise((r) => setTimeout(r, 500));

    setSteps((prev) =>
      prev.map((step, idx) =>
        idx === 3 ? { ...step, status: "active" } : step
      )
    );

    const response = await responsePromise;

    if (!response.ok) {
      throw new Error("Failed to generate PRD");
    }

    const data = await response.json();
const { analysis, draft, review, finalPrd, markdown } = data;

setGeneratedTitle(
  finalPrd?.title ||
  draft?.title ||
  "Generated PRD"
);
setMarkdownContent(markdown || "");
    // Step 1 complete
    setSteps((prev) =>
      prev.map((step, idx) =>
        idx === 0
          ? {
              ...step,
              status: "complete",
              details: [
                "Analyzed raw feature input",
                "Clarified target user and business problem",
                "Structured the input for downstream drafting",
              ],
            }
          : step
      )
    );

    setDocSections((prev) =>
      prev.map((sec, idx) => {
        if (idx === 0) {
          return {
            ...sec,
            content: toDisplayText(
              finalPrd?.problem_statement ||
              analysis?.problem_statement ||
              "Problem analysis completed."
            ),
            status: "done",
          };
        }
        if (idx === 1) {
          return {
            ...sec,
            content:
              finalPrd?.target_users ||
              draft?.target_users ||
              "Target user section drafted.",
            status: "done",
          };
        }
        return sec;
      })
    );
setReviewSummary(review || null);

    await new Promise((r) => setTimeout(r, 600));

    // Step 2 complete
    setSteps((prev) =>
      prev.map((step, idx) =>
        idx === 1
          ? {
              ...step,
              status: "complete",
              details: [
                "Drafted core PRD structure",
                "Generated users and goals sections",
                "Prepared initial product narrative",
              ],
            }
          : step
      )
    );

    setDocSections((prev) =>
      prev.map((sec, idx) => {
        if (idx === 2) {
          return {
            ...sec,
            content:
              finalPrd?.success_metrics ||
              finalPrd?.goals ||
              draft?.goals ||
              "Goals and success metrics drafted.",
            status: "done",
          };
        }
        if (idx === 3) {
          return {
            ...sec,
            content:
              finalPrd?.non_goals ||
              "Non-goals drafted.",
            status: "done",
          };
        }
        if (idx === 4) {
          return {
            ...sec,
            content:
              finalPrd?.assumptions ||
              "Assumptions drafted.",
            status: "done",
          };
        }
        return sec;
      })
    );

    await new Promise((r) => setTimeout(r, 600));

    // Step 3 complete
    setSteps((prev) =>
      prev.map((step, idx) =>
        idx === 2
          ? {
              ...step,
              status: "complete",
              details: [
                "Reviewed draft for gaps and weaknesses",
                "Surfaced risks and tradeoffs",
                "Strengthened delivery readiness",
              ],
            }
          : step
      )
    );

    setDocSections((prev) =>
      prev.map((sec, idx) => {
        if (idx === 5) {
          return {
            ...sec,
            content:
              finalPrd?.workflow ||
              "Workflow drafted.",
            status: "done",
          };
        }
        if (idx === 6) {
          return {
            ...sec,
            content:
              finalPrd?.user_stories ||
              draft?.user_stories ||
              "Requirements refined during review.",
            status: "done",
          };
        }
        if (idx === 7) {
          return {
            ...sec,
            content:
              finalPrd?.dependencies ||
              "Dependencies identified.",
            status: "done",
          };
        }
        if (idx === 8) {
          return {
            ...sec,
            content: [
              ...(finalPrd?.risks || []),
              ...(finalPrd?.tradeoffs || []),
            ],
            status: "done",
          };
        }
        if (idx === 9) {
          return {
            ...sec,
            content:
              finalPrd?.risk_mitigations ||
              "Risk mitigations identified.",
            status: "done",
          };
        }
        if (idx === 10) {
          return {
            ...sec,
            content:
              finalPrd?.open_questions ||
              "Open questions identified.",
            status: "done",
          };
        }
        return sec;
      })
    );

    await new Promise((r) => setTimeout(r, 600));

    // Step 4 complete
    setSteps((prev) =>
      prev.map((step, idx) =>
        idx === 3
          ? {
              ...step,
              status: "complete",
              details: [
                "Finalized the PRD for readability",
                "Consolidated reviewed output",
                "Prepared final document structure",
              ],
            }
          : step
      )
    );

    setDocSections((prev) =>
      prev.map((sec, idx) =>
        idx === 11
          ? {
              ...sec,
              content:
                finalPrd?.rollout_plan ||
                "Final rollout plan generated from the completed PRD.",
              status: "done",
            }
          : sec
      )
    );
  } catch (error) {
    console.error(error);
    alert("Backend call failed. Check terminal logs.");
  } finally {
    setRunning(false);
  }
};
const exportToPdf = () => {
  window.print();
};
const formatSectionForCopy = (title, content) => {
  if (!content) return "";

  if (typeof content === "string") {
    return content;
  }

  if (["Target Users", "Non-Goals", "Assumptions", "Dependencies", "Risk Mitigations", "Open Questions", "Risks & Tradeoffs"].includes(title) && Array.isArray(content)) {
    return content
      .map((item) => `- ${typeof item === "string" ? item : toDisplayText(item)}`)
      .join("\n");
  }

  if (title === "Goals & Success Metrics" && Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === "string") return `- ${item}`;
        return [
          `- ${item.metric_name || item.goal || "Metric"}`,
          item.how_measured ? `  How measured: ${item.how_measured}` : null,
          item.how_it_is_measured ? `  How measured: ${item.how_it_is_measured}` : null,
          item.baseline ? `  Baseline: ${item.baseline}` : null,
          item.target ? `  Target: ${item.target}` : null,
          item.timeframe ? `  Timeframe: ${item.timeframe}` : null,
        ]
          .filter(Boolean)
          .join("\n");
      })
      .join("\n");
  }

  if (title === "Workflow" && Array.isArray(content)) {
    return content
      .map((item, idx) => {
        if (typeof item === "string") {
          return `- Workflow Step ${idx + 1}\n  ${item}`;
        }
        return [
          `- ${item.step || `Workflow Step ${idx + 1}`}`,
          item.action ? `  Action: ${item.action}` : null,
          item.output ? `  Output: ${item.output}` : null,
          item.user_interaction ? `  User interaction: ${item.user_interaction}` : null,
        ]
          .filter(Boolean)
          .join("\n");
      })
      .join("\n");
  }

  if (title === "Key Requirements" && Array.isArray(content)) {
    return content
      .map((item, idx) => {
        const criteria = Array.isArray(item.acceptance_criteria)
          ? item.acceptance_criteria.map((c) => `  - ${c}`).join("\n")
          : "";
        return [
          `${idx + 1}. ${item.story || `User Story ${idx + 1}`}`,
          criteria ? `Acceptance Criteria:\n${criteria}` : null,
        ]
          .filter(Boolean)
          .join("\n");
      })
      .join("\n\n");
  }

  if (title === "Rollout Plan" && Array.isArray(content)) {
    return content
      .map((item, idx) => {
        if (typeof item === "string") return `- ${item}`;
        return [
          `- ${item.phase || `Phase ${idx + 1}`}`,
          item.duration ? `  Duration: ${item.duration}` : null,
          item.description ? `  ${item.description}` : null,
          item.success_criteria ? `  Success criteria: ${item.success_criteria}` : null,
        ]
          .filter(Boolean)
          .join("\n");
      })
      .join("\n");
  }

  return toDisplayText(content);
};

const copyPrd = async () => {
  try {
    const statusText = getPrdStatus(reviewSummary?.quality_score);

    const contentToCopy = [
      `# ${generatedTitle || "Generated PRD"}`,
      reviewSummary
        ? `PRD Status: ${statusText}\nQuality Score: ${reviewSummary?.quality_score ?? "N/A"}\nGap Count: ${(reviewSummary?.gaps || []).length}`
        : "",
      ...docSections.map((section, index) => {
        const value = formatSectionForCopy(section.title, section.content);
        return `${index + 1}. ${section.title}\n${value}`;
      }),
    ]
      .filter(Boolean)
      .join("\n\n");

    await navigator.clipboard.writeText(contentToCopy);
    alert("PRD copied to clipboard.");
  } catch (error) {
    console.error("Copy failed:", error);
    alert("Failed to copy PRD.");
  }
};
const downloadMarkdown = () => {
  try {
    const content =
      markdownContent ||
      `# ${generatedTitle || "Generated PRD"}\n\n` +
        docSections
          .map((section, index) => {
            const value =
              typeof section.content === "string"
                ? section.content
                : toDisplayText(section.content);

            return `## ${index + 1}. ${section.title}\n${value}`;
          })
          .join("\n\n");

    const blob = new Blob([content], {
      type: "text/markdown;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const safeTitle = (generatedTitle || "prd-output")
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase();

    const link = document.createElement("a");
    link.href = url;
    link.download = `${safeTitle}.md`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Markdown download failed:", error);
    alert("Failed to download markdown.");
  }
};
const [docSections, setDocSections] = useState([
  { title: "Problem Statement", content: "", status: "empty" },
  { title: "Target Users", content: "", status: "empty" },
  { title: "Goals & Success Metrics", content: "", status: "empty" },
  { title: "Non-Goals", content: "", status: "empty" },
  { title: "Assumptions", content: "", status: "empty" },
  { title: "Workflow", content: "", status: "empty" },
  { title: "Key Requirements", content: "", status: "empty" },
  { title: "Dependencies", content: "", status: "empty" },
  { title: "Risks & Tradeoffs", content: "", status: "empty" },
  { title: "Risk Mitigations", content: "", status: "empty" },
  { title: "Open Questions", content: "", status: "empty" },
  { title: "Rollout Plan", content: "", status: "empty" },
]);

  const statusStyles = {
    complete: {
      dot: "bg-emerald-500",
      ring: "ring-emerald-200",
      text: "text-emerald-700",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      card: "border-emerald-200 bg-white",
    },
    active: {
      dot: "bg-blue-600",
      ring: "ring-blue-200",
      text: "text-blue-700",
      badge: "bg-blue-50 text-blue-700 border-blue-200",
      card: "border-blue-200 bg-blue-50/40",
    },
    upcoming: {
      dot: "bg-slate-300",
      ring: "ring-slate-200",
      text: "text-slate-500",
      badge: "bg-slate-50 text-slate-500 border-slate-200",
      card: "border-slate-200 bg-white",
    },
  };
function renderSectionContent(title, content) {
  if (!content) {
    return (
      <p className="mt-3 text-sm leading-7 text-slate-700">
        Waiting for this step...
      </p>
    );
  }

  if (typeof content === "string") {
    return (
      <p className="mt-3 text-sm leading-7 text-slate-700 whitespace-pre-line">
        {content}
      </p>
    );
  }

  if (
    ["Target Users", "Non-Goals", "Assumptions", "Dependencies", "Risk Mitigations", "Open Questions", "Risks & Tradeoffs"].includes(title) &&
    Array.isArray(content)
  ) {
    return (
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        {content.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span>{typeof item === "string" ? item : toDisplayText(item)}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (title === "Goals & Success Metrics" && Array.isArray(content)) {
    return (
      <div className="mt-3 space-y-3">
        {content.map((item, idx) => (
          <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            {typeof item === "string" ? (
              <p>{item}</p>
            ) : (
              <>
                <p><strong>{item.metric_name || item.goal || `Metric ${idx + 1}`}</strong></p>
                {item.how_measured && <p>How measured: {item.how_measured}</p>}
                {item.how_it_is_measured && <p>How measured: {item.how_it_is_measured}</p>}
                {item.baseline && <p>Baseline: {item.baseline}</p>}
                {item.target && <p>Target: {item.target}</p>}
                {item.timeframe && <p>Timeframe: {item.timeframe}</p>}
              </>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (title === "Workflow" && Array.isArray(content)) {
  return (
    <div className="mt-3 space-y-3">
      {content.map((item, idx) => {
        if (typeof item === "string") {
          return (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
            >
              <p><strong>Workflow Step {idx + 1}</strong></p>
              <p className="mt-1">{item}</p>
            </div>
          );
        }

        return (
          <div
            key={idx}
            className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
          >
            <p><strong>{item.phase || item.step || `Workflow Step ${idx + 1}`}</strong></p>
            {item.input && <p className="mt-1"><strong>Input:</strong> {item.input}</p>}
            {item.action && <p className="mt-1"><strong>Action:</strong> {item.action}</p>}
            {item.processing && <p className="mt-1"><strong>Processing:</strong> {item.processing}</p>}
            {item.output && <p className="mt-1"><strong>Output:</strong> {item.output}</p>}
            {item.user_interaction && (
              <p className="mt-1"><strong>User interaction:</strong> {item.user_interaction}</p>
            )}
            {item.user_action && (
              <p className="mt-1"><strong>User action:</strong> {item.user_action}</p>
            )}
            {!item.input &&
              !item.action &&
              !item.processing &&
              !item.output &&
              !item.user_interaction &&
              !item.user_action &&
              !item.step && (
                <p className="mt-1">{toDisplayText(item)}</p>
              )}
          </div>
        );
      })}
    </div>
  );
}

  if (title === "Key Requirements" && Array.isArray(content)) {
    return (
      <div className="mt-3 space-y-4">
        {content.map((item, idx) => (
          <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            <p><strong>{item.story || `User Story ${idx + 1}`}</strong></p>
            {Array.isArray(item.acceptance_criteria) && item.acceptance_criteria.length > 0 && (
              <ul className="mt-2 space-y-1">
                {item.acceptance_criteria.map((criterion, cidx) => (
                  <li key={cidx} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <span>{criterion}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (title === "Rollout Plan" && Array.isArray(content)) {
  return (
    <div className="mt-3 space-y-3">
      {content.map((item, idx) => (
        <div
          key={idx}
          className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
        >
          <p><strong>{item.phase || `Phase ${idx + 1}`}</strong></p>
          {item.duration && <p className="mt-1"><strong>Duration:</strong> {item.duration}</p>}
          {item.description && <p className="mt-1">{item.description}</p>}
          {item.success_criteria && (
            <p className="mt-1"><strong>Success criteria:</strong> {item.success_criteria}</p>
          )}
        </div>
      ))}
    </div>
  );
}

  return (
    <p className="mt-3 text-sm leading-7 text-slate-700 whitespace-pre-line">
      {toDisplayText(content)}
    </p>
  );
}
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
<div className="app-header mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">          <div>
            <p className="text-sm font-medium text-blue-700">PRD Agent</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              AI product workflow for structured PRD generation
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
              Turn rough feature ideas into build-ready product requirement documents with visible reasoning, guided steps, and progressive output.
            </p>
          </div>
          <div className="flex items-center gap-3">
  <button
    onClick={copyPrd}
    className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
  >
    Copy PRD
  </button>

  <button
    onClick={downloadMarkdown}
    className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
  >
    Download Markdown
  </button>

  <button
    onClick={exportToPdf}
    className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
  >
    Export PDF
  </button>
</div>
</div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_minmax(320px,420px)_1fr]">
<aside className="left-panel rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">            <div className="mb-5">
              <p className="text-sm font-medium text-slate-500">Step 1</p>
              <h2 className="mt-1 text-xl font-semibold">Define the problem</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Give the agent enough structure to think like a product manager, not a generic assistant.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Feature idea</label>
                <textarea
  value={featureIdea}
  onChange={(e) => setFeatureIdea(e.target.value)}
  className="min-h-[140px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none ring-0 transition placeholder:text-slate-400 focus:border-slate-300 focus:bg-white"
/>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Target user</label>
                <textarea
  value={targetUser}
  onChange={(e) => setTargetUser(e.target.value)}
  className="min-h-[110px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-300 focus:bg-white"
/>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Constraints</label>
                <textarea
  value={constraints}
  onChange={(e) => setConstraints(e.target.value)}
  className="min-h-[110px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-300 focus:bg-white"
/>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Prompt quality
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-4/5 rounded-full bg-slate-900" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">Strong</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Good input quality. The request has a clear outcome, user type, and interface constraints.
                </p>
              </div>

           <button
  onClick={runWorkflow}
  disabled={running}
  className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
>
  {running ? "Generating..." : "Generate PRD"}
</button>
            </div>
          </aside>

<section className="workflow-panel rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Step 2</p>
                <h2 className="mt-1 text-xl font-semibold">Agent workflow</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Visible progress creates trust. Each stage explains what the system is doing and why it matters.
                </p>
              </div>
              <div className="rounded-2xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700">
                Live run
              </div>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => {
                const style = statusStyles[step.status];
                return (
                  <div
                    key={step.id}
                    className={`rounded-2xl border p-4 transition ${style.card}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-full ring-4 ${style.dot} ${style.ring}`}>
                          <span className="text-sm font-semibold text-white">{step.id}</span>
                        </div>
                        {index < steps.length - 1 ? (
                          <div className="mt-2 h-12 w-px bg-slate-200" />
                        ) : null}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <h3 className="text-base font-semibold text-slate-900">{step.name}</h3>
                            <p className="mt-1 text-sm text-slate-600">{step.summary}</p>
                          </div>
                          <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${style.badge}`}>
                            {step.status === "complete"
                              ? "Completed"
                              : step.status === "active"
                                ? "In progress"
                                : "Pending"}
                          </span>
                        </div>

                        <div className="mt-4 rounded-2xl bg-white/80 p-3">
                          <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${style.text}`}>
                            Reasoning signals
                          </p>
                          <ul className="mt-3 space-y-2 text-sm text-slate-700">
                            {step.details.map((item) => (
                              <li key={item} className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

<main
  ref={prdExportRef}
  className="prd-panel rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
>
  <div className="prd-meta mb-5 flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500">Step 3</p>
      <h2 className="mt-1 text-xl font-semibold">Live PRD output</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
        The document builds progressively as the workflow advances, so users can review the logic instead of trusting a black-box response.
      </p>
    </div>

    <div className="flex flex-wrap gap-2">
      {reviewSummary?.quality_score >= 8 ? (
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
          Ready for stakeholders
        </span>
      ) : reviewSummary?.quality_score >= 6 ? (
        <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
          Minor review needed
        </span>
      ) : reviewSummary ? (
        <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
          Review recommended
        </span>
      ) : null}
    </div>
  </div>

  <div className="space-y-5">
    {reviewSummary && (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          Document status
        </p>
        <div className="mt-2 space-y-1 text-sm text-slate-700">
          <p>
            <strong>PRD Status:</strong> {getPrdStatus(reviewSummary?.quality_score)}
          </p>
          <p>
            <strong>Quality Score:</strong> {reviewSummary?.quality_score ?? "N/A"}
          </p>
          <p>
            <strong>Gap Count:</strong> {(reviewSummary?.gaps || []).length}
          </p>
        </div>
      </div>
    )}
{reviewSummary?.quality_score <= 6 && reviewSummary?.improvements?.length > 0 && (
  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">
      Suggested Improvements
    </p>
    <p className="mt-1 text-xs text-amber-700">
      AI detected gaps in clarity and measurability across key sections.
    </p>

    <ul className="mt-2 space-y-2 text-sm text-amber-900">
      {reviewSummary.improvements.map((imp, idx) => (
        <li key={idx} className="leading-relaxed">
          <div>
            <span className="mr-1">⚠</span>
            {typeof imp === "string" ? imp : imp.issue}
          </div>

          {typeof imp !== "string" && (
            <div className="ml-3 text-xs text-amber-700">
              → {imp.recommendation}
            </div>
          )}

          <button className="ml-3 mt-1 text-xs text-blue-600 hover:underline">
            Apply suggestion
          </button>
        </li>
      ))}
    </ul>
  </div>
)}
    <div className="print-only-problem rounded-2xl border border-slate-200 p-5">
      <h4 className="text-base font-semibold text-slate-900">
        1. Problem Statement
      </h4>
      {renderSectionContent("Problem Statement", docSections[0]?.content)}
    </div>

    {docSections[0] && (
      <section
        className="prd-section prd-problem-section rounded-2xl border border-slate-200 p-5"
      >
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-base font-semibold text-slate-900">
            1. {docSections[0].title}
          </h4>
          {docSections[0].status === "done" ? (
            <span className="prd-status-badge rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
              Filled
            </span>
          ) : (
            <span className="prd-status-badge rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
              Waiting
            </span>
          )}
        </div>
        {renderSectionContent(docSections[0].title, docSections[0].content)}
      </section>
    )}

    {docSections.slice(1).map((section, index) => (
      <section
        key={section.title}
        className="prd-section rounded-2xl border border-slate-200 p-5"
      >
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-base font-semibold text-slate-900">
            {index + 2}. {section.title}
          </h4>
          {section.status === "done" ? (
            <span className="prd-status-badge rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
              Filled
            </span>
          ) : (
            <span className="prd-status-badge rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
              Waiting
            </span>
          )}
        </div>
        {renderSectionContent(section.title, section.content)}
      </section>
    ))}
  </div>
</main>
        </div>
      </div>
    </div>
  );
}
