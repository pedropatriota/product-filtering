import styled from "styled-components";

export const LisContainer = styled.li`
  margin: 1rem 0;
  list-style: none;
`;

export const InfoContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled.button`
  border: none;
  white-space: nowrap;
  background-color: #ccc;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #cdc8e2;
    outline: none;
  }
`;
