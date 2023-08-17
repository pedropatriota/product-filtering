import {
  FC,
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

import datastore from "../data/dataStore";

import { TSelect, TFilters, IHomeContextProps } from "./contracts";

export type TContextProp = { children: ReactNode };

export const HomeContext = createContext<IHomeContextProps>({
  tableHeaders: [],
  operators: [],
  products: [],
  select: {
    property: { label: "", value: null },
    operator: { label: "", value: null },
    options: [{ label: "", value: null }],
  },
  filters: { property: "", operator: "", options: [""] },
  handleSelectProperty: () => () => {},
  handleSelectOperator: () => () => {},
  handleSelectOptions: () => () => {},
});

const HomeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [filters, setFilters] = useState<TFilters>({
    property: "",
    operator: "",
    options: [],
  });

  const [select, setSelect] = useState<TSelect>({
    property: { label: "", value: null },
    operator: { label: "", value: null },
    options: [],
  });

  const TABLE_HEADERS = useMemo(
    () => [
      { label: "Product Name", value: "product_name" },
      { label: "Color", value: "color" },
      { label: "Weight (oz)", value: "weight" },
      { label: "Category", value: "category" },
      { label: "Wireless", value: "wireless" },
    ],
    []
  );

  const operators = useMemo(
    () =>
      datastore.getOperators().map(({ id, text }) => {
        return {
          label: text,
          value: id,
        };
      }),
    []
  );

  const products = useMemo(
    () =>
      datastore.getProducts().map((product) => {
        return {
          id: product.id,
          properties: product.property_values.map(({ property_id, value }) => {
            return {
              property_id,
              value,
            };
          }),
        };
      }),
    [filters]
  );

  const handleSelect = useCallback(
    (newValue: TSelect | any, propertyName: string) => {
      setSelect({ ...select, [propertyName]: newValue });
      setFilters({ ...filters, [propertyName]: newValue?.value as string });
    },
    [filters, select, setFilters, setSelect]
  );

  const value = {
    tableHeaders: TABLE_HEADERS,
    operators,
    products,
    select,
    filters,
    handleSelectProperty: (value: TSelect | any) =>
      handleSelect(value, "property"),
    handleSelectOperator: (value: TSelect | any) =>
      handleSelect(value, "operator"),
    handleSelectOptions: (value: TSelect | any) =>
      handleSelect(value, "options"),
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export default HomeContextProvider;
