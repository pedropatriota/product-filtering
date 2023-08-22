import styled from "styled-components";

export const Container = styled.div`
  width: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
`;

export const TableContainer = styled.div`
  width: 50rem;
  border-radius: 8px;
  max-height: 22rem;
  overflow: auto;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  max-width: 50rem;
`;

export const TableHeader = styled.thead`
  background-color: #ffe4c4;
`;

export const TableHeaderCell = styled.th`
  text-align: left;
  padding: 0.5rem;
`;

export const TableHeaderRows = styled.tr`
  border-bottom: 1px solid #ccc;
`;
