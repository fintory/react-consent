import { useContext } from "react";
import Cookies from "js-cookie";
import { createConsentContext } from "./client/context";
import { createConsentManagerProvider } from "./client/component";
import type {
  ConsentCategoryConsent,
  ConsentCookieValue,
  ConsentManagerConfiguration,
} from "./shared/types";

export function createConsentManager<Category extends string>({
  categories,
  integrations = [],
  cookieName = "tracking-preferences",
  cookieExpiresIn = 365,
  defaultCategoryConsent: _defaultCategoryConsent,
  defaultIntegrationsConsent = {},
  shouldLoadConsentOnLoad = true,
}: ConsentManagerConfiguration<Category>) {
  const defaultCategoryConsent: ConsentCategoryConsent<Category> =
    _defaultCategoryConsent ??
    categories.reduce((cur, acc) => {
      cur[acc] = false;
      return cur;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as any);
  const Context = createConsentContext<Category>();
  const useConsentManager = () => useContext(Context);
  const saveCookie = (consent: ConsentCookieValue<Category>) => {
    const value = JSON.stringify(consent);
    Cookies.set(cookieName, value, { expires: cookieExpiresIn });
    return value;
  };

  return {
    ConsentManagerContext: Context,
    ConsentManagerProvider: createConsentManagerProvider(Context, {
      saveCookie,
      integrations,
      categories,
      cookieName,
      defaultCategoryConsent,
      defaultIntegrationsConsent,
      shouldLoadConsentOnLoad,
    }),
    useConsentManager,
    saveCookie,
  };
}
