import styled from "@emotion/styled";
import { colors } from "src/utils/colors";
import { NavLink } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
const StyledButton = styled.div`
  display: flex;
  width: fit-content;
  justify-content: flex-start;
  padding: 0.5rem 0;
  cursor: pointer;
  transition: border-color 0.2s ease-in-out;

  &:hover {
    border-color: ${colors.green400};
  }
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  font-size: 0.8rem;
  font-weight: bold;

  &:hover {
    color: ${colors.green400};
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;

  svg {
    color: ${colors.dark};
    &.group-hover {
      color: ${colors.green400};
    }
  }
`;

interface IBackNavProps {
  path: string;
}
const BackNav = ({ path }: IBackNavProps) => {
  return (
    <NavLink to={path}>
      <StyledButton>
        <IconContainer>
          <BsArrowLeft className="group-hover" />
        </IconContainer>
        <Text>Back</Text>
      </StyledButton>
    </NavLink>
  );
};

export default BackNav;
