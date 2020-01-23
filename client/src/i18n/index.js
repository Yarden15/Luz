import en from "./en.json";
import he from "./he.json";

const langs = {
  en,
  he
};

export default function (lang = "he") {
  return langs[lang];
};