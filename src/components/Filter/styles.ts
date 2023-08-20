import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1rem;

  @media (max-width: 500px) {
    flex-wrap: wrap;
    gap: 1rem;
  }
`;
