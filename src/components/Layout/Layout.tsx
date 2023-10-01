import Navbar from "@/components/Layout/Navbar";
import styled from "@emotion/styled";

const Container = styled.main`
  position: relative;
  margin: 0 auto;
  padding: 2rem 1rem;
  max-width: 80rem;
  margin-bottom: 3rem;
  display: flex;
  justify-content: start;
  gap: 2rem;
`;
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Container>
        {/* <Navbar /> */}
        {children}
      </Container>
    </div>
  );
};

export default Layout;
