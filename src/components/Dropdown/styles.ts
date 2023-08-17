import styled from "styled-components";
import Select from "react-select";

export const ReactSelect = styled(Select)`
  .react-select__control {
    width: min(90vw, 12.5rem);
    background-color: #fff;
    border-color: #ccc;
    box-shadow: 0 0 0 transparent;
    height: 3.375rem;
  }

  .react-select__single-value {
    color: #000;
  }

  .react-select__menu {
    width: 12.5rem;
    background-color: #fff;
    color: #000;
  }

  .react-select__dropdown-indicator,
  .react-select__indicator-separator {
    display: none;
  }
`;
