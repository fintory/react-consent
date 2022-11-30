import Cookies from "js-cookie";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { parseCookie } from "../shared/parseCookie";
import {
  ConsentCategoryConsent,
  ConsentCookieValue,
  ConsentIntegrationConsent,
  ConsentManagerConfiguration,
  ConsentManagerContextValue,
} from "../shared/types";

type NeededConfigurationKeys =
  | "cookieName"
  | "integrations"
  | "categories"
  | "shouldLoadConsentOnLoad"
  | "defaultCategoryConsent"
  | "defaultIntegrationsConsent";

export function createConsentManagerProvider<Category extends string>(
  Context: React.Context<ConsentManagerContextValue<Category>>,
  {
    saveCookie,
    cookieName,
    integrations,
    categories,
    shouldLoadConsentOnLoad,
    defaultCategoryConsent,
    defaultIntegrationsConsent,
  }: Required<
    Pick<ConsentManagerConfiguration<Category>, NeededConfigurationKeys>
  > & { saveCookie: (consent: ConsentCookieValue<Category>) => string }
) {
  return function ConsentManagerProvider({
    children,
    onConsentSaved,
  }: {
    children:
      | ReactNode
      | ((ctx: ConsentManagerContextValue<Category>) => ReactNode);
    onConsentSaved: (consent: ConsentCookieValue<Category>) => void;
  }) {
    /**
     * Handling the raw cookie
     */
    const [cookieValue, setCookieValue] = useState(() =>
      Cookies.get(cookieName)
    );
    const currentConsent = useMemo(
      () =>
        parseCookie(
          cookieValue,
          defaultCategoryConsent,
          defaultIntegrationsConsent
        ),
      [cookieValue]
    );

    /**
     * Handling the consent date
     */
    const [consentDate, setConsentDate] = useState(currentConsent.consentDate);
    const hasConsentGiven = !!consentDate;
    const changedSinceConsentDate = useMemo(
      () =>
        typeof consentDate === "undefined"
          ? undefined
          : integrations.some(
              (integration) =>
                integration.addedDate.getTime() > consentDate.getTime()
            ),
      [consentDate]
    );

    /**
     * Execution
     */
    const executeConsent = (
      consent: ConsentCookieValue<Category> = currentConsent
    ) => {
      onConsentSaved(consent ?? currentConsent);
      setShouldBeDisplayed(false);
    };

    useEffect(() => {
      if (shouldLoadConsentOnLoad) {
        executeConsent();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Handling display of banner.
     */
    const [_shouldBeDisplayed, setShouldBeDisplayed] = useState(false);
    const shouldBeDisplayed = !hasConsentGiven || _shouldBeDisplayed;

    /**
     * Handling preferences
     */
    const [categoryPreferences, setCategoryPreferences] = useState<
      ConsentCategoryConsent<Category>
    >(currentConsent.categories);
    const [integrationPreferences, setIntegrationPreferences] =
      useState<ConsentIntegrationConsent>(currentConsent.integrations);

    const saveConsent: ConsentManagerContextValue<Category>["saveConsent"] = (
      opts
    ) => {
      // Load the given configuration into the state of the provider.
      if (opts?.categories) setCategoryPreferences(opts.categories);
      if (opts?.integrations) setIntegrationPreferences(opts.integrations);

      const consent: ConsentCookieValue<Category> = {
        consentDate: new Date(),
        categories: opts?.categories ?? categoryPreferences,
        integrations: opts?.integrations ?? integrationPreferences,
      };

      const value = saveCookie(consent);

      executeConsent(consent);
      setConsentDate(consent.consentDate);
      setCookieValue(value);
    };

    const contextValue: ConsentManagerContextValue<Category> = {
      // Preferences
      categoryPreferences,
      setCategoryPreferences: (prefs) =>
        setCategoryPreferences((p) => ({ ...p, ...prefs })),
      integrationPreferences,
      setIntegrationPreferences: (prefs) =>
        // @ts-expect-error: OK.
        setIntegrationPreferences((p) => ({ ...p, ...prefs })),

      executeConsent,
      saveConsent,

      // Integrations
      integrations,

      // Categories
      categories,

      // Visual
      shouldBeDisplayed,
      setShouldBeDisplayed,

      // Date stuff
      consentDate,
      hasConsentGiven,
      changedSinceConsentDate,
    };

    return (
      <Context.Provider value={contextValue}>
        {typeof children === "function" ? children(contextValue) : children}
      </Context.Provider>
    );
  };
}
