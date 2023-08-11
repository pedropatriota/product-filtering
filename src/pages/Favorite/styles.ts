import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding-bottom: 2.5rem;
`;

export const FavoriteContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1rem;
`;
