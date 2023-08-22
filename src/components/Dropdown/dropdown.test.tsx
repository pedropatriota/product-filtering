/* eslint-disable testing-library/no-container */
import { screen, render, fireEvent } from "@testing-library/react";
import Dropdown from ".";

describe("Dropdown component", () => {
  const options = [
    { label: "Product Name", value: 0 },
    { label: "Color", value: 1 },
    { label: "Weight (oz)", value: 3 },
  ];

  const props = {
    filter: { label: "", value: "" },
    handleFilter: jest.fn(),
    label: "property",
  };
  it("should be able to select an option", async () => {
    render(<Dropdown options={options} {...props} />);
    expect(screen.queryByText("Product Name")).not.toBeInTheDocument();

    const selector = screen.getByLabelText(/property/) as Element;

    fireEvent.keyDown(selector, {
      key: "ArrowDown",
      keyCode: 40,
      code: 40,
    });

    const selectedItem = screen.getByText("Product Name");

    fireEvent.click(selectedItem);

    expect(props.handleFilter).toBeCalled();
  });

  it("should match the snapshot", () => {
    const { container } = render(<Dropdown options={options} {...props} />);
    expect(container).toMatchSnapshot();
  });
});
