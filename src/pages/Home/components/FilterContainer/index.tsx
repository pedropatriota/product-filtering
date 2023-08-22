import { useContext } from "react";
import { Filter } from "../../../../components";
import { HomeContext } from "../../../../context/homeContext";

import * as Styled from "./styles";

const FilterContainer = () => {
  const {
    properties,
    operators,
    select,
    handleSelectOperator,
    handleSelectProperty,
    handleSelectValues,
    valuesSelectFilter,
    applyFilters,
    clearFilters,
  } = useContext(HomeContext);

  return (
    <Styled.FilterContainer>
      <Filter
        filter={select}
        handleFilter={[
          handleSelectProperty,
          handleSelectOperator,
          handleSelectValues,
        ]}
        label={["property", "operator", "values"]}
        options={[
          properties,
          operators(
            select?.property?.type as "string" | "number" | "enumerated"
          ),
          valuesSelectFilter(select?.property?.value),
        ]}
      />
      <Styled.Button disabled={!select.values} onClick={applyFilters}>
        Apply
      </Styled.Button>
      <Styled.ClearIcon
        role="button"
        aria-label="clear"
        onClick={clearFilters}
      />
    </Styled.FilterContainer>
  );
};

export default FilterContainer;
