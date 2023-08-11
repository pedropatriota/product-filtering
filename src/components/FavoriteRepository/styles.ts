import styled from "styled-components";
import { Trash2 } from "lucide-react";

export const RepoContainer = styled.a`
  width: 100%;
  max-width: 20rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  color: #000;
  transition: border 0.3s ease-in-out;

  &:hover {
    color: #000;
    border: 1px solid #000;
  }
`;

export const InfoContainer = styled.div`
  width: 100%;
  padding: 1rem;
`;

export const Avatar = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.5rem 0.5rem 0 0;
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
