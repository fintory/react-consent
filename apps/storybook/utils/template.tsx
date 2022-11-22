import { createConsentManager } from "@react-consent/manager";
import type {
  ConsentCookieValue,
  ConsentManagerConfiguration,
} from "@react-consent/manager/lib/shared/types";
import type { ElementType, ReactElement } from "react";

export const createConsentManagerComponent = (
  onConsentSaved: (consent: ConsentCookieValue<string>) => void,
  config: ConsentManagerConfiguration<string>
) => {
  const { ConsentManagerProvider, ...props } = createConsentManager(config);

  return (Component: ElementType<typeof props>): ReactElement => (
    <ConsentManagerProvider onConsentSaved={onConsentSaved}>
      <Component {...props} />
    </ConsentManagerProvider>
  );
};
