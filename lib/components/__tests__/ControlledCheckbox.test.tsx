import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    <ChakraProvider value={createSystem(defaultConfig)}>
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

    expect(screen.getByLabelText(/test input/i)).toBeDefined();
  });

  test('handles checkbox change', async () => {
    render(<TestComponent<TestForm> name="test-input" label="Test Input" />);

    const input = screen.getByLabelText(/test input/i) as HTMLInputElement;

    await userEvent.click(input);

    expect(input.checked).toBe(true);
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

    expect(input.disabled).toBe(true);
  });
});
