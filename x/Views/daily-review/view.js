(async () => {
const currentPath = dv.current().file.path;
const file = app.vault.getAbstractFileByPath(currentPath);
const content = file ? await app.vault.cachedRead(file) : "";
const lines = content.split(/\r?\n/);

const DONE_SYMBOLS = new Set(["❶", "❷", "❸", "❹", "❺", "❻", "❼", "❽", "❾", "❿", "☑", "▣", "■", "●", "◆", "▲"]);
const INTERNAL_INTERRUPT_SYMBOLS = new Set(["✕", "I", "↺", "⟲"]);
const EXTERNAL_INTERRUPT_SYMBOLS = new Set(["☒", "✖", "O", "↗", "⚑"]);
const EARLY_FINISH_SYMBOLS = new Set(["★", "✓", "▨"]);

function splitTableLine(line) {
  if (!/^\s*\|/.test(line)) return null;
  const parts = line.split("|");
  if (parts.length < 3) return null;
  return parts.slice(1, -1).map((part) => part.trim());
}

function isSeparatorLine(line) {
  return /^\s*\|?[\s:-]+\|[\s|:-]*$/.test(line);
}

function sectionLines(title) {
  const start = lines.findIndex((line) => line.trim() === title.trim());
  if (start === -1) return [];
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i += 1) {
    if (/^###\s+/.test(lines[i])) {
      end = i;
      break;
    }
  }
  return lines.slice(start + 1, end);
}

function firstTable(section) {
  for (let i = 0; i < section.length - 1; i += 1) {
    const header = splitTableLine(section[i]);
    if (!header || !isSeparatorLine(section[i + 1])) continue;
    const rows = [];
    for (let j = i + 2; j < section.length; j += 1) {
      const row = splitTableLine(section[j]);
      if (!row) break;
      while (row.length < header.length) row.push("");
      rows.push(row);
    }
    return { header, rows };
  }
  return { header: [], rows: [] };
}

function parseEstimate(value) {
  const raw = String(value || "").replace(/\s+/g, "");
  if (!raw) return [];
  if (!/^\d+(?:\+\d+)*$/.test(raw)) return [];
  return raw.split("+").map((part) => Number(part));
}

function countSymbols(value, symbolSet) {
  return [...String(value || "").replace(/\s+/g, "")].filter((char) => symbolSet.has(char)).length;
}

function upper(value) {
  return String(value || "").trim().toUpperCase();
}

const records = firstTable(sectionLines("### 🍅 Records（番茄记录）"));
const recordRows = records.rows.map((row) => ({
  taskId: row[0] || "",
  startTime: row[1] || "",
  todo: row[2] || "",
  status: row[3] || "",
  estimating: row[4] || "",
  tracking: row[5] || ""
})).filter((row) => [row.todo, row.status, row.estimating, row.tracking].some((value) => String(value).trim()));

const emergencies = firstTable(sectionLines("### 🚨 Emergency Issue（突发情况）"));
const emergencyRows = emergencies.rows.map((row) => ({
  taskId: row[0] || "",
  startTime: row[1] || "",
  issue: row[2] || "",
  status: row[3] || "",
  tracking: row[4] || ""
})).filter((row) => [row.startTime, row.issue, row.status, row.tracking].some((value) => String(value).trim()));

const recordDone = recordRows.filter((row) => upper(row.status) === "D").length;
const recordCancelled = recordRows.filter((row) => upper(row.status) === "C").length;
const recordWorking = recordRows.filter((row) => upper(row.status) === "W").length;
const recordTodo = recordRows.filter((row) => upper(row.status) === "TD").length;

const emergencyDone = emergencyRows.filter((row) => upper(row.status) === "D").length;
const emergencyWorking = emergencyRows.filter((row) => upper(row.status) === "W").length;
const emergencyTodo = emergencyRows.filter((row) => upper(row.status) === "TD").length;
const emergencyCancelled = emergencyRows.filter((row) => upper(row.status) === "C").length;

const pomodorosUsed = recordRows.reduce((sum, row) => sum + countSymbols(row.tracking, DONE_SYMBOLS), 0);
const internalInterrupts = recordRows.reduce((sum, row) => sum + countSymbols(row.tracking, INTERNAL_INTERRUPT_SYMBOLS), 0);
const externalInterrupts = recordRows.reduce((sum, row) => sum + countSymbols(row.tracking, EXTERNAL_INTERRUPT_SYMBOLS), 0);
const earlyFinished = recordRows.reduce((sum, row) => sum + countSymbols(row.tracking, EARLY_FINISH_SYMBOLS), 0);

const overtimeTasks = recordRows.filter((row) => parseEstimate(row.estimating).length > 1).length;
const overtimeCompletedTasks = recordRows.filter((row) => upper(row.status) === "D" && parseEstimate(row.estimating).length > 1).length;
const normalCompletedTasks = recordRows.filter((row) => upper(row.status) === "D" && parseEstimate(row.estimating).length <= 1).length;
const overtimePomodoros = recordRows.reduce((sum, row) => {
  const parts = parseEstimate(row.estimating);
  if (parts.length <= 1) return sum;
  return sum + parts.slice(1).reduce((acc, value) => acc + value, 0);
}, 0);

const completedTasks = recordDone + emergencyDone;
const unfinishedTasks = recordWorking + recordTodo + emergencyWorking + emergencyTodo;
const interruptedPomodoros = internalInterrupts + externalInterrupts;

function ratio(value, total) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

function createRoot() {
  const root = dv.container.createDiv();
  root.style.cssText = "display:flex;flex-direction:column;gap:18px;margin:8px 0 16px;";
  return root;
}

function renderCards(root, cards) {
  const grid = root.createDiv();
  grid.style.cssText = "display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;";

  for (const card of cards) {
    const item = grid.createDiv();
    item.style.cssText = `padding:14px 16px;border-radius:14px;background:${card.bg};border:1px solid var(--background-modifier-border);`;

    const label = item.createDiv({ text: card.label });
    label.style.cssText = "font-size:.9em;color:var(--text-muted);margin-bottom:6px;";

    const value = item.createDiv({ text: String(card.value) });
    value.style.cssText = `font-size:1.8em;font-weight:800;line-height:1;color:${card.color};`;

    if (card.note) {
      const note = item.createDiv({ text: card.note });
      note.style.cssText = "font-size:.8em;color:var(--text-faint);margin-top:6px;";
    }
  }
}

function createDonutSvg(items, total, centerLabel) {
  const size = 170;
  const radius = 56;
  const stroke = 18;
  const circumference = 2 * Math.PI * radius;

  if (total === 0) {
    return `
      <svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
        <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="${stroke}"></circle>
        <text x="50%" y="48%" text-anchor="middle" font-size="28" font-weight="800" fill="var(--text-normal)">0</text>
        <text x="50%" y="64%" text-anchor="middle" font-size="12" fill="var(--text-muted)">${centerLabel}</text>
      </svg>
    `;
  }

  let offset = 0;
  const segments = items
    .filter((item) => item.value > 0)
    .map((item) => {
      const length = (item.value / total) * circumference;
      const segment = `
        <circle
          cx="${size / 2}"
          cy="${size / 2}"
          r="${radius}"
          fill="none"
          stroke="${item.color}"
          stroke-width="${stroke}"
          stroke-linecap="round"
          stroke-dasharray="${length} ${circumference - length}"
          stroke-dashoffset="${-offset}"
          transform="rotate(-90 ${size / 2} ${size / 2})"
        ></circle>
      `;
      offset += length;
      return segment;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="${stroke}"></circle>
      ${segments}
      <text x="50%" y="46%" text-anchor="middle" font-size="30" font-weight="800" fill="var(--text-normal)">${total}</text>
      <text x="50%" y="62%" text-anchor="middle" font-size="12" fill="var(--text-muted)">${centerLabel}</text>
    </svg>
  `;
}

function renderDonutCharts(root, charts) {
  const grid = root.createDiv();
  grid.style.cssText = "display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;";

  for (const chart of charts) {
    const total = chart.items.reduce((sum, item) => sum + item.value, 0);
    const card = grid.createDiv();
    card.style.cssText = "padding:16px;border-radius:16px;background:rgba(255,255,255,.03);border:1px solid var(--background-modifier-border);";

    const title = card.createDiv({ text: chart.title });
    title.style.cssText = "font-size:1.05em;font-weight:800;margin-bottom:12px;";

    const body = card.createDiv();
    body.style.cssText = "display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:14px;";

    const visual = body.createDiv();
    visual.style.cssText = "display:flex;justify-content:center;align-items:center;";
    visual.innerHTML = createDonutSvg(chart.items, total, chart.centerLabel);

    const legend = body.createDiv();
    legend.style.cssText = "display:flex;flex-direction:column;gap:10px;width:100%;max-width:260px;";

    for (const item of chart.items) {
      const row = legend.createDiv();
      row.style.cssText = "display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center;";

      const dot = row.createDiv();
      dot.style.cssText = `width:10px;height:10px;border-radius:999px;background:${item.color};opacity:${item.value > 0 ? 1 : .25};`;

      const label = row.createDiv({ text: item.label });
      label.style.cssText = `font-size:.92em;opacity:${item.value > 0 ? 1 : .55};`;

      const value = row.createDiv({ text: `${item.value} · ${ratio(item.value, total)}%` });
      value.style.cssText = `font-size:.88em;color:var(--text-muted);opacity:${item.value > 0 ? 1 : .6};`;
    }
  }
}

const root = createRoot();

renderCards(root, [
  { label: "已完成事项", value: completedTasks, color: "#22c55e", bg: "rgba(34,197,94,.08)" },
  { label: "未完成事项", value: unfinishedTasks, color: "#f59e0b", bg: "rgba(245,158,11,.08)" },
  { label: "已用番茄", value: pomodorosUsed, color: "#f97316", bg: "rgba(249,115,22,.08)" },
  { label: "被打断番茄", value: interruptedPomodoros, color: "#ef4444", bg: "rgba(239,68,68,.08)" },
  { label: "超时任务", value: overtimeTasks, color: "#8b5cf6", bg: "rgba(139,92,246,.08)", note: `补加 ${overtimePomodoros} 个番茄` },
  { label: "紧急事项", value: emergencyRows.length, color: "#06b6d4", bg: "rgba(6,182,212,.08)", note: `待开始 ${emergencyTodo} 个` }
]);

renderDonutCharts(root, [
  {
    title: "任务状态",
    centerLabel: "事项",
    items: [
      { label: "完成", value: completedTasks, color: "#22c55e" },
      { label: "未完成", value: unfinishedTasks, color: "#f59e0b" },
      { label: "取消", value: recordCancelled, color: "#ef4444" }
    ]
  },
  {
    title: "番茄情况",
    centerLabel: "番茄",
    items: [
      { label: "有效番茄", value: pomodorosUsed, color: "#f97316" },
      { label: "内部打断", value: internalInterrupts, color: "#e11d48" },
      { label: "外部打断", value: externalInterrupts, color: "#7c3aed" },
      { label: "提前结束", value: earlyFinished, color: "#0ea5e9" }
    ]
  },
  {
    title: "完成质量",
    centerLabel: "完成",
    items: [
      { label: "正常完成", value: normalCompletedTasks, color: "#22c55e" },
      { label: "超时完成", value: overtimeCompletedTasks, color: "#8b5cf6" }
    ]
  },
  {
    title: "紧急任务完成度",
    centerLabel: "紧急",
    items: [
      { label: "已完成", value: emergencyDone, color: "#06b6d4" },
      { label: "进行中", value: emergencyWorking, color: "#f59e0b" },
      { label: "待开始", value: emergencyTodo, color: "#64748b" },
      { label: "已取消", value: emergencyCancelled, color: "#ef4444" }
    ]
  }
]);
})();
