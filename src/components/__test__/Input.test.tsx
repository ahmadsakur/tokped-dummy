import { render, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import CustomInput from '../Input';


describe('CustomInput', () => {
  it('renders without errors', () => {
    render(<CustomInput label="Test Label" type="text" id="test-input" icon={<div>Icon</div>} />);
  });

  it('renders label and placeholder correctly', () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <CustomInput label="Test Label" placeholder="Test Placeholder" type="text" id="test-input" icon={<div>Icon</div>} />
    );

    const label = getByLabelText('Test Label');
    const input = getByPlaceholderText('Test Placeholder');

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('calls onChange function when input value changes', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(
      <CustomInput label="Test Label" placeholder="Test Placeholder" type="text" id="test-input" icon={<div>Icon</div>} onValueChange={mockOnChange} />
    );

    const input = getByPlaceholderText('Test Placeholder');

    fireEvent.change(input, { target: { value: 'Test Value' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('disables input when readOnly is true', () => {
    const { getByPlaceholderText } = render(
      <CustomInput label="Test Label" placeholder="Test Placeholder" type="text" id="test-input" icon={<div>Icon</div>} readonly={true} />
    );

    const input = getByPlaceholderText('Test Placeholder');

    expect(input).toHaveProperty('readOnly', true);
  });

  it('renders icon correctly', () => {
    const { getByText } = render(
      <CustomInput label="Test Label" placeholder="Test Placeholder" type="text" id="test-input" icon={<div>Test Icon</div>} />
    );

    const icon = getByText('Test Icon');

    expect(icon).toBeInTheDocument();
  });
});
