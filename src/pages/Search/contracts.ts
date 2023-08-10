export interface ISearchBar<T> {
  expand: boolean;
  inputValue: string;
  loading: boolean;
  result: T[];
  tab?: string;
  expandSearchBox: () => void;
  handleChangeInputValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearInputValue: () => void;
}
