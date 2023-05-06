import {
  langSettingKey,
  regionSettingKey,
  langSettingValues,
  regionSettingValues,
} from "./const.js";

/**
 * ローカルストレージに英語設定であることを追加する
 */
export const setEn = () => {
  localStorage.setItem(langSettingKey, langSettingValues.en);
  localStorage.setItem(regionSettingKey, regionSettingValues.us);
};

/**
 * ローカルストレージに日本語設定であることを追加する
 */
export const setJa = () => {
  localStorage.setItem(langSettingKey, langSettingValues.ja);
  localStorage.setItem(regionSettingKey, regionSettingValues.jp);
};

/**
 * ローカルストレージに英語設定であることが追加されている
 */
export const isEnLocalStorage = () => {
  const { langSetting, regionSetting } = getLangAndRegionFromLocalStorage();

  return (
    langSetting === langSettingValues.en &&
    regionSetting === regionSettingValues.us
  );
};

/**
 * ローカルストレージに日本語設定であることが追加されている
 */
export const isJaLocalStorage = () => {
  const { langSetting, regionSetting } = getLangAndRegionFromLocalStorage();

  return (
    langSetting === langSettingValues.ja &&
    regionSetting === regionSettingValues.jp
  );
};

/**
 * ローカルストレージから言語設定を取得する
 */
const getLangAndRegionFromLocalStorage = () => {
  const langSetting = localStorage.getItem(langSettingKey);
  const regionSetting = localStorage.getItem(regionSettingKey);

  return {
    langSetting,
    regionSetting,
  };
};

/**
 * クエリパラメータから言語設定を取得する
 */
const getLangAndRegionFromUrl = () => {
  const url = new URL(window.location.href);

  const langSetting = url.searchParams.get(langSettingKey);
  const regionSetting = url.searchParams.get(regionSettingKey);

  return {
    langSetting,
    regionSetting,
  };
};

/**
 * ローカルストレージの言語設定で再検索する
 */
export const updateDisplay = () => {
  const { langSetting: langSettingInUrl, regionSetting: regionSettingInUrl } =
    getLangAndRegionFromUrl();

  // ローカルストレージの言語設定とクエリパラメータが一致していない時はリダイレクト
  if (
    (isEnLocalStorage() &&
      langSettingInUrl !== langSettingValues.en &&
      regionSettingInUrl !== regionSettingValues.us) ||
    (isJaLocalStorage() &&
      langSettingInUrl !== langSettingValues.ja &&
      regionSettingInUrl !== regionSettingValues.jp)
  ) {
    search();
  }
};

/**
 * ローカルストレージの言語設定を取得してクエリパラメータに付与してリダイレクトする
 */
export const search = () => {
  const { langSetting, regionSetting } = getLangAndRegionFromLocalStorage();

  if (!langSetting || !regionSetting) {
    return;
  }

  const url = new URL(window.location.href);

  url.searchParams.set(langSettingKey, langSetting);
  url.searchParams.set(regionSettingKey, regionSetting);

  location.href = url;
};
