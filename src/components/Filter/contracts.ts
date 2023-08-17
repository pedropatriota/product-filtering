import { ActionMeta, GroupBase, SingleValue } from "react-select";

export type TFilter = SingleValue<
  | {
      label: string;
      value: number | string | null;
    }
  | {
      label: string;
      value: number | string | null;
    }[]
>;

export type TFilterFN = (
  newValue: TFilter | unknown,
  actionMeta: ActionMeta<TFilter | unknown>
) => void;

export interface IFilterProps {
  filter: TFilter[];
  options: readonly (
    | TFilter
    | GroupBase<{ label: string; value: string | number | null }>
  )[][];
  label: string[];
  handleFilter: TFilterFN[];
}
