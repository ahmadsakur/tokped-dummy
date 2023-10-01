
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { colors } from "src/utils/colors";

const HomeContainer = styled.div`
  padding: 2rem 0;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media (min-width: 768px) {
    max-width: 40rem;
  }
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 0.5rem;
  justify-content: start;
  padding: 0.2rem;
  border-radius: 20rem;
  width: fit-content;
  align-items: center;
  background-color: ${colors.green100};
  cursor: pointer;
`;
const Avatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  background-color: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContactName = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
`;

const Heading = styled.h1`
  margin-bottom: 1.5rem;
  font-weight: bold;
  color: ${colors.dark};
  font-size: 2.25rem;

  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  @media (min-width: 1024px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
`;

const SubText = styled.p`
  font-size: 1rem;
  color: #636262;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 1rem;
  }

  @media (min-width: 1024px) {
    margin-bottom: 1.5rem;
  }
`;

const GridContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px;
`;

const GridItem = styled.div<{ size: "sm" | "md"; color: string }>`
  position: relative;
  overflow: hidden;
  background-color: ${({ color }) => color};
  padding: 16px;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: ${colors.dark};

  ${({ size }) => {
    switch (size) {
      case "sm":
        return "grid-column: span 1; grid-row: span 1; aspect-ratio: 1 / 1;";
      case "md":
        return "grid-column: span 2; grid-row: span 1; ";
      default:
        return "grid-column: span 1; grid-row: span 1; aspect-ratio: 1 / 1;";
    }
  }}
`;

const Contents = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  inset: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${colors.white};
    cursor: pointer;
    text-align: center;
    transition: all 0.2s ease-in-out;
    &:hover {
      scale: 1.1;
    }
  }
`;
const Home = () => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <HomeContainer>
        <div>
          <Wrapper>
            <Avatar>👋</Avatar>
            <div
              style={{
                marginRight: "1rem",
              }}
            >
              <ContactName>Welcome to ReachOut!</ContactName>
            </div>
          </Wrapper>
          <Heading>Simplify Your Contacts, Elevate Your Connections.</Heading>
          <SubText>
            ReachOut is a simple contact management app that helps you stay in
            touch with your contacts. Easily create, view, edit and delete
            contacts on the go.
          </SubText>
        </div>
        <GridContainer>
          <GridItem
            size="md"
            color={colors.green300}
            style={{
              backgroundImage:
                "url(https://doodleipsum.com/700x394/outline?bg=03ac0e&i=a968365379470ffb6626f7c0fb7e2ac3)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <NavLink to={"/contact/create"}>
              <Contents>
                <h2 className="title">Create a new contact</h2>
              </Contents>
            </NavLink>
          </GridItem>

          <GridItem
            style={{
              backgroundImage:
                "url(https://doodleipsum.com/700x700/abstract?bg=03ac0e&i=867e256b1e008dd0304f36a03338d8d0)",
              backgroundSize: "cover",
            }}
            size="sm"
            color={colors.green200}
          >
            <NavLink to={"/contact"}>
              <Contents>
                <h2 className="title">All Contact</h2>
              </Contents>
            </NavLink>
          </GridItem>
          <GridItem
            style={{
              backgroundImage:
                "url(https://doodleipsum.com/700x700/abstract?bg=03ac0e&i=be149914c1ca3abd4d013b3b7bb43666)",
              backgroundSize: "cover",
            }}
            size="sm"
            color={colors.green200}
          >
            <NavLink to={"/favourite"}>
              <Contents>
                <h2 className="title">Favourite</h2>
              </Contents>
            </NavLink>
          </GridItem>
        </GridContainer>
      </HomeContainer>
    </div>
  );
};

export default Home;
