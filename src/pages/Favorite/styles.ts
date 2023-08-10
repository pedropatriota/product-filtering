import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const ULFavoriteContainer = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1rem;
`;

export const RepoContainer = styled.li`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

export const InfoContainer = styled.div`
  width: 100%;
  padding: 1rem;
`;

export const Avatar = styled.img`
  width: 100%;
  height: auto;
`;
