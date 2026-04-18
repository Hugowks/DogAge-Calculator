const btn = document.getElementById("calcBtn");
const birthInput = document.getElementById("birthDate");
const sizeSelect = document.getElementById("dogSize");

const STORAGE_KEY = "dog-age-data";

// 對照表
const table = [
  { dog: 0.17, small: 2, large: 2 },
  { dog: 0.33, small: 6, large: 6 },
  { dog: 0.5, small: 10, large: 10 },
  { dog: 1, small: 15, large: 15 },
  { dog: 2, small: 24, large: 24 },
  { dog: 3, small: 28, large: 28 },
  { dog: 4, small: 32, large: 32 },
  { dog: 5, small: 38, large: 38 },
  { dog: 6, small: 42, large: 45 },
  { dog: 7, small: 47, large: 50 },
  { dog: 8, small: 51, large: 55 },
  { dog: 9, small: 56, large: 61 },
  { dog: 10, small: 60, large: 66 },
  { dog: 11, small: 65, large: 72 },
  { dog: 12, small: 69, large: 77 },
  { dog: 13, small: 74, large: 82 },
  { dog: 14, small: 78, large: 88 },
  { dog: 15, small: 83, large: 93 },
  { dog: 16, small: 88, large: 117 }
];

// 計算狗年齡
function getDogAge(birth) {
  const today = new Date();
  const diff = today - birth;
  return diff / (1000 * 60 * 60 * 24 * 365);
}

// 找最接近
function convertAge(age, size) {
  let closest = table[0];

  for (let i = 0; i < table.length; i++) {
    if (Math.abs(table[i].dog - age) < Math.abs(closest.dog - age)) {
      closest = table[i];
    }
  }

  return size === "small" ? closest.small : closest.large;
}

// 顯示結果
function renderResult(birthValue, size) {
  const birth = new Date(birthValue);
  const dogAge = getDogAge(birth);
  const humanAge = convertAge(dogAge, size);

  document.getElementById("dogAge").innerText = dogAge.toFixed(1) + " 歲";
  document.getElementById("humanAge").innerText = humanAge + " 歲";
}

// 👉 點擊計算
btn.addEventListener("click", () => {
  const birthValue = birthInput.value;
  const size = sizeSelect.value;

  if (!birthValue) {
    alert("請選擇日期！");
    return;
  }

  // 存進 localStorage
  const data = {
    birthDate: birthValue,
    size: size
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  renderResult(birthValue, size);
});

// 👉 頁面載入時還原資料
window.addEventListener("load", () => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    const data = JSON.parse(saved);

    // 還原 UI
    birthInput.value = data.birthDate;
    sizeSelect.value = data.size;

    // 自動顯示結果（UX 升級）
    renderResult(data.birthDate, data.size);
  }
});