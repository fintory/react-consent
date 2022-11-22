import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";
import { createConsentManagerComponent } from "../utils/template";

export default {
  title: "react-consent/Basic Examples",
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

export const Categories: Story<{}> = () =>
  factory(({ useConsentManager }) => {
    const {
      categories,
      categoryPreferences,
      setCategoryPreferences,
      saveConsent,
    } = useConsentManager();

    return (
      <>
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
        <br />
        <br />
        <pre>Category Preferences: {JSON.stringify(categoryPreferences)}</pre>
      </>
    );
  });

export const Integrations: Story<{}> = () =>
  factory(({ useConsentManager }) => {
    const {
      integrations,
      integrationPreferences,
      setIntegrationPreferences,
      saveConsent,
    } = useConsentManager();

    return (
      <>
        <h3>Integrations Preferences</h3>
        {integrations.map((integration) => (
          <label htmlFor={integration.id} key={integration.id}>
            <input
              type="checkbox"
              id={integration.id}
              onChange={(evt) =>
                setIntegrationPreferences({
                  [integration.id]: evt.currentTarget.checked,
                })
              }
            />
            <span>{integration.name}</span>
          </label>
        ))}
        <br />
        <br />
        <button onClick={saveConsent}>Save preferences</button>
        <br />
        <br />
        <pre>
          Integration Preferences: {JSON.stringify(integrationPreferences)}
        </pre>
      </>
    );
  });

export const Mixed: Story<{}> = () =>
  factory(({ useConsentManager }) => {
    const {
      categories,
      categoryPreferences,
      setCategoryPreferences,

      integrations,
      integrationPreferences,
      setIntegrationPreferences,

      saveConsent,
    } = useConsentManager();

    return (
      <>
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
        <h3>Integrations Preferences</h3>
        {integrations.map((integration) => (
          <label htmlFor={integration.id} key={integration.id}>
            <input
              type="checkbox"
              id={integration.id}
              onChange={(evt) =>
                setIntegrationPreferences({
                  [integration.id]: evt.currentTarget.checked,
                })
              }
            />
            <span>{integration.name}</span>
          </label>
        ))}
        <br />
        <br />
        <button onClick={saveConsent}>Save preferences</button>
        <br />
        <br />
        <pre>Categories: {JSON.stringify(categoryPreferences)}</pre>
        <pre>Integrations: {JSON.stringify(integrationPreferences)}</pre>
      </>
    );
  });
