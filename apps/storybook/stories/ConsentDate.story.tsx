import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";
import { createConsentManagerComponent } from "../utils/template";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "react-consent/`consentDate` prop",
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
    const { saveConsent, consentDate } =
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useConsentManager();

    return (
      <>
        <button onClick={saveConsent}>Save preferences</button>
        <br />
        <p>
          Click the &quot;Save preferences&quot; button, and see the date being updated.
        </p>
        <pre>Consent given at: {consentDate.toISOString()}</pre>
      </>
    );
  });
