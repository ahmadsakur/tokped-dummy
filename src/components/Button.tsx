import React from "react";
import styled, { CSSObject } from "@emotion/styled";
import { colors } from "@/utils/colors";
import { css } from "@emotion/react";

interface IButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  color: string;
  style?: CSSObject & React.CSSProperties;
}

const StyledButton = styled.button<IButtonProps>`
  background-color: ${(props) => props.color || colors.gunmetal};
  border: none;
  border-radius: 4px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(1.2);
  }

  ${(props) => css(props.style)};
};`;

const Button = ({ children, onClick, color, style }: IButtonProps) => {
  return (
    <StyledButton color={color} onClick={onClick} style={style}>
      {children}
    </StyledButton>
  );
};

export default Button;
