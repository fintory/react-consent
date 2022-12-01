---
sidebar_position: 1
---

# Getting started

## Create a singleton for your manager

For creating a singleton instance for your whole project, it is recommended (but not necessary) to move everything in a separate file, so multiple other files can access your manager file.

```tsx title="utils/consent-manager.ts"
import { createConsentManager } from "@react-consent/manager";

export const { ConsentManagerProvider, useConsentManager } =
  createConsentManager(config);
```

:::caution

It might be possible, since this package is pre-v1, that the API is going to change. Before blindly updating, check our release notes please.

:::

## Using the components

When we have our singleton ready, we are able to use the provider component (`ConsentManagerProvider`) and the hook (`useConsentManager`).


```tsx title="components/CookieBanner.ts"
import { useConsentManager } from "utils/consent-manager.ts";

export const CookieBanner = () => {
  const { saveCookie, ...manager } = useConsentManager();

  // ... do something with the hook.
}
```
