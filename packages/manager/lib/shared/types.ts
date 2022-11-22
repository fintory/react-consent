export type ConsentIntegrationIdentifier = string;

export type ConsentIntegration<Category extends string> = {
  id: string;
  name: string;
  category: Category;
  addedDate: Date;
};

export type ConsentIntegrationConsent = Record<
  ConsentIntegrationIdentifier,
  boolean
>;

export type ConsentCategoryConsent<Category extends string> = Record<
  Category,
  boolean
>;

export type ConsentCookieValue<Category extends string> = {
  /**
   * When `undefined`, there is no consent from the user/browser, yet.
   * @default undefined
   */
  consentDate: Date | undefined;
  integrations: ConsentIntegrationConsent;
  categories: ConsentCategoryConsent<Category>;
};

export type ConsentManagerConfiguration<Category extends string> = {
  /**
   * The list of categories, default is an array with default categories.
   * @default ["functional", "marketingAndAnalytics", "advertising"]
   */
  categories: readonly Category[];

  /**
   * The list of integrations, default is an empty array.
   * @default []
   */
  integrations?: ConsentIntegration<Category>[];

  /**
   * @default "tracking-preferences"
   */
  cookieName?: string;

  /**
   * The default time, a cookie should last, before expiring.
   * Will be defined in days.
   * @default 365
   */
  cookieExpiresIn?: number;

  /**
   * Define, if the cookie should be loaded on (and executed) on load.
   * @default true
   */
  shouldLoadConsentOnLoad?: boolean;

  /**
   * The default consent for categories.
   * @default {}
   */
  defaultCategoryConsent?: ConsentCategoryConsent<Category>;

  /**
   * @default {}
   */
  defaultIntegrationsConsent?: ConsentIntegrationConsent;
};

export type ConsentManagerContextValue<Category extends string> = {
  /**
   * A list of integrations.
   */
  integrations: ConsentIntegration<Category>[];

  /**
   * List of categories.
   */
  categories: readonly Category[];

  /**
   * Preferences based on the categories
   */
  categoryPreferences: ConsentCategoryConsent<Category>;
  setCategoryPreferences: (
    preferences: Partial<ConsentCategoryConsent<Category>>,
  ) => void;

  /**
   * Preferences based on the integrations
   */
  integrationPreferences: ConsentIntegrationConsent;
  setIntegrationPreferences: (
    preferences: Partial<ConsentIntegrationConsent>,
  ) => void;

  /**
   * The date the user saved the preferences the last time.
   */
  consentDate?: Date;

  /**
   * Has the user already given his consent (whether agreeing or declining) for
   * usage of cookies?
   *
   * NOTE: If `true` does **not** mean, the user agreed to all cookies.
   *       This flag only means, that the user has saved the preferences once.
   */
  hasConsentGiven?: boolean;

  /**
   * Has the integrations map changed since the date the consent of the user was
   * given for the last time.
   *
   * This flag is important to know about, when constantly switching
   * integrations.
   */
  changedSinceConsentDate?: boolean;

  /**
   * Should the banner be displayed on the frontend, or not.
   */
  shouldBeDisplayed: boolean;

  /**
   * This should be called, when the user wants to have the banner displayed
   * again.
   * Example Scenario: He wants to change settings again, after first consent.
   */
  setShouldBeDisplayed: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * This function can be called, to manually excecute the consent.
   */
  executeConsent: () => void | Promise<void>;

  /**
   * Simple function for saving the consent to a cookie named by the config
   * object.
   */
  saveConsent: () => void;
};
