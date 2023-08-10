import { render } from "@testing-library/react";
import highlightMatchedString from "./highlightMatchedString";

describe("highlightMatchedString", () => {
  it("should return the original text when there is no match", () => {
    const text = "Hello";
    const highlight = "notfound";
    const result = highlightMatchedString(text, highlight);
    const { container } = render(result);
    expect(container.innerHTML).toBe("<span>Hello</span>");
  });

  it("should highlight the matched part of the string", () => {
    const text = "Hello, World!";
    const highlight = "hello";
    const result = highlightMatchedString(text, highlight);
    const { container } = render(result);
    expect(container.innerHTML).toBe(
      "<span><strong>Hello</strong>, World!</span>"
    );
  });

  it("should be case-insensitive when highlighting", () => {
    const text = "apple orange apple";
    const highlight = "APPLE";
    const result = highlightMatchedString(text, highlight);
    const { container } = render(result);
    expect(container.innerHTML).toBe(
      "<span><strong>apple</strong> orange <strong>apple</strong></span>"
    );
  });
});
