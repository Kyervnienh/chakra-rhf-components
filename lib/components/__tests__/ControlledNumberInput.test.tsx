import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { type Path, useForm } from 'react-hook-form';
import ControlledNumberInput from '../ControlledNumberInput';

interface TestComponentProps<T> {
  fieldError?: string;
  isDisabled?: boolean;
  label: string;
  max?: number;
  min?: number;
  name: Path<T>;
  prepend?: string;
  setErrorMessage?: string;
}

interface TestForm {
  'test-input': number;
}

const TestComponent = <T,>({
  fieldError,
  isDisabled,
  label,
  max,
  min,
  name,
  prepend,
  setErrorMessage,
}: TestComponentProps<T>) => {
  const { control, setError } = useForm();

  if (setErrorMessage) setError(name, { message: setErrorMessage });

  return (
    <ChakraProvider>
      <ControlledNumberInput<T>
        control={control}
        fieldError={fieldError}
        isDisabled={isDisabled}
        label={label}
        max={max}
        min={min}
        name={name}
        prepend={prepend}
      />
    </ChakraProvider>
  );
};

describe('ControlledNumberInput', () => {
  test('renders correctly with label', () => {
    render(<TestComponent<TestForm> name="test-input" label="Test Input" />);

    expect(screen.getByLabelText(/test input/i)).toBeInTheDocument();
  });

  test('handles input change', () => {
    render(<TestComponent<TestForm> name="test-input" label="Test Input" />);

    const input = screen.getByLabelText(/test input/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: '123' } });
    expect(input.value).toBe('123');
  });

  test('disables input', () => {
    render(
      <TestComponent<TestForm>
        name="test-input"
        label="Test Input"
        isDisabled
      />,
    );

    const input = screen.getByLabelText(/test input/i) as HTMLInputElement;

    expect(input).toBeDisabled();
  });

  test('displays field error message', () => {
    render(
      <TestComponent
        name="test-input"
        label="Test Input"
        fieldError="Test field error message"
      />,
    );

    expect(screen.getByText(/Test field error message/i)).toBeInTheDocument();
  });

  test('displays form error message', () => {
    render(
      <TestComponent
        name="test-input"
        label="Test Input"
        setErrorMessage="Test form error message"
      />,
    );

    expect(screen.getByText(/Test form error message/i)).toBeInTheDocument();
  });

  test('accepts only numbers', () => {
    render(<TestComponent<TestForm> name="test-input" label="Test Input" />);

    const input = screen.getByLabelText(/test input/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'abc' } });
    expect(input.value).toBe(''); // should not allow non-numeric values

    fireEvent.change(input, { target: { value: '123' } });
    expect(input.value).toBe('123'); // should allow numeric values
  });

  test('respects min constraints', () => {
    render(
      <TestComponent<TestForm> name="test-input" label="Test Input" min={2} />,
    );

    const input = screen.getByLabelText(/test input/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: '1' } });
    expect(input.value).toBe(''); // should not allow value less than min

    fireEvent.change(input, { target: { value: '50' } });
    expect(input.value).toBe('50'); // valid value within range
  });

  test('respects max constraints', () => {
    render(
      <TestComponent<TestForm>
        name="test-input"
        label="Test Input"
        max={100}
      />,
    );

    const input = screen.getByLabelText(/test input/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: '101' } });
    expect(input.value).toBe(''); // should not allow value greater than max

    fireEvent.change(input, { target: { value: '50' } });
    expect(input.value).toBe('50'); // valid value within range
  });

  test('handles prepend rendering', () => {
    render(
      <TestComponent<TestForm>
        name="test-input"
        label="Test Input"
        prepend="$"
      />,
    );

    expect(screen.getByText('$')).toBeInTheDocument();
  });
});
