import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../Button";
import { colors } from "src/utils/colors";

describe("Button", () => {
  it("should call the onClick function when clicked", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button onClick={onClickMock}>Click me</Button>
    );

    const button = getByText("Click me");
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("should apply primary styles when buttonType is PRIMARY", () => {
    const { container } = render(
      <Button buttonType="PRIMARY">Primary Button</Button>
    );
    const button = container.querySelector("button");

    expect(button).toHaveStyle(`background: ${colors.green500}`);
    expect(button).toHaveStyle("color: white");
  });

  it("should apply secondary styles when buttonType is SECONDARY", () => {
    const { container } = render(
      <Button buttonType="SECONDARY">Secondary Button</Button>
    );
    const button = container.querySelector("button");

    expect(button).toHaveStyle("background: white");
    expect(button).toHaveStyle(`color: ${colors.green500}`);
    expect(button).toHaveStyle("border: 1px solid green");
  });

  test('should render the button with the text "Click me" ', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <Button onClick={mockOnClick}>Click me</Button>
    );
    fireEvent.click(getByText("Click me"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
