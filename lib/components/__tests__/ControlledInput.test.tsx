import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import type { ControlledInputProps } from '..';
import ControlledInput from '../ControlledInput';

interface TestComponentProps<T>
  extends Omit<ControlledInputProps<T>, 'control'> {
  setErrorMessage?: string;
}

interface TestForm {
  'test-input': string;
}

const TestComponent = <T,>({
  name,
  setErrorMessage,
  ...rest
}: TestComponentProps<T>) => {
  const { control, setError } = useForm();

  if (setErrorMessage) setError(name, { message: setErrorMessage });

  return (
    <ChakraProvider>
      <ControlledInput<T> control={control} name={name} {...rest} />
    </ChakraProvider>
  );
};

describe('ControlledInput', () => {
  it('renders correctly with label', () => {
    render(<TestComponent<TestForm> name="test-input" label="Test Input" />);

    expect(screen.getByLabelText(/test input/i)).toBeInTheDocument();
  });

  it('handles input change', () => {
    render(<TestComponent<TestForm> name="test-input" label="Test Input" />);

    const input = screen.getByLabelText(/test input/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });

  it('disables input', () => {
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

  it('displays field error message', () => {
    render(
      <TestComponent
        name="test-input"
        label="Test Input"
        fieldError="Test field error message"
      />,
    );

    expect(screen.getByText(/Test field error message/i)).toBeInTheDocument();
  });

  it('displays form error message', () => {
    render(
      <TestComponent
        name="test-input"
        label="Test Input"
        setErrorMessage="Test form error message"
      />,
    );

    expect(screen.getByText(/Test form error message/i)).toBeInTheDocument();
  });

  it('renders correctly with placeholder', () => {
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

    expect(input).toBeInTheDocument();
  });

  it('should call onBlur function when input loses focus', () => {
    const onBlur = vi.fn();
    render(
      <TestComponent name="blur-input" label="Test Input" onBlur={onBlur} />,
    );

    const input = screen.getByLabelText(/Test input/i) as HTMLInputElement;
    fireEvent.blur(input);

    expect(onBlur).toHaveBeenCalled();
  });

  it('should call onKeyDown function when key is pressed', () => {
    const onKeyDown = vi.fn();
    render(
      <TestComponent
        name="key-down-input"
        label="Test Input"
        onKeyDown={onKeyDown}
      />,
    );

    const input = screen.getByLabelText(/Test input/i) as HTMLInputElement;
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(onKeyDown).toHaveBeenCalledWith(
      expect.objectContaining({ key: 'Enter' }),
    );
  });
});
