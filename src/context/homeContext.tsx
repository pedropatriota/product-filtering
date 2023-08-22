import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getUniqueOrderedValues, getMethodsByOperators } from "../utils";
import { operatorsByProperties } from "../constants";

import datastore from "../data/dataStore";

import type { TSelect, TFilters, IHomeContextProps } from "./contracts";
import type { TProductsProps } from "../data/contracts";

export const HomeContext = createContext<IHomeContextProps>({
  properties: [],
  operators: () => [],
  products: [],
  select: {
    property: { label: "", value: null, type: "", values: [] },
    operator: { label: "", value: null },
    values: [{ label: "", value: null }],
  },
  filters: { property: 0, operator: "", values: [""] || "" },
  handleSelectProperty: () => () => {},
  handleSelectOperator: () => () => {},
  handleSelectValues: () => () => {},
  valuesSelectFilter: () => [],
  applyFilters: () => {},
  clearFilters: () => {},
});

const HomeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  /*
   * States:
   */
  const [filters, setFilters] = useState<TFilters>({
    property: 0,
    operator: "",
    values: [] && "",
  });

  const [select, setSelect] = useState<TSelect>({
    property: { label: "", value: null, type: "", values: [] },
    operator: { label: "", value: null },
    values: [],
  });

  const [filteredTable, setFilteredTable] = useState<TProductsProps>([]);

  /*
   * Functions from datastore:
   */
  const products = useMemo(() => {
    return datastore.getProducts();
  }, [filters]);

  const properties = useMemo(
    () =>
      datastore.getProperties().map(({ id, name, type }) => {
        return {
          label: name,
          value: id,
          type,
        };
      }),
    []
  );

  const operators = useCallback(
    (type: "string" | "number" | "enumerated") => {
      const operatorsAllowed = operatorsByProperties[type];
      return datastore
        .getOperators()
        .filter(({ id }) => {
          return operatorsAllowed?.includes(id);
        })
        .map(({ id, text }) => {
          return {
            label: text,
            value: id,
          };
        });
    },
    [select.property?.type]
  );

  /*
   * Function responsible for filtering the table:
   */
  const filteredProducts = () => {
    let filtered = datastore.getProducts();
    const operators = datastore.getOperators();

    const property = properties.find(
      ({ value }) => value === filters?.property
    );
    const operator = operators.find((op) => op.id === filters.operator);

    filtered = filtered.filter(({ property_values }) => {
      const propertyValue = property_values.find(({ property_id }) => {
        return property_id === property?.value;
      })?.value;

      return getMethodsByOperators({ filters, propertyValue, operator });
    });

    setFilteredTable(filtered);
  };

  const applyFilters = () => filteredProducts();
  const clearFilters = () => {
    setFilters({ property: 0, operator: "", values: [] });
    setSelect({
      property: { label: "", value: null, type: "" },
      operator: { label: "", value: null },
      values: [],
    });
  };

  const handleSelect = useCallback(
    (newValue: TSelect | any, propertyName: string) => {
      setSelect({ ...select, [propertyName]: newValue });

      setFilters((currentFilters) => {
        if (Array.isArray(newValue)) {
          return {
            ...currentFilters,
            [propertyName]: newValue?.map(
              ({ value }: { value: string }) => value
            ),
          };
        } else {
          return {
            ...currentFilters,
            [propertyName]: newValue?.value,
          };
        }
      });
    },
    [filters, select, setFilters, setSelect]
  );

  const valuesSelectFilter = useCallback(
    (
      id: number | string | null
    ): { label: string; value: string | number | null }[] => {
      const options = products.map(({ property_values }) => {
        property_values.filter(({ property_id }) => {
          property_id === id;
        });
        return {
          label: property_values[id as number]?.value,
          value: property_values[id as number]?.value,
        };
      });

      return getUniqueOrderedValues(options);
    },
    []
  );

  /*
   * Effects to handle:
   * - if user change the property, it clears the operator and property values
   * - if user only change the operator, the property values is cleared
   * - if there is no filter applied, the table renders the getProducts()
   */

  useEffect(() => {
    setFilters({ ...filters, operator: "", values: [] });
    setSelect({ ...select, operator: { label: "", value: null }, values: [] });
  }, [filters.property]);

  useEffect(() => {
    setFilters({ ...filters, values: [] || "" });
    setSelect({ ...select, values: [] || "" });
  }, [filters.operator]);

  useEffect(() => {
    if (!(filters.values as string[] | number[])?.length || !filters.values) {
      setFilteredTable(products);
    }
  }, [filters.values]);

  const value = {
    properties,
    operators,
    products: filteredTable?.length > 0 ? filteredTable : products,
    select,
    filters,
    valuesSelectFilter,
    handleSelectProperty: (value: TSelect | any) =>
      handleSelect(value, "property"),
    handleSelectOperator: (value: TSelect | any) =>
      handleSelect(value, "operator"),
    handleSelectValues: (value: TSelect | any) => handleSelect(value, "values"),
    applyFilters,
    clearFilters,
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export default HomeContextProvider;
