import styled from "@emotion/styled";

interface FlexContainerProps {
  flexDirection?: "row" | "column"; 
  justifyContent?: string;
  alignItems?: string;
}

export const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || "row"};
  justify-content: ${(props) => props.justifyContent || "start"};
  align-items: ${(props) => props.alignItems || "center"};
  gap: 1rem;
`;
