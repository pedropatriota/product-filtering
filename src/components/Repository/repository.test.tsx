import { render, screen, fireEvent } from "@testing-library/react";
import Repository from ".";
import { ContextFavorite, TContextProp } from "../../context/favoriteContext";

describe("Repository", () => {
  const repo = {
    id: "1",
    name: "Example Repository",
    url: "https://exemplo.com/",
    owner: {
      avatarUrl: "https://github.com/example",
      login: "owner",
    },
    description: "descriptionExample",
  };
  const inputValue = "Example";

  const handleFavorite = jest.fn();
  const favoriteList = [{ ...repo }];
  const favoriteIds = { "1": 1 };

  const CustomProvider = ({ children }: TContextProp) => (
    <ContextFavorite.Provider
      value={{ handleFavorite, favoriteList, favoriteIds }}
    >
      {children}
    </ContextFavorite.Provider>
  );

  it("renders repository info correctly", () => {
    render(
      <CustomProvider>
        <Repository repo={repo} inputValue={inputValue} />
      </CustomProvider>
    );

    const repoName = screen.getByText(inputValue);

    expect(repoName).toBeInTheDocument();
  });

  it("calls handleFavorite when Favorite button is clicked", () => {
    render(
      <CustomProvider>
        <Repository repo={repo} inputValue={inputValue} />
      </CustomProvider>
    );

    const favoriteButton = screen.getByText("Favorite it");
    fireEvent.click(favoriteButton);

    expect(handleFavorite).toHaveBeenCalledWith(repo.id, repo);
  });
});
