import Dropdown from "../Dropdown";
import type { IFilterProps } from "./contracts";
import { Container } from "./styles";
import { memo } from "react";

const Filter = ({ handleFilter, filter, options, label }: IFilterProps) => {
  return (
    <Container data-testid="filter">
      <Dropdown
        filter={filter[0]}
        options={options[0]}
        handleFilter={handleFilter[0]}
        label={label[0]}
      />
      <Dropdown
        filter={filter[1]}
        options={options[1]}
        handleFilter={handleFilter[1]}
        label={label[1]}
      />
      <Dropdown
        filter={filter[2]}
        options={options[2]}
        handleFilter={handleFilter[2]}
        label={label[2]}
        isMulti
      />
    </Container>
  );
};

export default memo(Filter);
