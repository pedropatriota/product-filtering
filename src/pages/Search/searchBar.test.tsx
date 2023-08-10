import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { IRepoProps } from "../../service/contracts";
import SearchBar from "./searchBar";

interface SearchBar {
  expand: boolean;
  inputValue: string;
  result: IRepoProps[];
  loading: boolean;
}

const setup = ({ expand, inputValue, result, loading }: SearchBar) => {
  const expandSearchBox = jest.fn();
  const handleChangeInputValue = jest.fn();
  const clearInputValue = jest.fn();

  const props = {
    expand,
    inputValue,
    result,
    expandSearchBox,
    handleChangeInputValue,
    clearInputValue,
    loading,
  };
  const utils = render(<SearchBar {...props} />);
  return {
    ...utils,
    expandSearchBox,
    handleChangeInputValue,
    clearInputValue,
    props,
  };
};

afterEach(() => cleanup);

describe("SearchBar", () => {
  const repo = {
    id: "1",
    name: "Example",
    url: "https://exemplo.com/",
    owner: {
      avatarUrl: "https://github.com/example",
      login: "owner",
    },
    description: "descriptionExample",
  };
  it("should render the initial state correctly", async () => {
    setup({ expand: false, inputValue: "", result: [], loading: false });

    const input = (await screen.findByRole("textbox")) as HTMLInputElement;
    const searchContainer = screen.getByTestId("search-container");
    const closeIcon = screen.queryByText(/✖/i);

    expect(input).toBeInTheDocument();
    expect(input).not.toHaveFocus();
    expect(input.value).toBe("");
    expect(searchContainer).toHaveStyle("height: 4rem");
    expect(closeIcon).not.toBeInTheDocument();
  });

  it("should render correctly after focus", async () => {
    const { container } = setup({
      expand: true,
      inputValue: "",
      result: [],
      loading: false,
    });

    const input = (await screen.findByRole("textbox")) as HTMLInputElement;
    const searchContainer = screen.getByTestId("search-container");

    await userEvent.click(input);
    fireEvent.focus(input);

    expect(searchContainer).toHaveStyle("height: 25rem");
    expect(input).toHaveFocus();
  });

  it("should be able type in the input and fetch the API", async () => {
    setup({
      expand: true,
      inputValue: "Example",
      result: [{ ...repo }],
      loading: false,
    });

    const input = (await screen.findByRole("textbox")) as HTMLInputElement;
    const searchContainer = screen.getByTestId("search-container");

    await userEvent.click(input);
    fireEvent.focus(input);

    expect(searchContainer).toHaveStyle("height: 25rem");
    expect(input).toHaveFocus();

    await userEvent.type(input, "Example");
    expect(input.value).toBe("Example");

    const name = await screen.findAllByText("Example");

    const closeIcon = screen.queryByText(/✖/i);

    expect(closeIcon).toBeInTheDocument();
    expect(name.length).toBe(1);
  });

  it("should collapse the dropdown", async () => {
    const {
      rerender,
      expandSearchBox,
      handleChangeInputValue,
      clearInputValue,
    } = setup({
      expand: true,
      inputValue: "Example",
      result: [{ ...repo }],
      loading: false,
    });

    const input = (await screen.findByRole("textbox")) as HTMLInputElement;
    const searchContainer = screen.getByTestId("search-container");

    await userEvent.click(input);
    fireEvent.focus(input);
    expect(searchContainer).toHaveStyle("height: 25rem");
    await userEvent.type(input, "Example");

    const name = await screen.findAllByText("Example");
    const closeIcon = await screen.findByText(/✖/i);

    await userEvent.click(closeIcon);

    rerender(
      <SearchBar
        expand={false}
        inputValue=""
        result={[]}
        expandSearchBox={expandSearchBox}
        handleChangeInputValue={handleChangeInputValue}
        clearInputValue={clearInputValue}
        loading={false}
      />
    );

    expect(input.value).toBe("");
    expect(searchContainer).toHaveStyle("height: 4rem");
  });

  it("should match snapshot", () => {
    const { container } = setup({
      expand: true,
      inputValue: "Example",
      result: [],
      loading: false,
    });

    expect(container).toMatchSnapshot();
  });
});
