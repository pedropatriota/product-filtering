import styled from "styled-components";
import { Trash2 } from "lucide-react";

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
  align-items: center;
`;

export const Button = styled.button`
  height: 2.4rem;
  width: 7.625rem;
  border: none;
  background-color: #b9c5f0;
  color: #000;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease-in-out;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #8294d3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ClearIcon = styled(Trash2)`
  cursor: pointer;
  stroke: red;
  width: 2rem;
`;
