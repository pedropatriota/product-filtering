import {
  FC,
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getUniqueOrderedValues } from "../utils";
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
  filters: { property: "", operator: "", values: [""] || "" },
  handleSelectProperty: () => () => {},
  handleSelectOperator: () => () => {},
  handleSelectValues: () => () => {},
  valuesSelectFilter: () => [],
});

const HomeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [filters, setFilters] = useState<TFilters>({
    property: "",
    operator: "",
    values: [] && "",
  });

  const [select, setSelect] = useState<TSelect>({
    property: { label: "", value: null, type: "", values: [] },
    operator: { label: "", value: null },
    values: [],
  });

  const [filteredTable, setFilteredTable] = useState<TProductsProps>([]);

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

  const products = useMemo(() => {
    return datastore.getProducts();
  }, [filters]);

  const filteredProducts = useCallback(() => {
    let filtered = datastore.getProducts();
    const operators = datastore.getOperators();

    const property = properties.find(
      (prop) => prop.value === select.property?.value
    );

    const operator = operators.find((op) => op.id === select.operator?.value);

    filtered = filtered.filter(({ property_values }) => {
      const propertyValue = property_values.find((value) => {
        return value.property_id === property?.value;
      })?.value;

      if (propertyValue) {
        switch (operator?.id) {
          case "equals":
            return propertyValue === (filters.values as string);
          case "in": {
            const valuesToMatch = (filters.values as string[]).map((val) =>
              val.trim()
            );
            return valuesToMatch.includes(propertyValue as string);
          }
          case "contains": {
            const valuesToMatch = (filters.values as string[]).map((val) =>
              val.trim()
            );
            return (
              propertyValue &&
              valuesToMatch.some((val) =>
                (propertyValue as string).includes(val)
              )
            );
          }
          case "greater_than":
            return (
              (propertyValue as number) > parseFloat(filters.values.toString())
            );
          case "less_than":
            return (
              (propertyValue as number) < parseFloat(filters.values.toString())
            );
          case "any":
            return propertyValue !== null && propertyValue !== undefined;
          case "none":
            return propertyValue === null || propertyValue === undefined;
          default:
            return true;
        }
      }
    });

    setFilteredTable(filtered);
  }, [filters, select]);

  useEffect(() => {
    if (filters.values?.length || filters.values) {
      filteredProducts();
    }
  }, [filters.values]);

  const handleSelect = useCallback(
    (newValue: TSelect | any, propertyName: string) => {
      setSelect({ ...select, [propertyName]: newValue });

      setFilters((currentFilters) => {
        if (Array.isArray(newValue)) {
          return {
            ...currentFilters,
            [propertyName]: newValue?.map(
              ({ label }: { label: string }) => label
            ),
          };
        } else {
          return {
            ...currentFilters,
            [propertyName]: newValue?.label as string,
          };
        }
      });
    },
    [filters, select, setFilters, setSelect]
  );

  const valuesSelectFilter = (
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
  };

  useEffect(() => {
    setFilters({ ...filters, operator: "", values: [] });
    setSelect({ ...select, operator: { label: "", value: null }, values: [] });
  }, [filters.property]);

  useEffect(() => {
    if (!filters.values?.length || !filters.values) {
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
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export default HomeContextProvider;
