import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { CSSObject } from "@emotion/react";

interface FlexContainerProps {
  flexDirection?: "row" | "column";
  justifyContent?: string;
  alignItems?: string;
  style?: CSSObject;
}

export const FlexContainer = styled.div<FlexContainerProps>`
  width: 100%;
  display: flex;
  gap: 1rem;
  height: fit-content;
  flex-direction: ${(props) => props.flexDirection || "row"};
  justify-content: ${(props) => props.justifyContent || "start"};
  align-items: ${(props) => props.alignItems || "center"};
  ${(props) => css(props.style)};
`;
