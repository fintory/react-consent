---
sidebar_position: 2
---

# Using a render function

You can either use the `ConsentManagerProvider` using a function as `children`, or a normal `ReactNode`.

When using the function as the children argument, you are receiving every attribute, that is in the context as the first function parameter in the function call.

:::caution

This is not recommended, since this could cause unnecessary re-renders.

:::

## Usage

```jsx title="pages/_app.tsx"
import { ConsentManagerProvider } from "utils/consent-manager";

const handleConsentSaved = () => {}

export default function App() {
  return (
    <ConsentManagerProvider onConsentSaved={handleConsentSaved}>
      {({ saveConsent }) => <button onClick={saveConsent}></button>}
    </ConsentManagerProvider>
  );
}
```
