const langSettingKey = "hl";
const regionSettingKey = "gl";
const langSettingValues = {
  ja: "ja",
  en: "en",
};
const regionSettingValues = {
  jp: "jp",
  us: "us",
};

const setEn = () => {
  localStorage.setItem(langSettingKey, langSettingValues.en);
  localStorage.setItem(regionSettingKey, regionSettingValues.us);
};

const setJa = () => {
  localStorage.setItem(langSettingKey, langSettingValues.ja);
  localStorage.setItem(regionSettingKey, regionSettingValues.jp);
};

const isEnLocalStorage = () => {
  const { langSetting, regionSetting } = getLangAndRegionFromLocalStorage();

  return (
    langSetting === langSettingValues.en &&
    regionSetting === regionSettingValues.us
  );
};

const getLangAndRegionFromLocalStorage = () => {
  const langSetting = localStorage.getItem(langSettingKey);
  const regionSetting = localStorage.getItem(regionSettingKey);

  return {
    langSetting,
    regionSetting,
  };
};

const getLangAndRegionFromUrl = () => {
  const url = new URL(window.location.href);

  const langSetting = url.searchParams.get(langSettingKey);
  const regionSetting = url.searchParams.get(regionSettingKey);

  return {
    langSetting,
    regionSetting,
  };
};

const updateDisplay = () => {
  const { langSetting: langSettingInUrl, regionSetting: regionSettingInUrl } =
    getLangAndRegionFromUrl();

  // ローカルストレージで英語検索設定が保存されている &&
  // クエリパラメータで言語設定がENになっていない &&
  // クエリパラメータで地域設定がUSになっていない
  if (
    isEnLocalStorage() &&
    langSettingInUrl !== langSettingValues.en &&
    regionSettingInUrl !== regionSettingValues.us
  ) {
    search();
  }
};

const search = () => {
  const { langSetting, regionSetting } = getLangAndRegionFromLocalStorage();

  if (!langSetting || !regionSetting) {
    return;
  }

  // URLを取得
  const url = new URL(window.location.href);

  url.searchParams.set(langSettingKey, langSetting);
  url.searchParams.set(regionSettingKey, regionSetting);

  location.href = url;
};

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

updateDisplay();

input.addEventListener("click", () => {
  if (input.checked) {
    // English setting
    setEn();
    search();
  } else {
    // Japanese setting
    setJa();
    search();
  }
});
