import type { ICharacterProps } from "./contracts";
import { useContext } from "react";
import { highlightMatchedString } from "../../utils";
import { ContextFavorite } from "../../context/favoriteContext";
import * as Styled from "./styles";

const Repository = ({ repo, inputValue }: ICharacterProps) => {
  const { handleFavorite } = useContext(ContextFavorite);

  return (
    <Styled.LisContainer>
      <Styled.InfoContainer>
        {highlightMatchedString(repo.name, inputValue)}
        <Styled.Button onClick={() => handleFavorite(repo.id, repo)}>
          Favorite it
        </Styled.Button>
      </Styled.InfoContainer>
    </Styled.LisContainer>
  );
};

export default Repository;
