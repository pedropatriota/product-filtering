import {
  render,
  fireEvent,
  getByTestId,
  getAllByLabelText,
  within,
} from "@testing-library/react";
import FavoriteRepository from ".";
import { ContextFavorite, TContextProp } from "../../context/favoriteContext";

describe("FavoriteRepository", () => {
  const props = {
    id: "1",
    name: "Example Repository",
    url: "https://exemplo.com/",
    owner: {
      avatarUrl: "https://github.com/example",
      login: "owner",
    },
    description: "Example description",
    favoriteRate: 3,
  };

  const handleFavorite = jest.fn();
  const favoriteList = [{ ...props }];
  const favoriteIds = { "1": 1 };
  const deleteFavorite = jest.fn();

  const CustomProvider = ({ children }: TContextProp) => (
    <ContextFavorite.Provider
      value={{ handleFavorite, favoriteList, favoriteIds, deleteFavorite }}
    >
      {children}
    </ContextFavorite.Provider>
  );

  it("renders Favorite repository correctly", () => {
    const { getByText, getByAltText, getByRole, getByLabelText } = render(
      <CustomProvider>
        <FavoriteRepository {...props} />
      </CustomProvider>
    );

    const name = getByRole("heading", { name: /repository/i });
    const avatar = getByAltText(/owner/i);
    const description = getByText(/example description/i);
    const rateValue = getByLabelText("rateValue");

    expect(name).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(rateValue).toBeInTheDocument();
  });

  it("Should be able to delete repository", () => {
    const { getByTitle } = render(
      <CustomProvider>
        <FavoriteRepository {...props} />
      </CustomProvider>
    );

    const trashIcon = getByTitle("Delete");
    fireEvent.click(trashIcon);

    expect(deleteFavorite).toBeCalled();
  });
});
