import { assert, type Equals } from "tsafe";
import { createConsentManager } from "../lib/client";

describe("createConsentManager", () => {
  const attributesToCheckFor = [
    "categories",
    "ConsentManagerContext",
    "ConsentManagerContext",
    "useConsentManager",
    "saveCookie",
  ];

  attributesToCheckFor.forEach((attribute) => {
    it(`exposes "${attribute}" attribute`, () => {
      const consentManager = createConsentManager({
        categories: ["category-1", "category-2", "category-3"],
      });

      expect(consentManager).toHaveProperty(attribute);
    });
  });

  it("types correctly", () => {
    const consentManager = createConsentManager({
      categories: ["custom-category-1", "category-2", "category-3"],
    });

    assert<
      Equals<
        typeof consentManager["categories"],
        readonly ("custom-category-1" | "category-2" | "category-3")[]
      >
    >();
  });
});
