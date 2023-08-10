import React from "react";
import { useContext } from "react";
import { ContextFavorite } from "../../context/favoriteContext";

import * as Styled from "./styles";

const Favorite = () => {
  const { favoriteList, favoriteIds } = useContext(ContextFavorite);

  const createDataToFavoriteRepositories = () => {
    const newFavoriteList = favoriteList.map(({ ...params }) => {
      const favoriteRate = favoriteIds[params.id];

      return {
        ...params,
        favoriteRate,
      };
    });

    return newFavoriteList;
  };

  const favoriteData = createDataToFavoriteRepositories();

  return (
    <Styled.Container>
      <Styled.ULFavoriteContainer>
        {favoriteData.map(
          ({ id, name, owner, description, url, favoriteRate }) => (
            <Styled.RepoContainer
              key={id}
              style={{ border: "1px solid #ccc", borderRadius: "5px" }}
            >
              <Styled.Avatar src={owner.avatarUrl} />
              <Styled.InfoContainer>
                <h3>{name}</h3>
                <p>
                  <strong>Description:</strong> {description}
                </p>
                <a href={url} target="_blank">
                  <strong>URL:</strong> Open URL
                </a>
                <p>{`Favorite rate: ${favoriteRate}`}</p>
              </Styled.InfoContainer>
            </Styled.RepoContainer>
          )
        )}
      </Styled.ULFavoriteContainer>
    </Styled.Container>
  );
};

export default Favorite;
