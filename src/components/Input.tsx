import styled from "@emotion/styled";
import { PiAddressBook } from "react-icons/pi";

const Label = styled.label`
  display: block;
  margin-bottom: 2px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 6px;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0.4rem;
  display: flex;
  align-items: center;
  padding-right: 0.4rem;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: gray;
`;

const Input = styled.input`
  padding: 0.625rem 2rem;
  background-color: black;
  border: 1px solid #d1d5db;
  color: white;
  font-size: 14px;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.25);
  }
`;

interface ICustomeInputProps {
  label: string;
  placeholder?: string;
  type: string;
  id: string;
  value?: string | number;
  defaultValue?: string;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function CustomInput({
  label,
  placeholder,
  type,
  id,
  value,
  defaultValue,
  onValueChange,
}: ICustomeInputProps) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <InputContainer>
        <IconContainer>
          <PiAddressBook />
        </IconContainer>
        <Input
          type={type}
          id={id}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onValueChange}
          value={value}
          required
        />
      </InputContainer>
    </div>
  );
}

export default CustomInput;
