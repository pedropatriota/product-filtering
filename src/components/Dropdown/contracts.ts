import { ActionMeta, GroupBase, SingleValue, MultiValue } from "react-select";

type Filter =
  | {
      label: string;
      value: string | number | null;
    }
  | { label: string; value: string | number | null }[]
  | null;

export interface IDropdownProps {
  options: readonly (
    | Filter
    | GroupBase<{ label: string; value: string | number | null }>
  )[];
  filter: Filter;
  label?: string;
  handleFilter: (
    newValue: Filter | unknown,
    actionMeta: ActionMeta<Filter | unknown>
  ) => void;
  isMulti?: boolean;
  isDisabled?: boolean;
}
