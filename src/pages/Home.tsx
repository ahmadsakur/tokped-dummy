import { colors } from "@/utils/colors";
import styled from "@emotion/styled";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  margin-bottom: 1.5rem;
  font-weight: bold;
  color: white;
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
  grid-template-rows: repeat(3, 1fr);
  gap: 16px;
  @media (min-width: 768px) {
    width: 50%;
  }
`;

const GridItem = styled.div<{ size: "sm" | "md"; color: string }>`
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
const Home = () => {
  return (
    <HomeContainer>
      <div>
        <Heading>Simplify Your Contacts, Elevate Your Connections.</Heading>
        <SubText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
          purus sit amet luctus venenatis, lectus
        </SubText>
      </div>
      <GridContainer>
        <GridItem size="sm" color={colors.dodgerBlue}>
          All contacts
        </GridItem>
        <GridItem size="sm" color={colors.bittersweet}>
          Favourite
        </GridItem>
        <GridItem size="md" color={colors.sunglow}>
          Create a new contact
        </GridItem>
      </GridContainer>
    </HomeContainer>
  );
};

export default Home;
