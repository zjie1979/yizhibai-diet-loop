const STORAGE_KEY = "yizhibaiDietLoop.v1";
const ADVANCE_DELAY = 900;

const days = [
  {
    name: "第 1 天 · 香蕉蛋白日",
    summary: "参考公开转述中的一只白极简日，偏短期清空和控量。",
    meals: [
      ["早", "香蕉 1 根 + 鸡蛋 1 个 + 黑咖啡或无糖茶。", "必打卡"],
      ["中", "鸡蛋 2 个 + 无糖豆浆 1 杯。", "必打卡"],
      ["晚", "鸡蛋 1 个 + 香蕉 1 根。", "必打卡"],
      ["水", "温水为主，不硬灌水；明显头晕就停止。", "必打卡"]
    ]
  },
  {
    name: "第 2 天 · 高蛋白无主食",
    summary: "来自一只白食谱测评里常见的高蛋白低碳日，适合短期执行。",
    meals: [
      ["第一餐", "凉拌牛肉、鸡胸或去皮鸡腿 120-150g + 鸡蛋 1 个。", "必打卡"],
      ["第二餐", "水煮鸡蛋 1 个 + 蛋白棒 1 根，或换成低油瘦肉 100g。", "必打卡"],
      ["蔬菜", "如果饿，加黄瓜、番茄或生菜 1 份。", "可跳过"],
      ["水", "无糖饮品可以，避免奶茶和含糖饮料。", "必打卡"]
    ]
  },
  {
    name: "第 3 天 · 魔芋三明治日",
    summary: "更容易买到的一天，保留一点主食感。",
    meals: [
      ["第一餐", "魔芋面 1 份 + 鸡蛋 1 个，调味尽量清淡。", "必打卡"],
      ["第二餐", "三明治 1 个，优先鸡肉、牛肉、金枪鱼或鸡蛋款。", "必打卡"],
      ["补充", "可以加黑咖啡、无糖可乐或无糖茶。", "可跳过"],
      ["水", "下午容易饿，先喝水，再决定是否加蛋白。", "必打卡"]
    ]
  },
  {
    name: "第 4 天 · 快餐控制日",
    summary: "整理自公开的 KFC/塔斯汀/华莱士类三日法，重点是只吃计划内。",
    meals: [
      ["一餐", "烤鸡腿堡、鸡肉卷或板烧类三明治 1 个，配无糖饮品。", "必打卡"],
      ["另一餐", "鸡蛋 1 个、蛋白棒 1 根或烤翅 1 对，三选一。", "必打卡"],
      ["规则", "不额外加薯条、甜品、奶茶；酱料少放更稳。", "必打卡"],
      ["水", "口渴喝水或无糖茶，不用硬喝到 2L。", "必打卡"]
    ]
  },
  {
    name: "第 5 天 · 清淡快餐日",
    summary: "适合想省事但不想完全水煮的一天。",
    meals: [
      ["早", "牛奶 1 杯 + 黑咖啡或美式 1 杯。", "必打卡"],
      ["中", "板烧鸡腿三明治、帕尼尼或 Subway 半个到 1 个，配无糖饮品。", "必打卡"],
      ["晚", "鸡蛋 1 个 + 香蕉 1 根。", "必打卡"],
      ["补充", "如果午餐只吃半个三明治，另一半留到下午。", "可跳过"]
    ]
  },
  {
    name: "第 6 天 · 周末安全日",
    summary: "来自公开整理中的周末版，适合周五或出门前后。",
    meals: [
      ["早", "黑咖啡或无糖茶 + 鸡蛋 1 个。", "必打卡"],
      ["中", "手撕鸡 1 份 + 半个馒头，或鸡胸肉 + 半根玉米。", "必打卡"],
      ["晚", "蛋白棒 1 根，或鸡蛋 1 个 + 青菜包 1 个。", "必打卡"],
      ["提醒", "如果当天聚餐，把聚餐当正餐，另一餐只吃三明治或鸡蛋。", "可跳过"]
    ]
  },
  {
    name: "第 7 天 · 赛百味分餐日",
    summary: "参考公开测评里的一只白 Day7：三明治分两餐。",
    meals: [
      ["早", "鸡蛋 1 个 + 脱脂牛奶或无糖豆浆 1 杯。", "必打卡"],
      ["中", "Subway/赛百味三明治半个，优先鸡肉、牛肉、金枪鱼或火鸡款。", "必打卡"],
      ["晚", "剩下半个三明治；如果很饿，加鸡蛋 1 个。", "必打卡"],
      ["水", "无糖饮品可以，晚餐后不再加零食。", "必打卡"]
    ]
  }
];

const state = loadState();
let advanceTimer = null;

const cycleTitle = document.querySelector("#cycleTitle");
const cycleSub = document.querySelector("#cycleSub");
const percentText = document.querySelector("#percentText");
const dayName = document.querySelector("#dayName");
const slotCount = document.querySelector("#slotCount");
const mealList = document.querySelector("#mealList");
const previewList = document.querySelector("#previewList");
const historyList = document.querySelector("#historyList");
const historyCount = document.querySelector("#historyCount");
const autoNote = document.querySelector("#autoNote");

function loadState() {
  const fallback = { dayIndex: 0, round: 1, checked: [], history: [] };
  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function currentDay() {
  return days[state.dayIndex] || days[0];
}

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

function percent() {
  const total = currentDay().meals.length;
  return total ? Math.round((state.checked.length / total) * 100) : 0;
}

function renderMeals() {
  const day = currentDay();
  dayName.textContent = day.name;
  slotCount.textContent = `${state.checked.length}/${day.meals.length}`;
  mealList.innerHTML = day.meals.map(([name, food, tag], index) => `
    <button class="meal-button ${state.checked.includes(index) ? "done" : ""}" type="button" data-meal="${index}">
      <span class="box" aria-hidden="true"></span>
      <span>
        <span class="meal-name">${name}<span class="chip">${tag}</span></span>
        <span class="meal-food">${food}</span>
      </span>
    </button>
  `).join("");
}

function renderProgress() {
  const p = percent();
  cycleTitle.textContent = `第 ${state.round} 轮 · 第 ${state.dayIndex + 1} 天`;
  cycleSub.textContent = currentDay().summary;
  percentText.textContent = `${p}%`;
  document.documentElement.style.setProperty("--progress", `${p}%`);
  autoNote.classList.toggle("done", p === 100);
  autoNote.textContent = p === 100
    ? "今日完成，马上进入下一天。"
    : "打完当天所有项目后，会短暂停留并自动进入下一天。";
}

function renderPreview() {
  previewList.innerHTML = days.map((day, index) => `
    <div class="preview-item ${index === state.dayIndex ? "active" : ""}">
      <strong>${day.name}</strong>
      <span>${day.summary}</span>
    </div>
  `).join("");
}

function renderHistory() {
  historyCount.textContent = `${state.history.length} 天`;
  if (!state.history.length) {
    historyList.innerHTML = `<p class="empty">还没有完成记录。</p>`;
    return;
  }
  historyList.innerHTML = state.history.slice(0, 10).map((item) => `
    <div class="history-item">
      <strong>${item.dayName}</strong>
      <span>${item.date} · 第 ${item.round} 轮完成</span>
    </div>
  `).join("");
}

function render() {
  renderProgress();
  renderMeals();
  renderPreview();
  renderHistory();
}

function advanceDay() {
  const finishedDay = currentDay();
  state.history.unshift({
    date: todayStamp(),
    round: state.round,
    dayIndex: state.dayIndex,
    dayName: finishedDay.name
  });
  state.history = state.history.slice(0, 60);
  state.dayIndex += 1;
  if (state.dayIndex >= days.length) {
    state.dayIndex = 0;
    state.round += 1;
  }
  state.checked = [];
  saveState();
  render();
}

mealList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-meal]");
  if (!button) return;
  const index = Number(button.dataset.meal);
  if (state.checked.includes(index)) {
    state.checked = state.checked.filter((item) => item !== index);
  } else {
    state.checked = [...state.checked, index].sort((a, b) => a - b);
  }
  saveState();
  render();

  clearTimeout(advanceTimer);
  if (state.checked.length === currentDay().meals.length) {
    advanceTimer = setTimeout(advanceDay, ADVANCE_DELAY);
  }
});

document.querySelector("#undoBtn").addEventListener("click", () => {
  const last = state.history.shift();
  if (!last) return;
  state.round = last.round;
  state.dayIndex = last.dayIndex;
  state.checked = [];
  saveState();
  render();
});

document.querySelector("#resetBtn").addEventListener("click", () => {
  state.dayIndex = 0;
  state.round = 1;
  state.checked = [];
  state.history = [];
  saveState();
  render();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}

render();
