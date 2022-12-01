---
sidebar_position: 2
---

# API

## Configuration

The configuration is coming together based on some attributes, you are able to customize.

| Attribute                     | Type                        | Purpose                                         |
| ----------------------------- | --------------------------- | ----------------------------------------------- |
| `categories`                  | `readonly Category[]`       | List of categories, you want to use.            |
| `integrations?`               | `ConsentIntegration[]`      | List of integrations, you want to use.          |
| `cookieName?`                 | `string`                    | Name of the cookie, you want to use for saving. |
| `cookieExpiresIn?`            | `number`                    | Time in days, when the cookie should expire     |
| `shouldLoadConsentOnLoad?`    | `boolean`                   | Should the cookie be loaded on initial load?    |
| `defaultCategoryConsent?`     | `ConsentCategoryConsent`    | Default consent for categories                  |
| `defaultIntegrationsConsent?` | `ConsentIntegrationConsent` | Default consent for integrations                |

<sub><b>Note:</b> Attributes marked with a `?` are optional.</sub>
<br />
<sub><b>Note 2:</b> Types, that use `categories`, are most likely generic types with a strict appearance of `Category`</sub>

## `ConsentManagerProvider` Props

The `ConsentManagerProvider` component – at this moment – only accepts one prop (technically two).

| Prop name        | Type                                           | Purpose                                      |
| ---------------- | ---------------------------------------------- | -------------------------------------------- |
| `onConsentSaved` | `(c: ConsentCookieValue) => string`            | Hook that is called, when cookie is saved.   |
| `children`       | `ReactNode`                                    | Either a react node (normal react component) |
| `children`       | `(v: ConsentManagerContextValue) => ReactNode` | Or use a function in the provider.           |

:::info

Pay attention, when `shouldLoadConsentOnLoad` is `true`, the `onConsentSaved` method is called on each render (with according attribute).

:::

## `useConsentManager` attributes

### Managing category preferences

| Attribute                | Type                                                     |
| ------------------------ | -------------------------------------------------------- |
| `categories`             | `readonly Category[]`                                    |
| `categoryPreferences`    | `ConsentCategoryConsent<Category>`                       |
| `setCategoryPreferences` | `(p: Partial<ConsentCategoryConsent<Category>>) => void` |

### Managing integration preferences

| Attribute                   | Type                                                        |
| --------------------------- | ----------------------------------------------------------- |
| `integrations`              | `ConsentIntegration<Category>[]`                            |
| `integrationPreferences`    | `ConsentIntegrationConsent<Category>`                       |
| `setIntegrationPreferences` | `(p: Partial<ConsentIntegrationConsent<Category>>) => void` |

### Retrieving the state of last consent

| Attribute                 | Type      | Purpose                                           |
| ------------------------- | --------- | ------------------------------------------------- |
| `consentDate`             | `Date`    |                                                   |
| `hasConsentGiven`         | `boolean` | `true` is user has already given consent once     |
| `changedSinceConsentDate` | `boolean` | `true`, if `consentDate` < last added integration |

### Manipulate displaying of consent

The following two are just plain-ol React state, use them as you would just use `useState`.

| Attribute              | Type                                |
| ---------------------- | ----------------------------------- |
| `shouldBeDisplayed`    | `boolean`                           |
| `setShouldBeDisplayed` | `Dispatch<SetStateAction<boolean>>` |

### Saving/executing the consent

| Attribute        | Type       | Purpose                                                    |
| ---------------- | ---------- | ---------------------------------------------------------- |
| `saveConsent`    | `Function` | Saves the consent, and accepts whole new stack of consent. |
| `executeConsent` | `Function` | Executes the consent and calls `onConsentSaved`            |

## "Accept all" functionality

Because we are using `useState` and some internal calculations, it is **not** possible to do the following.

```tsx
// Don't do this.
function onClick() {
  setCategoryPreferences({ category1: true });
  setCategoryPreferences({ category2: true });
  setCategoryPreferences({ category3: true });
  saveConsent();
}

// Do this.
function onClick() {
  saveConsent({
    categories: { category1: true, category2: true, category3: true },
  });
}
```
