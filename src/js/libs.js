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
 * ローカルストレージの設定を削除する
 */
export const deleteSetting = () => {
  localStorage.removeItem(langSettingKey);
  localStorage.removeItem(regionSettingKey);
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
    isEnLocalStorage() &&
    langSettingInUrl !== langSettingValues.en &&
    regionSettingInUrl !== regionSettingValues.us
  ) {
    search();
  }
};

/**
 * ローカルストレージの言語設定を取得してクエリパラメータに付与してリダイレクトする
 */
export const search = () => {
  const url = new URL(window.location.href);

  const { langSetting, regionSetting } = getLangAndRegionFromLocalStorage();

  if (langSetting && regionSetting) {
    url.searchParams.set(langSettingKey, langSetting);
    url.searchParams.set(regionSettingKey, regionSetting);
  } else {
    url.searchParams.delete(langSettingKey);
    url.searchParams.delete(regionSettingKey);
  }

  location.href = url;
};
