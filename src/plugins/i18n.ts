import Vue from "vue";
import VueI18n, { LocaleMessages } from "vue-i18n";
import store from "@/store";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: loadLocaleMessages(),
});

function loadLocaleMessages(): LocaleMessages {
  const locales = require.context(
    "../locales",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const messages: LocaleMessages = {};

  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

export function setI18nLocale(locale: string) {
  i18n.locale = locale;
}

export default i18n;
