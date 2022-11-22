import { Context, createContext } from "react";
import type { ConsentManagerContextValue } from "../shared/types";

export const createConsentContext = createContext as <
  Category extends string,
>() => Context<ConsentManagerContextValue<Category>>;
