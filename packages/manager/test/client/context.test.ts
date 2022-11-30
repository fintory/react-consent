import { createConsentContext } from "../../lib/client/context";
import { assert, Equals } from "tsafe";
import React from "react";
import { ConsentManagerContextValue } from "../../lib/shared/types";

describe("createConsentContext", () => {
  it("is a wrapper for createContext", () => {
    const context = createConsentContext();

    // TODO: Perhaps create a better test to validate that this is a context.
    expect(context).toHaveProperty("Provider");
    expect(context).toHaveProperty("Consumer");
  });

  it("has the right type", () => {
    const context = createConsentContext();

    assert<
      Equals<typeof context, React.Context<ConsentManagerContextValue<string>>>
    >();
  });
});
