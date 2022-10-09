import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState } from "./reducers";
import type { AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const sanitize = (
  queryParameters: Record<string, unknown>,
  INCLUDED_KEYWORD: string[] = [],
  NUMBER_PARAMETERS: string[] = []
): [string, unknown] | Record<string, unknown> => {
  console.log({ queryParameters, INCLUDED_KEYWORD, NUMBER_PARAMETERS });
  const result = Object.entries(queryParameters).reduce((acc, [key, value]) => {
    if (INCLUDED_KEYWORD.includes(key)) {
      acc[key] = NUMBER_PARAMETERS.includes(key) ? Number(value) : value;
    }
    return acc;
  }, {} as Record<string, unknown>);

  console.log({ result });
  return result;
};
