import { memo } from "react";
import Dropdown from "../Dropdown";
import { operatorsBySingleValue } from "../../constants";
import type { IFilterProps } from "./contracts";
import { Container } from "./styles";
import Select from "react-select/dist/declarations/src/Select";

const Filter = ({ handleFilter, filter, options, label }: IFilterProps) => {
  return (
    <Container data-testid="filter">
      <Dropdown
        filter={filter.property}
        options={options[0]}
        handleFilter={handleFilter[0]}
        label={label[0]}
      />

      <Dropdown
        filter={filter.property?.label ? filter.operator : null}
        options={options[1]}
        handleFilter={handleFilter[1]}
        label={label[1]}
        isDisabled={!filter.property?.label}
      />

      <Dropdown
        filter={filter.property?.label ? filter?.values : null}
        options={options[2]}
        handleFilter={handleFilter[2]}
        label={label[2]}
        isDisabled={!filter.operator?.label || !filter.property?.label}
        isMulti={
          !operatorsBySingleValue.includes(filter?.operator?.value as string)
        }
      />
    </Container>
  );
};

export default memo(Filter);
