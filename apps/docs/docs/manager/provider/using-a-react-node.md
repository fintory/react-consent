---
sidebar_position: 1
---

# Using a React node

You can either use the `ConsentManagerProvider` using a function as `children`, or a normal `ReactNode`.

When using the react node, you are only able to use the `useConsentManager` hook in any children component under the `ConsentManagerProvider`.

You **may** want to place it around your cookie banner directly, but be sure to know, that with this strategy, you are not able to open up the cookie banner using our internal technique again.

## Usage

```tsx title="components/CookieBanner.tsx"
import { useConsentManager } from "utils/consent-manager";

export default function CookieBanner() {
  const { saveConsent } = useConsentManager();

  return (
    <div>
      {/* This is a basic example, with only a save button. */}
      <button onClick={saveConsent}>Save consent</button>
    </div>
  );
}
```

```tsx title="pages/_app.tsx"
import { ConsentManagerProvider } from "utils/consent-manager";

const handleConsentSaved = () => {};

export default function App() {
  return (
    <ConsentManagerProvider onConsentSaved={handleConsentSaved}>
      {({ saveConsent }) => <button onClick={saveConsent}>Save consent</button>}
    </ConsentManagerProvider>
  );
}
```
