import { ReactSelect } from "./styles";
import { IDropdownProps } from "./contracts";

const Dropdown = ({
  options,
  handleFilter,
  filter,
  label,
  isMulti,
  isDisabled,
}: IDropdownProps) => {
  const createLabel = () => {
    if (label === "values") {
      return `Select one or more ${label}`;
    }
    return `Select a ${label}`;
  };

  return (
    <div>
      <label htmlFor="react-select-2-input">{createLabel()}</label>
      <ReactSelect
        aria-label={createLabel()}
        classNamePrefix="react-select"
        options={options}
        value={filter}
        onChange={handleFilter}
        autoFocus={false}
        isClearable={!!filter}
        isMulti={isMulti}
        isDisabled={isDisabled}
      />
    </div>
  );
};

export default Dropdown;
