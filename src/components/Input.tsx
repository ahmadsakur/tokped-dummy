import { colors } from "@/utils/colors";
import styled from "@emotion/styled";

const Label = styled.label`
  display: block;
  margin-bottom: 2px;
  font-size: 14px;
  font-weight: 500;
  color: black;
`;

const InputContainer = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 6px;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0.6rem;
  display: flex;
  align-items: center;
  padding-right: 0.4rem;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: green;
`;

const Input = styled.input`
  width: fill-available;
  padding: 0.8rem 2rem;
  background-color: white;
  border: 1px solid green;
  color: ${colors.dark};
  font-size: 14px;
  border-radius: 0.3rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  ${({ readOnly }) =>
    readOnly &&
    `
  background-color: ${colors.green100};
  cursor: not-allowed;
`}

  &:focus {
    outline: none;
    border-color: ${colors.green500}};
    box-shadow: 0 0 0 2px ${colors.green100}};
  }
`;

interface ICustomeInputProps {
  label: string;
  placeholder?: string;
  type: string;
  id: string;
  value?: string | number;
  defaultValue?: string;
  onValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
  icon: JSX.Element;
}
function CustomInput({
  label,
  placeholder,
  type,
  id,
  value,
  defaultValue,
  onValueChange,
  readonly,
  icon,
}: ICustomeInputProps) {
  return (
    <div style={{ 
      width: "100%",
     }}>
      <Label htmlFor={id}>{label}</Label>
      <InputContainer>
        <IconContainer>{icon}</IconContainer>
        <Input
          type={type}
          id={id}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onValueChange}
          value={value}
          required
          readOnly={readonly}
        />
      </InputContainer>
    </div>
  );
}

export default CustomInput;
