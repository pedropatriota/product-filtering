import { ReactSelect } from "./styles";
import { IDropdownProps } from "./contracts";

const Dropdown = ({
  options,
  handleFilter,
  filter,
  label,
  isMulti,
}: IDropdownProps) => {
  return (
    <div>
      <label htmlFor="react-select-2-input">{`Select a ${label}:`}</label>
      <ReactSelect
        aria-label={`Select a ${label}:`}
        classNamePrefix="react-select"
        options={options}
        value={filter}
        onChange={handleFilter}
        autoFocus={false}
        isClearable
        isMulti={isMulti}
      />
    </div>
  );
};

export default Dropdown;
