import Navbar from "src/components/Layout/Navbar";
import { colors } from "src/utils/colors";
import styled from "@emotion/styled";

const Container = styled.main`
  position: relative;
  margin: 0 auto;
  padding: 1rem;
  max-width: 80rem;
  margin-bottom: 5rem;
  display: flex;
  justify-content: start;
  gap: 2rem;
  @media (min-width: 768px) {
    margin-bottom: 0;
`;

const Logo = styled.div`
  top: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.green500};
  cursor: pointer;
`;
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Container>
        <Navbar />
        <div
          style={{
            width: "100%",
          }}
        >
          <Logo>ReachOut!</Logo>
          {children}
        </div>
      </Container>
    </div>
  );
};

export default Layout;
