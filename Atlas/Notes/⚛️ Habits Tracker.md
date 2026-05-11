---
date: 2026-05-07
---

# ⚛️ Habits Tracker

> 从 `Calendar/Daily` 的 `⚛️ Habits` 区块自动汇总。

## Good Habits

```dataviewjs
const year = new Date().getFullYear();
const dailyPages = dv.pages('"Calendar/Daily"')
  .where((page) => /^\d{4}-\d{2}-\d{2}$/.test(page.file.name) && page.file.name.startsWith(String(year)))
  .sort((page) => page.file.name, "asc")
  .array();

const habits = [
  {
    label: "🍅 番茄钟",
    field: "pomodoro",
    colors: ["#ffe08a", "#ffbf69", "#ff8c42", "#d62828"]
  },
  {
    label: "💪 运动",
    field: "exercise",
    colors: ["#bbf7d0", "#86efac", "#4ade80", "#16a34a"]
  },
  {
    label: "💊 补剂",
    field: "supplements",
    colors: ["#ddd6fe", "#c4b5fd", "#a78bfa", "#7c3aed"]
  },
  {
    label: "🌙 早睡",
    field: "early_sleep",
    colors: ["#bfdbfe", "#93c5fd", "#60a5fa", "#2563eb"]
  },
  {
    label: "六级-单词",
    field: "pomodoro",
    colors: ["#ffe08a", "#ffbf69", "#ff8c42", "#d62828"]
  },
  {
    label: "六级-阅读",
    field: "pomodoro",
    colors: ["#ffe08a", "#ffbf69", "#ff8c42", "#d62828"]
  },
  {
    label: "六级-听力",
    field: "pomodoro",
    colors: ["#ffe08a", "#ffbf69", "#ff8c42", "#d62828"]
  },
];

function toIntensity(value) {
  if (value === undefined || value === null || value === "") return 0;

  const numeric = Number(value);
  if (Number.isFinite(numeric) && numeric > 0) {
    return numeric;
  }

  return 1;
}

function completedDays(field) {
  return dailyPages.filter((page) => toIntensity(page[field]) > 0).length;
}

function totalValue(field) {
  return dailyPages.reduce((sum, page) => sum + toIntensity(page[field]), 0);
}

dv.table(
  ["习惯", "打卡天数", "累计值"],
  habits.map((habit) => [habit.label, completedDays(habit.field), totalValue(habit.field)])
);

for (const habit of habits) {
  const entries = dailyPages.flatMap((page) => {
    const intensity = toIntensity(page[habit.field]);
    return intensity > 0 ? [{ date: page.file.name, intensity }] : [];
  });

  const container = this.container.createDiv();
  renderHeatmapTracker(container, {
    year,
    entries,
    heatmapTitle: habit.label,
    colorScheme: {
      paletteName: "default",
      customColors: habit.colors
    },
    intensityConfig: {
      defaultIntensity: 1,
      showOutOfRange: true,
      excludeFalsy: true
    },
    defaultEntryIntensity: 1,
    separateMonths: true,
    ui: {
      hideTabs: true,
      hideSubtitle: true
    }
  });
}
```

## Notes

- 当前读取的字段来自每日笔记：`pomodoro`、`exercise`、`supplements`、`early_sleep`
- 如果你在日记里填数字，热力图会按数字强度显示
- 如果你填的是非空内容，热力图会按 `1` 计算
