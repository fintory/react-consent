import { assert, type Equals } from "tsafe";
import { parseCookie } from "../../lib/shared/parseCookie";
import { ConsentCookieValue } from "../../lib/shared/types";

describe("parseCookie", () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date());
  });

  afterAll(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("works with undefined", () => {
    const value = parseCookie(undefined, { cat1: true, cat2: false });

    expect(value).toEqual({
      consentDate: undefined,
      categories: { cat1: true, cat2: false },
      integrations: {},
    });
  });

  it("works with value", () => {
    const date = new Date();

    const value = parseCookie(
      JSON.stringify({
        consentDate: date,
        categories: { cat3: false, cat2: true },
        integrations: {},
      }),
      { cat1: true, cat2: false }
    );

    expect(value).toMatchObject({
      consentDate: date,
      categories: { cat3: false, cat2: true },
      integrations: {},
    });
  });

  it("works with strict types", () => {
    const value = parseCookie<"cat1" | "cat3">(
      JSON.stringify({
        consentDate: new Date(),
        categories: { cat1: false, cat3: true },
        integrations: {},
      }),
      { cat1: true, cat3: false }
    );

    expect(value).toEqual({
      consentDate: new Date(),
      categories: { cat1: false, cat3: true },
      integrations: {},
    });
  });

  it("is typed correctly", () => {
    const value = parseCookie<string>("", {}, {});
    assert<Equals<typeof value, ConsentCookieValue<string>>>();
  });

  it("is typed correctly", () => {
    const value = parseCookie<"cat1" | "cat2">(
      "",
      { cat1: true, cat2: true },
      {}
    );
    assert<Equals<typeof value, ConsentCookieValue<"cat1" | "cat2">>>();
  });
});
