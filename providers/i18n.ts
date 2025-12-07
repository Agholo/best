import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import languageDetector from "i18next-browser-languagedetector";

const supportedLngs = ["en", "am", "ru"];


const initOptions = {
  backend: {
    loadPath: "/locales/{{lng}}/{{ns}}.json",
  },
  fallbackLng: "en",
  supportedLngs,
  debug: process.env.NODE_ENV === "development",
  load: "languageOnly" as const,
  defaultNS: "common",
  ns: ["common", "footer", "categories", "hero"],
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  detection: {
    order: ["localStorage", "navigator", "htmlTag"],
    caches: ["localStorage"],
    lookupLocalStorage: "i18nextLng",
  },
};

i18n
	.use(languageDetector)
	.use(HttpBackend)
  .use(initReactI18next)
  .init(initOptions);

const detectedLng = i18n.language || "en";
const baseLng = detectedLng.split("-")[0];
if (!supportedLngs.includes(baseLng)) {
  i18n.changeLanguage("en");
} else if (detectedLng !== baseLng) {
  i18n.changeLanguage(baseLng);
}

export default i18n;
