import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { type Path, useForm } from 'react-hook-form';
import ControlledCheckbox from '../ControlledCheckbox';

interface TestComponentProps<T> {
  isDisabled?: boolean;
  label: string;
  name: Path<T>;
}

interface TestForm {
  'test-input': boolean;
}

const TestComponent = <T,>({
  isDisabled,
  label,
  name,
}: TestComponentProps<T>) => {
  const { control } = useForm();

  return (
    <ChakraProvider>
      <ControlledCheckbox<T>
        control={control}
        isDisabled={isDisabled}
        label={label}
        name={name}
      />
    </ChakraProvider>
  );
};

describe('ControlledCheckbox', () => {
  test('renders correctly with label', () => {
    render(<TestComponent<TestForm> name="test-input" label="Test Input" />);

    expect(screen.getByLabelText(/test input/i)).toBeInTheDocument();
  });

  test('handles checkbox change', () => {
    render(<TestComponent<TestForm> name="test-input" label="Test Input" />);

    const input = screen.getByLabelText(/test input/i) as HTMLInputElement;

    fireEvent.click(input);
    expect(input).toBeChecked();
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
});
