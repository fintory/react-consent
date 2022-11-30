import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";
import { createConsentManagerComponent } from "../utils/template";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "react-consent/`shouldBeDisplayed` prop",
};

const factory = createConsentManagerComponent(action("Consent saved"), {
  categories: ["category-1", "category-2", "category-3"],
  integrations: [
    {
      id: "facebook-pixel",
      name: "Facebook Pixel",
      category: "category-2",
      addedDate: new Date(),
    },
  ],
});

export const ButtonToggle: Story<unknown> = () =>
  factory(({ useConsentManager }) => {
    const {
      categories,
      categoryPreferences,
      setCategoryPreferences,
      saveConsent,
      shouldBeDisplayed,
      setShouldBeDisplayed,
      // eslint-disable-next-line
    } = useConsentManager();

    return (
      <>
        <button onClick={() => setShouldBeDisplayed((sbd) => !sbd)}>
          {shouldBeDisplayed ? "hide" : "show"}
        </button>
        {shouldBeDisplayed && (
          <div>
            <h3>Category Preferences</h3>
            {categories.map((category) => (
              <label htmlFor={category} key={category}>
                <input
                  type="checkbox"
                  id={category}
                  onChange={(evt) =>
                    setCategoryPreferences({
                      [category]: evt.currentTarget.checked,
                    })
                  }
                />
                <span>{category}</span>
              </label>
            ))}
            <br />
            <br />
            <button onClick={saveConsent}>Save preferences</button>
          </div>
        )}
        <br />
        <br />
        <pre>Category Preferences: {JSON.stringify(categoryPreferences)}</pre>
      </>
    );
  });
