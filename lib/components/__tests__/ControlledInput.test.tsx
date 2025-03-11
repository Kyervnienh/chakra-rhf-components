import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    <ChakraProvider value={createSystem(defaultConfig)}>
      <ControlledInput<T> control={control} name={name} {...rest} />
    </ChakraProvider>
  );
};

describe('ControlledInput', () => {
  it('renders correctly with label', () => {
    render(<TestComponent<TestForm> name="test-input" label="Test Input" />);

    expect(screen.getByLabelText(/test input/i)).toBeDefined();
  });

  it('handles input change', async () => {
    render(<TestComponent<TestForm> name="test-input" label="Test Input" />);

    const input = screen.getByLabelText(/test input/i) as HTMLInputElement;

    await userEvent.type(input, 'test');

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

    expect(input).toBeDefined();
  });

  it('displays field error message', () => {
    render(
      <TestComponent
        name="test-input"
        label="Test Input"
        fieldError="Test field error message"
      />,
    );

    expect(screen.getByText(/Test field error message/i)).toBeDefined();
  });

  it('displays form error message', () => {
    render(
      <TestComponent
        name="test-input"
        label="Test Input"
        setErrorMessage="Test form error message"
      />,
    );

    expect(screen.getByText(/Test form error message/i)).toBeDefined();
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

    expect(input).toBeDefined();
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
