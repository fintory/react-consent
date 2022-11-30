import { ConsentManagerConfiguration } from "../../lib/shared/types";

const config: Required<
  Pick<
    ConsentManagerConfiguration<string>,
    | "cookieName"
    | "integrations"
    | "categories"
    | "shouldLoadConsentOnLoad"
    | "defaultCategoryConsent"
    | "defaultIntegrationsConsent"
  >
> = {
  cookieName: "tracking-preferences",
  shouldLoadConsentOnLoad: true,
  defaultCategoryConsent: {},
  defaultIntegrationsConsent: {},
  categories: ["category-1", "category-2", "category-3"],
  integrations: [
    {
      id: "facebook-pixel",
      name: "Facebook Pixel",
      category: "category-2",
      addedDate: new Date(),
    },
  ],
};

export default config;
