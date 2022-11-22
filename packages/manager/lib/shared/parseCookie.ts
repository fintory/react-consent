import type {
  ConsentCategoryConsent,
  ConsentIntegrationConsent,
  ConsentCookieValue,
} from "./types";

export const parseCookie = (
  cookieValue: string | undefined,
  defaultCategoriesConsent: ConsentCategoryConsent<string>,
  defaultIntegrationsConsent: ConsentIntegrationConsent = {},
): ConsentCookieValue<string> => {
  let consentCookie: ConsentCookieValue<string> = {
    consentDate: undefined,
    categories: defaultCategoriesConsent,
    integrations: defaultIntegrationsConsent,
  };

  if (cookieValue && typeof cookieValue === "string") {
    consentCookie = JSON.parse(cookieValue);

    if (!consentCookie.categories) {
      consentCookie.categories = defaultCategoriesConsent;
    }

    if (!consentCookie.integrations) {
      consentCookie.integrations = defaultIntegrationsConsent;
    }

    if (consentCookie.consentDate) {
      consentCookie.consentDate = new Date(consentCookie.consentDate);
    }
  }

  return consentCookie;
};
