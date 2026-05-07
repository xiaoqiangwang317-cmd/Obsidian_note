const { MarkdownView, Notice, Plugin, SuggestModal } = require("obsidian");

const PHASE_SYMBOLS = [
  { pending: "①", done: "❶" },
  { pending: "②", done: "❷" },
  { pending: "③", done: "❸" },
  { pending: "④", done: "❹" },
  { pending: "⑤", done: "❺" },
  { pending: "⑥", done: "❻" },
  { pending: "⑦", done: "❼" },
  { pending: "⑧", done: "❽" },
  { pending: "⑨", done: "❾" },
  { pending: "⑩", done: "❿" }
];

const EARLY_FINISH = "★";
const INTERNAL_INTERRUPT = "✕";
const EXTERNAL_INTERRUPT = "☒";
const LEGACY_PENDING = new Set(["☐", "▢", "□", "○", "◇", "△"]);
const LEGACY_DONE = new Set(["☑", "▣", "■", "●", "◆", "▲"]);
const LEGACY_EARLY = new Set(["▨", "✓"]);
const LEGACY_INTERNAL = new Set(["I", "↺", "⟲"]);
const LEGACY_EXTERNAL = new Set(["O", "↗", "⚑", "✖"]);

const PENDING_SYMBOLS = new Set(PHASE_SYMBOLS.map((phase) => phase.pending));
const DONE_SYMBOLS = new Set(PHASE_SYMBOLS.map((phase) => phase.done));
const COMMANDS = {
  sync: "Sync current note",
  mark: "Mark pomodoro outcome"
};

class SelectModal extends SuggestModal {
  constructor(app, items, placeholder) {
    super(app);
    this.items = items;
    this.result = null;
    this.resolvePromise = null;
    this.setPlaceholder(placeholder);
  }

  getSuggestions(query) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return this.items;
    }

    return this.items.filter((item) => {
      return item.label.toLowerCase().includes(normalized) ||
        (item.description || "").toLowerCase().includes(normalized);
    });
  }

  renderSuggestion(item, el) {
    el.createDiv({ text: item.label });
    if (item.description) {
      el.createEl("small", { text: item.description });
    }
  }

  onChooseSuggestion(item) {
    this.result = item;
    if (this.resolvePromise) {
      const resolve = this.resolvePromise;
      this.resolvePromise = null;
      resolve(item);
    }
  }

  onClose() {
    if (this.resolvePromise) {
      const resolve = this.resolvePromise;
      this.resolvePromise = null;
      resolve(this.result);
    }
  }

  waitForSelection() {
    this.open();
    return new Promise((resolve) => {
      this.resolvePromise = resolve;
    });
  }
}

function normalizeNewlines(content) {
  return content.replace(/\r\n?/g, "\n");
}

function splitTableLine(line) {
  if (!/^\s*\|/.test(line)) {
    return null;
  }

  const parts = line.split("|");
  if (parts.length < 3) {
    return null;
  }

  return parts.slice(1, -1).map((part) => part.trim());
}

function buildTableLine(cells) {
  return `| ${cells.map((cell) => (cell ?? "").trim()).join(" | ")} |`;
}

function isSeparatorLine(line) {
  return /^\s*\|?[\s:-]+\|[\s|:-]*$/.test(line);
}

function normalizeHeader(header) {
  return header.trim().toLowerCase();
}

function getColumnMap(headers) {
  const columns = {};

  headers.forEach((header, index) => {
    const normalized = normalizeHeader(header);

    if (normalized === "taskid") {
      columns.taskId = index;
    } else if (normalized === "start time" || normalized === "starttime" || normalized === "start") {
      columns.startTime = index;
    } else if (normalized === "to do" || normalized === "todo") {
      columns.todo = index;
    } else if (normalized === "status") {
      columns.status = index;
    } else if (normalized === "estimating") {
      columns.estimating = index;
    } else if (normalized === "tracking") {
      columns.tracking = index;
    }
  });

  return columns;
}

function parseEstimate(rawValue) {
  const raw = (rawValue || "").replace(/\s+/g, "");

  if (!raw) {
    return [];
  }

  const parts = raw.split("+").filter(Boolean);
  const counts = [];

  for (const part of parts) {
    if (!/^\d+$/.test(part)) {
      return null;
    }

    const count = Number.parseInt(part, 10);
    if (count <= 0) {
      return null;
    }

    counts.push(count);
  }

  return counts.length > 0 ? counts : null;
}

function categorizeToken(token) {
  if (PENDING_SYMBOLS.has(token) || LEGACY_PENDING.has(token)) {
    return "pending";
  }

  if (DONE_SYMBOLS.has(token) || LEGACY_DONE.has(token)) {
    return "done";
  }

  if (token === EARLY_FINISH || LEGACY_EARLY.has(token)) {
    return "early";
  }

  if (token === INTERNAL_INTERRUPT || LEGACY_INTERNAL.has(token)) {
    return "internal";
  }

  if (token === EXTERNAL_INTERRUPT || LEGACY_EXTERNAL.has(token)) {
    return "external";
  }

  return "unknown";
}

function tokenizeTracking(rawValue) {
  return [...(rawValue || "").replace(/\s+/g, "")].filter((token) => categorizeToken(token) !== "unknown");
}

function getPhase(index) {
  return PHASE_SYMBOLS[Math.min(index, PHASE_SYMBOLS.length - 1)];
}

function normalizeTracking(estimateValue, trackingValue) {
  const estimate = parseEstimate(estimateValue);

  if (estimate === null) {
    return (trackingValue || "").trim();
  }

  if (estimate.length === 0) {
    return "";
  }

  const rawTokens = tokenizeTracking(trackingValue);
  const tokens = [];
  let rawIndex = 0;

  for (let phaseIndex = 0; phaseIndex < estimate.length; phaseIndex += 1) {
    const phase = getPhase(phaseIndex);

    for (let slot = 0; slot < estimate[phaseIndex]; slot += 1) {
      const rawToken = rawTokens[rawIndex];
      const category = categorizeToken(rawToken);

      if (category === "early") {
        tokens.push(EARLY_FINISH);
        return tokens.join("");
      }

      if (category === "internal") {
        tokens.push(INTERNAL_INTERRUPT);
        rawIndex += 1;
        continue;
      }

      if (category === "external") {
        tokens.push(EXTERNAL_INTERRUPT);
        rawIndex += 1;
        continue;
      }

      if (category === "done") {
        tokens.push(phase.done);
        rawIndex += 1;
        continue;
      }

      if (category === "pending") {
        tokens.push(phase.pending);
        rawIndex += 1;
        continue;
      }

      tokens.push(phase.pending);
    }
  }

  return tokens.join("");
}

function applyOutcome(estimateValue, trackingValue, outcome) {
  const estimate = parseEstimate(estimateValue);

  if (estimate === null || estimate.length === 0) {
    return {
      ok: false,
      message: "请先在 Estimating 中填写类似 3 或 3+2 的预估，再记录 Tracking。"
    };
  }

  const normalizedTracking = normalizeTracking(estimateValue, trackingValue);
  const tokens = [...normalizedTracking];
  const pendingIndex = tokens.findIndex((token) => PENDING_SYMBOLS.has(token));

  if (pendingIndex === -1) {
    return {
      ok: false,
      message: "当前没有可记录的待执行格子了。如果还没做完，请先增加 Estimating。"
    };
  }

  if (outcome === "done") {
    const pendingToken = tokens[pendingIndex];
    const phase = PHASE_SYMBOLS.find((item) => item.pending === pendingToken);
    tokens[pendingIndex] = phase ? phase.done : pendingToken;
  } else if (outcome === "internal") {
    tokens[pendingIndex] = INTERNAL_INTERRUPT;
  } else if (outcome === "external") {
    tokens[pendingIndex] = EXTERNAL_INTERRUPT;
  } else if (outcome === "early") {
    tokens.splice(pendingIndex);
    tokens.push(EARLY_FINISH);
  } else {
    return {
      ok: false,
      message: "Unsupported outcome."
    };
  }

  return {
    ok: true,
    tracking: tokens.join("")
  };
}

function extractPomodoroTables(lines) {
  const tables = [];

  for (let index = 0; index < lines.length - 1; index += 1) {
    const headers = splitTableLine(lines[index]);
    if (!headers) {
      continue;
    }

    const columns = getColumnMap(headers);
    if (columns.taskId == null || columns.estimating == null || columns.tracking == null) {
      continue;
    }

    if (!isSeparatorLine(lines[index + 1])) {
      continue;
    }

    let rowStart = index + 2;
    let rowEnd = rowStart;

    while (rowEnd < lines.length && /^\s*\|/.test(lines[rowEnd])) {
      rowEnd += 1;
    }

    tables.push({
      headerLine: index,
      rowStart,
      rowEnd,
      columns,
      columnCount: headers.length
    });

    index = rowEnd - 1;
  }

  return tables;
}

function extractPomodoroRows(lines) {
  const tables = extractPomodoroTables(lines);
  const rows = [];

  for (const table of tables) {
    for (let lineIndex = table.rowStart; lineIndex < table.rowEnd; lineIndex += 1) {
      const cells = splitTableLine(lines[lineIndex]);
      if (!cells) {
        continue;
      }

      while (cells.length < table.columnCount) {
        cells.push("");
      }

      const taskId = cells[table.columns.taskId] || "";
      const todo = table.columns.todo != null ? (cells[table.columns.todo] || "") : "";
      const status = table.columns.status != null ? (cells[table.columns.status] || "") : "";
      const estimating = cells[table.columns.estimating] || "";
      const tracking = cells[table.columns.tracking] || "";

      if (![taskId, todo, status, estimating, tracking].some((value) => String(value).trim())) {
        continue;
      }

      rows.push({
        table,
        lineIndex,
        cells,
        taskId,
        todo,
        status,
        estimating,
        tracking,
        label: `${taskId || "--"} · ${todo || "(empty task)"}`
      });
    }
  }

  return rows;
}

function transformContent(rawContent) {
  const content = normalizeNewlines(rawContent);
  const lines = content.split("\n");
  const rows = extractPomodoroRows(lines);
  let changed = false;
  let rowsUpdated = 0;

  for (const row of rows) {
    const cells = splitTableLine(lines[row.lineIndex]);
    if (!cells) {
      continue;
    }

    while (cells.length < row.table.columnCount) {
      cells.push("");
    }

    const estimateValue = cells[row.table.columns.estimating] || "";
    const trackingValue = cells[row.table.columns.tracking] || "";
    const nextTrackingValue = normalizeTracking(estimateValue, trackingValue);

    if (nextTrackingValue !== trackingValue.trim()) {
      cells[row.table.columns.tracking] = nextTrackingValue;
      lines[row.lineIndex] = buildTableLine(cells);
      changed = true;
      rowsUpdated += 1;
    }
  }

  return {
    changed,
    content: lines.join("\n"),
    rowsUpdated
  };
}

module.exports = class PomodoroTrackingPlugin extends Plugin {
  async onload() {
    this.isApplying = false;
    this.syncTimer = null;

    this.addCommand({
      id: "sync-current-note",
      name: COMMANDS.sync,
      callback: async () => await this.runSafely(() => this.syncActiveNote(true))
    });

    this.addCommand({
      id: "sync-current-note-alias",
      name: "Pomodoro Tracking: Sync current note",
      callback: async () => await this.runSafely(() => this.syncActiveNote(true))
    });

    this.addCommand({
      id: "mark-pomodoro-outcome",
      name: COMMANDS.mark,
      callback: async () => await this.runSafely(() => this.markPomodoroOutcome())
    });

    this.addCommand({
      id: "mark-pomodoro-outcome-alias",
      name: "Pomodoro Tracking: Mark pomodoro outcome",
      callback: async () => await this.runSafely(() => this.markPomodoroOutcome())
    });

    this.addCommand({
      id: "mark-pomodoro-done",
      name: "Mark pomodoro as done",
      callback: async () => await this.runSafely(() => this.markPomodoroWithFixedOutcome("done"))
    });

    this.addCommand({
      id: "mark-pomodoro-done-alias",
      name: "Pomodoro Tracking: Mark pomodoro as done",
      callback: async () => await this.runSafely(() => this.markPomodoroWithFixedOutcome("done"))
    });

    this.addCommand({
      id: "mark-pomodoro-internal",
      name: "Mark pomodoro as internal interrupt",
      callback: async () => await this.runSafely(() => this.markPomodoroWithFixedOutcome("internal"))
    });

    this.addCommand({
      id: "mark-pomodoro-internal-alias",
      name: "Pomodoro Tracking: Mark pomodoro as internal interrupt",
      callback: async () => await this.runSafely(() => this.markPomodoroWithFixedOutcome("internal"))
    });

    this.addCommand({
      id: "mark-pomodoro-external",
      name: "Mark pomodoro as external interrupt",
      callback: async () => await this.runSafely(() => this.markPomodoroWithFixedOutcome("external"))
    });

    this.addCommand({
      id: "mark-pomodoro-external-alias",
      name: "Pomodoro Tracking: Mark pomodoro as external interrupt",
      callback: async () => await this.runSafely(() => this.markPomodoroWithFixedOutcome("external"))
    });

    this.addCommand({
      id: "mark-pomodoro-early",
      name: "Mark pomodoro as early finish",
      callback: async () => await this.runSafely(() => this.markPomodoroWithFixedOutcome("early"))
    });

    this.addCommand({
      id: "mark-pomodoro-early-alias",
      name: "Pomodoro Tracking: Mark pomodoro as early finish",
      callback: async () => await this.runSafely(() => this.markPomodoroWithFixedOutcome("early"))
    });

    this.registerEvent(this.app.workspace.on("editor-change", (editor) => {
      this.scheduleSync(editor, 700);
    }));

    this.registerEvent(this.app.workspace.on("file-open", () => {
      const view = this.getActiveMarkdownView();
      if (view?.editor) {
        this.scheduleSync(view.editor, 250);
      } else {
        window.setTimeout(async () => {
          await this.runSafely(() => this.syncActiveNote(false));
        }, 250);
      }
    }));
  }

  onunload() {
    if (this.syncTimer) {
      window.clearTimeout(this.syncTimer);
    }
  }

  async runSafely(action) {
    try {
      return await action();
    } catch (error) {
      console.error("Pomodoro Tracking error:", error);
      new Notice(`Pomodoro Tracking 出错了：${error.message || error}`);
      return null;
    }
  }

  getActiveMarkdownView() {
    return this.app.workspace.getActiveViewOfType(MarkdownView);
  }

  scheduleSync(editor, delayMs) {
    if (this.isApplying) {
      return;
    }

    const view = this.getActiveMarkdownView();
    if (!view?.file || view.editor !== editor) {
      return;
    }

    if (this.syncTimer) {
      window.clearTimeout(this.syncTimer);
    }

    this.syncTimer = window.setTimeout(async () => {
      await this.syncActiveEditor(view, false);
    }, delayMs);
  }

  async getContentContext() {
    const view = this.getActiveMarkdownView();
    const file = view?.file || this.app.workspace.getActiveFile();

    if (!file) {
      return null;
    }

    if (view?.editor && view.file === file) {
      return {
        file,
        editor: view.editor,
        content: view.editor.getValue(),
        cursor: view.editor.getCursor()
      };
    }

    return {
      file,
      editor: null,
      content: await this.app.vault.read(file),
      cursor: null
    };
  }

  async applyEditorChanges(editor, oldContent, newContent) {
    const oldLines = normalizeNewlines(oldContent).split("\n");
    const newLines = normalizeNewlines(newContent).split("\n");
    const cursor = editor.getCursor();

    this.isApplying = true;

    try {
      if (oldLines.length !== newLines.length) {
        editor.setValue(newContent);
      } else {
        for (let lineIndex = oldLines.length - 1; lineIndex >= 0; lineIndex -= 1) {
          if (oldLines[lineIndex] !== newLines[lineIndex]) {
            editor.replaceRange(
              newLines[lineIndex],
              { line: lineIndex, ch: 0 },
              { line: lineIndex, ch: oldLines[lineIndex].length }
            );
          }
        }
      }

      const maxLine = Math.min(cursor.line, newLines.length - 1);
      const maxCh = Math.min(cursor.ch, (newLines[maxLine] || "").length);
      editor.setCursor({ line: maxLine, ch: maxCh });
    } finally {
      this.isApplying = false;
    }
  }

  async writeContext(context, newContent) {
    if (context.editor) {
      await this.applyEditorChanges(context.editor, context.content, newContent);
      return;
    }

    this.isApplying = true;
    try {
      await this.app.vault.modify(context.file, newContent);
    } finally {
      this.isApplying = false;
    }
  }

  async syncActiveEditor(view, showNotice) {
    if (!view?.editor || !view.file) {
      return false;
    }

    const currentContent = view.editor.getValue();
    const result = transformContent(currentContent);

    if (!result.changed) {
      if (showNotice) {
        new Notice("Tracking 已经是最新状态。");
      }
      return false;
    }

    await this.applyEditorChanges(view.editor, currentContent, result.content);

    if (showNotice) {
      new Notice(`已同步 ${result.rowsUpdated} 行 Tracking。`);
    }

    return true;
  }

  async syncActiveNote(showNotice) {
    const view = this.getActiveMarkdownView();
    if (view?.editor && view.file) {
      return this.syncActiveEditor(view, showNotice);
    }

    const file = this.app.workspace.getActiveFile();
    if (!file) {
      new Notice("没有找到当前笔记。");
      return false;
    }

    const currentContent = await this.app.vault.read(file);
    const result = transformContent(currentContent);

    if (!result.changed) {
      if (showNotice) {
        new Notice("Tracking 已经是最新状态。");
      }
      return false;
    }

    this.isApplying = true;
    try {
      await this.app.vault.modify(file, result.content);
    } finally {
      this.isApplying = false;
    }

    if (showNotice) {
      new Notice(`已同步 ${result.rowsUpdated} 行 Tracking。`);
    }

    return true;
  }

  async chooseRow(rows) {
    const visibleRows = rows.filter((row) => {
      return row.todo.trim() || row.estimating.trim() || row.tracking.trim();
    });

    const items = visibleRows.map((row) => {
      const tracking = normalizeTracking(row.estimating, row.tracking);
      return {
        row,
        label: row.label,
        description: `预估：${row.estimating || "-"} ｜ 跟踪：${tracking || "-"}`
      };
    });

    const modal = new SelectModal(this.app, items, "选择要记录的任务");
    const selection = await modal.waitForSelection();
    return selection?.row || null;
  }

  async chooseOutcome() {
    const items = [
      {
        id: "done",
        label: "完成一格",
        description: "把下一格待执行符号改成已完成"
      },
      {
        id: "internal",
        label: "内部打断",
        description: `把下一格记为 ${INTERNAL_INTERRUPT}`
      },
      {
        id: "external",
        label: "外部打断",
        description: `把下一格记为 ${EXTERNAL_INTERRUPT}`
      },
      {
        id: "early",
        label: "提前结束",
        description: `用 ${EARLY_FINISH} 结束剩余计划`
      }
    ];

    const modal = new SelectModal(this.app, items, "选择本格结果");
    return modal.waitForSelection();
  }

  getActionableRows(rows) {
    return rows.filter((row) => {
      const status = row.status.trim().toUpperCase();
      return row.todo.trim() &&
        status !== "D" &&
        status !== "C" &&
        parseEstimate(row.estimating)?.length > 0 &&
        [...normalizeTracking(row.estimating, row.tracking)].some((token) => PENDING_SYMBOLS.has(token));
    });
  }

  async resolveTargetRow(rows, context, usePicker, fallbackToFirstActionable) {
    if (context.cursor) {
      const cursorRow = rows.find((row) => row.lineIndex === context.cursor.line) || null;
      if (cursorRow) {
        return cursorRow;
      }
    }

    const workingRows = this.getActionableRows(rows).filter((row) => {
      return row.status.trim().toUpperCase() === "W";
    });

    if (workingRows.length === 1) {
      return workingRows[0];
    }

    const actionableRows = this.getActionableRows(rows);

    if (actionableRows.length === 1) {
      return actionableRows[0];
    }

    if (fallbackToFirstActionable && actionableRows.length > 0) {
      new Notice("未定位到当前任务，已默认记录第一条可执行任务。建议把当前任务状态设为 W。");
      return actionableRows[0];
    }

    if (usePicker) {
      new Notice("请选择要记录的任务行。");
      return await this.chooseRow(actionableRows.length > 0 ? actionableRows : rows);
    }

    return null;
  }

  async applyOutcomeToCurrentNote(outcomeId, usePicker, fallbackToFirstActionable) {
    await this.syncActiveNote(false);

    const context = await this.getContentContext();
    if (!context) {
      new Notice("没有找到当前笔记。");
      return false;
    }

    const lines = normalizeNewlines(context.content).split("\n");
    const rows = extractPomodoroRows(lines);

    if (rows.length === 0) {
      new Notice("当前笔记里没有找到番茄记录表。");
      return false;
    }

    const targetRow = await this.resolveTargetRow(rows, context, usePicker, fallbackToFirstActionable);

    if (!targetRow) {
      return false;
    }

    const outcome = outcomeId ? { id: outcomeId } : await this.chooseOutcome();
    if (!outcome) {
      return false;
    }

    const liveLines = normalizeNewlines(context.content).split("\n");
    const cells = splitTableLine(liveLines[targetRow.lineIndex]);

    if (!cells) {
      new Notice("选中的这一行无法解析。");
      return false;
    }

    while (cells.length < targetRow.table.columnCount) {
      cells.push("");
    }

    const estimateValue = cells[targetRow.table.columns.estimating] || "";
    const trackingValue = cells[targetRow.table.columns.tracking] || "";
    const result = applyOutcome(estimateValue, trackingValue, outcome.id);

    if (!result.ok) {
      new Notice(result.message);
      return false;
    }

    cells[targetRow.table.columns.tracking] = result.tracking;
    liveLines[targetRow.lineIndex] = buildTableLine(cells);

    await this.writeContext(context, liveLines.join("\n"));
    new Notice(`已更新 ${targetRow.taskId || "任务"} 的 Tracking。`);
    return true;
  }

  async markPomodoroOutcome() {
    return this.applyOutcomeToCurrentNote(null, true, false);
  }

  async markPomodoroWithFixedOutcome(outcomeId) {
    return this.applyOutcomeToCurrentNote(outcomeId, false, true);
  }
};
