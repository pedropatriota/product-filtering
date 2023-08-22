import { FC, PropsWithChildren } from "react";
import { renderHook } from "@testing-library/react-hooks";
import {
  render,
  fireEvent,
  waitFor,
  findAllByText,
} from "@testing-library/react";
import { HomeContext } from "../../../../context/homeContext";
import datastore from "../../../../data/dataStore";
import FilterContainer from ".";

const operators = jest.fn().mockReturnValue((type: string) => {
  if (type === "string")
    return [
      { label: "Equals", value: "equals" },
      { label: "Has Any Of", value: "any" },
      { label: "Has None Of", value: "none" },
      { label: "Is Any Of", value: "any" },
      { label: "Contains", value: "contains" },
    ];

  return [];
});

describe("FilterContainer Component", () => {
  const props = {
    filters: { property: 0, operator: "", values: [] },
    products: datastore.products,
    properties: [
      { label: "Product Name", value: 0, type: "string" },
      { label: "color", value: 1, type: "string" },
      { label: "weight (oz)", value: 2, type: "number" },
      { label: "category", value: 3, type: "enumerated" },
      { label: "wireless", value: 4, type: "enumerated" },
    ],
    operators,
    select: {
      property: { label: "", value: null, type: "", values: [] },
      operator: { label: "", value: "" },
      values: [{ label: "", value: null }],
    },
    handleSelectOperator: jest.fn(),
    handleSelectProperty: jest.fn(),
    handleSelectValues: jest.fn(),
    valuesSelectFilter: jest.fn(),
    applyFilters: jest.fn(),
    clearFilters: jest.fn(),
  };

  const CustomProvider: FC<PropsWithChildren> = ({ children }) => (
    <HomeContext.Provider value={{ ...props }}>{children}</HomeContext.Provider>
  );
  it("should display correctly", async () => {
    const { getAllByLabelText } = render(
      <CustomProvider>
        <FilterContainer />
      </CustomProvider>
    );

    const propertySelect = getAllByLabelText(/select/i)[0] as HTMLInputElement;
    const operatorSelect = getAllByLabelText(/select/i)[1] as HTMLInputElement;
    const valuesSelect = getAllByLabelText(/select/i)[2] as HTMLInputElement;

    expect(propertySelect.value).toBe("");
    expect(operatorSelect.value).toBe("");
    expect(valuesSelect?.value).toBe("");

    expect(operatorSelect).toBeDisabled();
    expect(valuesSelect).toBeDisabled();
  });

  it("should be able to select the params to filter the products", async () => {
    const { getAllByLabelText, getByText, findByText, rerender } = render(
      <CustomProvider>
        <FilterContainer />
      </CustomProvider>
    );

    const propertySelect = getAllByLabelText(/select/i)[0] as HTMLInputElement;

    fireEvent.keyDown(propertySelect, {
      key: "ArrowDown",
      keyCode: 40,
      code: 40,
    });
    const selectedProperty = getByText("Product Name");
    fireEvent.click(selectedProperty);
    expect(props.handleSelectProperty).toHaveBeenCalledWith(
      { label: "Product Name", type: "string", value: 0 },
      { action: "select-option", name: undefined, option: undefined }
    );
  });

  it("should filter the products when pressing the button apply", () => {
    const { getByRole } = render(
      <HomeContext.Provider
        value={{
          ...props,
          select: {
            property: { label: "Product Name", value: 0, type: "string" },
            operator: { label: "Equals", value: "equals" },
            values: [{ label: "Keyboard", value: "keyboard" }],
          },
        }}
      >
        <FilterContainer />
      </HomeContext.Provider>
    );

    const buttonApply = getByRole("button", { name: "Apply" });

    fireEvent.click(buttonApply);

    expect(props.applyFilters).toBeCalled();
  });

  it("should clear the filters when pressing the button clear", () => {
    const { getAllByRole } = render(
      <HomeContext.Provider
        value={{
          ...props,
          select: {
            property: { label: "Product Name", value: 0, type: "string" },
            operator: { label: "Equals", value: "equals" },
            values: [{ label: "Keyboard", value: "keyboard" }],
          },
        }}
      >
        <FilterContainer />
      </HomeContext.Provider>
    );

    const buttonClear = getAllByRole("button", {
      name: /clear/i,
    });

    fireEvent.click(buttonClear[0]);

    expect(props.clearFilters).toBeCalled();
  });

  it("should match snapshot", () => {
    const { container } = render(
      <CustomProvider>
        <FilterContainer />
      </CustomProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
