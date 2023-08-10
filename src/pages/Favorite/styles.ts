import styled from "styled-components";
import { Trash2 } from "lucide-react";

export const Container = styled.div`
  width: 100%;
  padding-bottom: 2.5rem;
`;

export const ULFavoriteContainer = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1rem;
`;

export const RepoContainer = styled.li`
  width: 100%;
  max-width: 20rem;
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

export const TrashIcon = styled(Trash2)`
  cursor: pointer;
  color: red;
`;

export const RatedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }
`;
