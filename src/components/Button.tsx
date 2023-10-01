import React, { ButtonHTMLAttributes } from "react";
import styled from "@emotion/styled";
import { CSSObject, css } from "@emotion/react";
import { colors } from "src/utils/colors";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonType?: "PRIMARY" | "SECONDARY";
  style?: React.CSSProperties & CSSObject;
}

const StyledButton = styled.button<IButtonProps>`
  border: none;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  font-size: .8rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;

  ${({ buttonType }) =>
    buttonType === "PRIMARY" &&
    css`
      background: ${colors.green500};
      color: white;
    `}

  ${({ buttonType }) =>
    buttonType === "SECONDARY" &&
    css`
      background: white;
      color: ${colors.green500};
      border: 1px solid green;

    `}
  ${(props) => css(props.style)};
`;

const Button = ({ children, onClick, buttonType, style }: IButtonProps) => {
  return (
    <StyledButton buttonType={buttonType} onClick={onClick} style={style}>
      {children}
    </StyledButton>
  );
};

export default Button;
