import userEvent from "@testing-library/user-event";
import { act, render } from "@testing-library/react";
import config from "../__fixtures__/config";
import { createConsentContext } from "../../lib/client/context";
import { createConsentManagerProvider } from "../../lib/client/component";
import { useContext } from "react";

const noop = jest.fn();
const user = userEvent.setup();
const context = createConsentContext();

const InnerComponent = () => {
  const { saveConsent } = useContext(context);

  return (
    <button role="button" onClick={() => saveConsent()}>
      Save
    </button>
  );
};

const InnerComponent2 = () => {
  const { saveConsent } = useContext(context);

  return (
    <button
      role="button"
      onClick={() => saveConsent({ categories: { cat1: true } })}
    >
      Save
    </button>
  );
};

describe("createConsentManagerProvider", () => {
  const Component = createConsentManagerProvider(context, {
    ...config,
    shouldLoadConsentOnLoad: false,
    saveCookie() {
      return "";
    },
  });

  it("returns a fresh react component", () => {
    const { container } = render(
      <Component onConsentSaved={noop}>
        <span />
      </Component>
    );
    expect(container).toBeInTheDocument();
  });
});

describe("ConsentManagerProvider", () => {
  const Component = createConsentManagerProvider(context, {
    ...config,
    shouldLoadConsentOnLoad: false,
    saveCookie() {
      return "";
    },
  });

  describe("children", () => {
    it("accepts a react node", () => {
      const { getByRole } = render(
        <Component onConsentSaved={noop}>
          <InnerComponent />
        </Component>
      );

      expect(getByRole("button")).toBeInTheDocument();
    });

    it("accepts a function", () => {
      const { getByRole } = render(
        <Component onConsentSaved={noop}>
          {() => <button role="button">button</button>}
        </Component>
      );

      expect(getByRole("button")).toBeInTheDocument();
    });
  });

  describe("onConsentSaved", () => {
    it("calls the onConsentSaved method, when accepted", async () => {
      const Manager = createConsentManagerProvider(context, {
        ...config,
        shouldLoadConsentOnLoad: true,
        saveCookie() {
          return "";
        },
      });

      const stub = jest.fn();
      render(
        <Manager onConsentSaved={stub}>
          <span />
        </Manager>
      );

      expect(stub).toHaveBeenCalled();
    });
    it("calls the onConsentSaved method, when accepted", async () => {
      const Manager = createConsentManagerProvider(context, {
        ...config,
        shouldLoadConsentOnLoad: false,
        saveCookie() {
          return "";
        },
      });

      const stub = jest.fn();
      const { getByRole } = render(
        <Manager onConsentSaved={stub}>
          <InnerComponent />
        </Manager>
      );

      await act(() => user.click(getByRole("button")));

      expect(stub).toHaveBeenCalled();
    });
  });

  describe("shouldBeDisplayed", () => {
    const TestComponent = () => (
      <Component onConsentSaved={noop}>
        {({ saveConsent, shouldBeDisplayed, setShouldBeDisplayed }) => (
          <div>
            {shouldBeDisplayed && (
              <span data-testid="displayWhenVisible">
                I am only here, when `shouldBeDisplayed` is true
              </span>
            )}
            <button data-testid="saveButton" onClick={() => saveConsent()}>
              Save
            </button>
            <button
              data-testid="showButton"
              onClick={() => setShouldBeDisplayed(true)}
            >
              Show
            </button>
            <button
              data-testid="hideButton"
              onClick={() => setShouldBeDisplayed(false)}
            >
              Hide
            </button>
          </div>
        )}
      </Component>
    );

    it("is true, when no consent was given", () => {
      const { queryByTestId } = render(<TestComponent />);
      expect(queryByTestId("displayWhenVisible")).toBeInTheDocument();
    });
    it("is true, when state is true", async () => {
      const { getByTestId, queryByTestId } = render(<TestComponent />);
      await act(() => user.click(getByTestId("showButton")));
      expect(queryByTestId("displayWhenVisible")).toBeInTheDocument();
    });
    it("is false, when non of above is true", async () => {
      const { getByTestId, queryByTestId } = render(<TestComponent />);
      await act(() => user.click(getByTestId("hideButton")));
      await act(() => user.click(getByTestId("saveButton")));
      expect(queryByTestId("displayWhenVisible")).toBeNull();
    });
    it("flips to false, when consent is given", async () => {
      const { getByTestId, queryByTestId } = render(<TestComponent />);
      expect(queryByTestId("displayWhenVisible")).toBeInTheDocument();
      await act(() => user.click(getByTestId("saveButton")));
      expect(queryByTestId("displayWhenVisible")).toBeNull();
    });
  });

  describe("categoryPreferences", () => {
    it("shows right preferences", () => {
      const Comp = () => {
        const { categoryPreferences } = useContext(context);
        return <span>{JSON.stringify({ categoryPreferences })} </span>;
      };

      const { getByText } = render(
        <Component onConsentSaved={noop}>
          <Comp />
        </Component>
      );

      expect(getByText(`{"categoryPreferences":{}}`)).toBeInTheDocument();
    });
  });

  describe("categories", () => {
    it("shows right categories", () => {
      const Comp = () => {
        const { categories } = useContext(context);
        return <span>{JSON.stringify({ categories })} </span>;
      };

      const { getByText } = render(
        <Component onConsentSaved={noop}>
          <Comp />
        </Component>
      );

      expect(
        getByText(`{"categories":["category-1","category-2","category-3"]}`)
      ).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it('accepts params for "saveCookie"', async () => {
      const stub = jest.fn();

      const { getByRole } = render(
        <Component onConsentSaved={stub}>
          <InnerComponent2 />
        </Component>
      );

      await act(() => user.click(getByRole("button")));

      expect(stub).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          categories: {
            cat1: true,
          },
        })
      );
    });
  });
});
