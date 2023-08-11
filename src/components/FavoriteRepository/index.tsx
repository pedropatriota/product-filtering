import * as Styled from "./styles";
import { Star } from "lucide-react";
import { useContext } from "react";
import { ContextFavorite } from "../../context/favoriteContext";
import { FavoriteRepoProps } from "./contracts";

const FavoriteRepository = ({
  id,
  owner,
  name,
  description,
  url,
  favoriteRate,
}: FavoriteRepoProps) => {
  const { deleteFavorite } = useContext(ContextFavorite);

  const HandleDeleteRepository = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    deleteFavorite(id);
  };

  return (
    <Styled.RepoContainer href={url} target="_blank">
      <Styled.Avatar src={owner.avatarUrl} alt={`${owner.login} image`} />
      <Styled.InfoContainer>
        <h3>{name}</h3>
        <p>
          <strong>Description:</strong> {description}
        </p>

        <Styled.RatedContainer>
          <p>
            <strong>Favorite rate:</strong>{" "}
            <span aria-label="rateValue">{favoriteRate}</span>
            <Star fill="#d6d630" stroke="#d6d630" />
          </p>
          <Styled.TrashIcon onClick={(e) => HandleDeleteRepository(e, id)}>
            <title>Delete</title>
          </Styled.TrashIcon>
        </Styled.RatedContainer>
      </Styled.InfoContainer>
    </Styled.RepoContainer>
  );
};

export default FavoriteRepository;
