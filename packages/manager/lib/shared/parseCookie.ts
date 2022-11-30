import type {
  ConsentCategoryConsent,
  ConsentIntegrationConsent,
  ConsentCookieValue,
} from "./types";

export function parseCookie<T extends string = string>(
  cookieValue: string | undefined,
  defaultCategoriesConsent: ConsentCategoryConsent<T>,
  defaultIntegrationsConsent: ConsentIntegrationConsent = {}
): ConsentCookieValue<T> {
  let consentCookie: ConsentCookieValue<T> = {
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
}
