import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import {translationEN} from "@bsmp/translations";
import {translationNL} from "@bsmp/translations";
import appTranslationEN from "./locales/en/translations"
import appTranslationNL from "./locales/nl/translations"
// import {tripEN} from '@bsmp/entities';
// import {tripNL} from '@bsmp/entities';

let en = {...translationEN};
let nl = {...translationNL};
en.translations = {...en.translations, ...appTranslationEN}
nl.translations = {...nl.translations, ...appTranslationNL}

const resources = {
  "en": en,
  "en-US": en,
  'nl': nl,
  'nl-NL': nl
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: resources,
    fallbackLng: "en-US",
    // debug: true,
    // namespace used around the app
    ns: ["translations"],
    defaultNS: "translations",
    // keySeparator: false, // we use content as keys
    interpolation: {
      escapeValue: false
    }

  });

export default i18n;
