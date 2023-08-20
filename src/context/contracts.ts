import { TProductsProps } from "../data/contracts";

export type TFilters = {
  property: string;
  operator: string;
  values: string[] | string;
};

export type TSelect = {
  property: {
    label: string;
    value: number | string | null;
    type: string;
    values?: string[];
  };
  operator: { label: string; value: number | string | null };
  values: { label: string; value: number | string | null }[];
};

export interface IHomeContextProps {
  filters: TFilters;
  select: TSelect;
  operators: (type: "string" | "number" | "enumerated") => {
    label: string;
    value: string;
  }[];
  properties: {
    label: string;
    value: number;
    type: string;
    values?: string[];
  }[];
  products: TProductsProps;
  handleSelectProperty: (value: TSelect | any) => void;
  handleSelectOperator: (value: TSelect | any) => void;
  handleSelectValues: (value: TSelect | any) => void;
  valuesSelectFilter: (id: string | number | null) =>
    | {
        label: string;
        value: string | number | null;
      }[];
}
