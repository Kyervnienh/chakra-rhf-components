import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import ControlledPasswordInput from '../ControlledPasswordInput';

const TestComponent = ({
  fieldError,
  isDisabled,
  label,
  name,
  placeholder,
  setErrorMessage,
}: any) => {
  const { control, setError } = useForm();

  if (setErrorMessage) setError(name, { message: setErrorMessage });

  return (
    <ChakraProvider value={createSystem(defaultConfig)}>
      <ControlledPasswordInput
        control={control}
        fieldError={fieldError}
        isDisabled={isDisabled}
        label={label}
        name={name}
        placeholder={placeholder}
      />
    </ChakraProvider>
  );
};

describe('ControlledPasswordInput', () => {
  test('renders correctly with label', () => {
    render(<TestComponent name="test-input" label="Test Input" />);

    expect(screen.getByLabelText(/test input/i)).toBeDefined();
  });

  test('handles input change', () => {
    render(<TestComponent name="test-input" label="Test Input" />);

    const input = screen.getByLabelText(/test input/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });

  test('disables input', () => {
    render(<TestComponent name="test-input" label="Test Input" isDisabled />);

    const input = screen.getByLabelText(/test input/i) as HTMLInputElement;

    expect(input.disabled).toBe(true);
  });

  test('displays field error message', () => {
    render(
      <TestComponent
        name="test-input"
        label="Test Input"
        fieldError="Test field error message"
      />,
    );

    expect(screen.getByText(/Test field error message/i)).toBeDefined();
  });

  test('displays form error message', () => {
    render(
      <TestComponent
        name="test-input"
        label="Test Input"
        setErrorMessage="Test form error message"
      />,
    );

    expect(screen.getByText(/Test form error message/i)).toBeDefined();
  });

  test('renders correctly with placeholder', () => {
    render(
      <TestComponent
        name="test-input"
        label="Test Input"
        placeholder="Test placeholder"
      />,
    );

    const input = screen.getByPlaceholderText(
      /test placeholder/i,
    ) as HTMLInputElement;

    expect(input).toBeDefined();
  });

  test('toggles password visibility', () => {
    render(<TestComponent name="test-input" label="Test Input" />);

    const input = screen.getByLabelText(/test input/i) as HTMLInputElement;
    const button = screen.getByLabelText(/mostrar/i);

    expect(input.type).toBe('password');

    fireEvent.click(button);
    expect(input.type).toBe('text');

    fireEvent.click(button);
    expect(input.type).toBe('password');
  });
});
