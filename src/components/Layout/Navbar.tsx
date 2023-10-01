import styled from "@emotion/styled";
import { NavLink, useLocation } from "react-router-dom";
import { FiHome, FiStar, FiUsers } from "react-icons/fi";
import { colors } from "@/utils/colors";

type TLink = {
  id: number;
  name: string;
  path: string;
  icon: React.ReactNode;
};
const links: TLink[] = [
  {
    id: 1,
    name: "Home",
    path: "/",
    icon: <FiHome />,
  },
  {
    id: 2,
    name: "Contact",
    path: "/contact",
    icon: <FiUsers />,
  },
  {
    id: 3,
    name: "Favourite",
    path: "/favourite",
    icon: <FiStar />,
  },
];

const StyledNavbar = styled.div`
  display: flex;
  position: fixed;
  bottom: 1rem;
  left: 0.5rem;
  right: 0.5rem;
  width: fill-available;
  background-color: ${colors.green500};
  color: ${colors.white};
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem;
  height: 3rem;
  z-index: 100;
  border-radius: 1rem;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    position: sticky;
    top: 1rem;
    left: 0;
    height: 90vh;
    background-color: transparent;
    border : 1px solid ${colors.green500};
    width: 25%;
    padding: 1rem;
    border-radius: 1rem;
  }

  @media (min-width: 1024px) {
    width: 20%;
  }
`;

const NavbarLink = styled(NavLink)`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 1rem;
  color: black;
  text-decoration: none;
  font-weight: 400;
  font-size: 1.2rem;
  transition: all 0.2s ease-in-out;

  @media (min-width: 768px) {
    font-size: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
  }
  &.active {
    color: ${colors.white};
  }
`;

const StyledNavText = styled.span<{ isActive: boolean }>`
  display: none;
  @media (min-width: 768px) {
    display: inline-block;
    font-size: 0.8rem;
    ${(props) =>
      props.isActive &&
      `
      color: ${colors.green500};
      font-weight: 600;
    `}
  
`;

const StyledIcon = styled.span<{ isActive: boolean }>`
  font-size: 1.2rem;
  @media (min-width: 768px) {
    font-size: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    ${(props) =>
      props.isActive
        ? `
      color: ${colors.white};
      background-color: ${colors.green400};
      font-weight: 600;
    `
        : `
      color: ${colors.dark};
      background-color: rgba(0,0,0,0.1);
      `}
  
`;

export const Navbar = () => {
  const router = useLocation();
  return (
    <StyledNavbar>
      {links.map((link) => (
        <NavbarLink to={link.path} key={link.id}>
          <StyledIcon isActive={router.pathname == link.path}>
            {link.icon}
          </StyledIcon>
          <StyledNavText isActive={router.pathname == link.path}>
            {link.name}
          </StyledNavText>
        </NavbarLink>
      ))}
    </StyledNavbar>
  );
};

export default Navbar;
