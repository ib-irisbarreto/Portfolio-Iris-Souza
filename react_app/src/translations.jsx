import translations from "./translations.json";

export function getSystemLanguage() {
  const lang = navigator.language || navigator.userLanguage || "en";
  return lang.toLowerCase().startsWith("pt") ? "pt-pt" : "en";
}

const currentLang = getSystemLanguage();

export function t(key) {
  return translations[currentLang][key] || translations["en"][key] || key;
}