import React from "react";
import styled from "@emotion/styled";
import { colors } from "@/utils/colors";
interface IButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  color: string;
}

const StyledButton = styled.button`
  background-color: ${colors.gunmetal}
  color: black;
  border: none;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    scale: 1.1;
  }
  &:active {
    scale: 1.2;
  }
`;
const Button = ({ children, onClick, color }: IButtonProps) => {
  return (
    <StyledButton color={color} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
