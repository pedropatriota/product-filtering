import styled from "styled-components";

export const TableRows = styled.tr`
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #a1a1c4;
    color: #fff;
  }
  &:nth-child(odd) {
    background-color: #e6e6fa;
    &:hover {
      background-color: #a1a1c4;
      color: #fff;
    }
  }
`;

export const TableCell = styled.td`
  text-align: left;
  padding: 1rem 0.5rem;
`;
