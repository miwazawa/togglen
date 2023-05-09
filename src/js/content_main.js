import {
  updateDisplay,
  setEn,
  deleteSetting,
  isEnLocalStorage,
  search,
} from "./libs.js";

export function main() {
  // トグルの入れ子
  const label = document.createElement("label");
  label.htmlFor = "togglen";
  label.className = "togglen_label";

  // チェックボックス（非表示）
  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = "togglen";
  input.className = "togglen_input";
  input.checked = isEnLocalStorage();

  // トグル本体
  const toggle = document.createElement("div");
  toggle.className = "togglen_appearance";
  const border = document.createElement("div");
  border.className = "togglen_border";
  const circle = document.createElement("div");
  circle.className = "togglen_circle";
  toggle.appendChild(input);
  toggle.appendChild(border);
  toggle.appendChild(circle);

  // 入れ子に追加
  label.appendChild(document.createTextNode("En"));
  label.appendChild(toggle);

  // 検索結果フィールドに追加
  const target = document.querySelector("#result-stats");
  target.prepend(label);

  // 英語設定だった時にリダイレクトする
  updateDisplay();

  input.addEventListener("click", () => {
    input.checked ? setEn() : deleteSetting();

    // redirect
    search();
  });
}


