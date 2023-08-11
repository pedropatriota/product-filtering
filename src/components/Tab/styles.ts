import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

type TSelected = {
  selected: boolean;
};

export const LiContainer = styled.li<TSelected>`
  width: fit-content;
  ${({ selected }) =>
    selected &&
    css`
      border-bottom: 2px solid #1f26a3;
      color: #1f26a3;
    `}
`;

export const LinkLabel = styled(Link)<TSelected>`
  color: #000;
  transition: all 0.3s linear;
  font-weight: 500;
  ${({ selected }) =>
    selected &&
    css`
      color: #1f26a3;
      w &:hover {
        color: #1f26a3;
      }
    `}

  &:hover {
    color: #1f26a3;
  }
`;
