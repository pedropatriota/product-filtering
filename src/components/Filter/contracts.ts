import { ActionMeta, GroupBase } from "react-select";
import type { TSelect } from "../../context/contracts";

export type TFilter =
  | {
      label: string;
      value: number | string | null;
    }
  | {
      label: string;
      value: number | string | null;
    }[];

export type TFilterFN = (
  newValue: TFilter | unknown,
  actionMeta: ActionMeta<TFilter | unknown>
) => void;

export interface IFilterProps {
  filter: TSelect;
  options: readonly (
    | TFilter
    | GroupBase<{ label: string; value: string | number | null }>
  )[][];
  label: string[];
  handleFilter: TFilterFN[];
}
