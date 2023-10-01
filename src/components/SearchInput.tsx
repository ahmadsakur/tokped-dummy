
import { colors } from "@/utils/colors";
import styled from "@emotion/styled";

const StyledInput = styled.input`
  background-color: ${colors.gunmetal};
  color: black;
  border: none;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease-in-out;
  &:active {
    border: none;
  }
`;
const SearchInput = () => {
  return (
    <div
      style={{
        flex: 1,
      }}
    >
      <StyledInput type="text" placeholder="Search" style={{ 
        width: "100%",
       }}/>
    </div>
  );
};

export default SearchInput;
