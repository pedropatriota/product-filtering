import { render, screen, fireEvent } from "@testing-library/react";
import Filter from ".";
import type {} from "./contracts";

describe("Filter", () => {
  const props = {
    value: "Rick",
    handleChange: jest.fn(),
    handleFilter: [jest.fn(), jest.fn()],
    filter: {
      property: { label: "", value: "", type: "" },
      operator: { label: "", value: "" },
      values: [{ label: "", value: "" }],
    },
    options: [
      [
        { label: "Product Name", value: 0, type: "string" },
        { label: "color", value: 1, type: "string" },
        { label: "weight (oz)", value: 2, type: "number" },
        { label: "category", value: 3, type: "enumerated" },
        { label: "wireless", value: 4, type: "enumerated" },
      ],
      [
        { label: "Equals", value: "equals" },
        { label: "Has any value", value: "any" },
        { label: "Has no value", value: "none" },
        { label: "Is any of", value: "in" },
        { label: "Contains", value: "contains" },
      ],
      [
        { label: "Headphones", value: "Headphones" },
        { label: "Cell Phone", value: "Cell Phone" },
        { label: "Keyboard", value: "Keyboard" },
        { label: "Cup", value: "Cup" },
        { label: "Key", value: "Key" },
        { label: "Hammer", value: "Hammer" },
      ],
    ],
    label: ["property", "operator", "values"],
  };

  it("should render correctly", () => {
    render(<Filter {...props} />);

    const select = screen.getAllByLabelText(/select/i) as HTMLElement[];

    expect(select).toHaveLength(3);
  });

  it("should select an option", async () => {
    render(<Filter {...props} />);

    const selector = (await screen.findByLabelText(/property/)) as Element;

    fireEvent.keyDown(selector, {
      key: "ArrowDown",
      keyCode: 40,
      code: 40,
    });

    const selectedItem = screen.getAllByText("Product Name");

    fireEvent.click(selectedItem[0]);

    expect(props.handleFilter[0]).toBeCalled();
  });

  it("should match the snapshot", () => {
    const { container } = render(<Filter {...props} />);
    expect(container).toMatchSnapshot();
  });
});
