export type TFilters = {
  property: string;
  operator: string;
  options: string[];
};

export type TSelect = {
  property: { label: string; value: number | string | null }; // value = property_id
  operator: { label: string; value: number | string | null };
  options: { label: string; value: number | string | null }[];
};

export interface IHomeContextProps {
  filters: TFilters;
  select: TSelect;
  tableHeaders: {
    label: string;
    value: string;
  }[];
  operators: {
    label: string;
    value: string;
  }[];
  products: {
    id: number;
    properties: {
      property_id: number;
      value: string | number;
    }[];
  }[];
  handleSelectProperty: (value: TSelect | any) => void;
  handleSelectOperator: (value: TSelect | any) => void;
  handleSelectOptions: (value: TSelect | any) => void;
}
