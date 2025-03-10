import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { type Path, useForm } from 'react-hook-form';
import type { ControlledSelectProps } from '..';
import ControlledSelect from '../ControlledSelect';

interface TestComponentProps<T> {
  defaultValue?: string | null;
  fieldError?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  label: string;
  name: Path<T>;
  options?: ControlledSelectProps<T>['options'];
  placeholder?: string;
  setErrorMessage?: string;
}

interface TestForm {
  'test-input': string;
}

const TestComponent = <T,>({
  defaultValue,
  fieldError,
  isDisabled,
  isLoading,
  label,
  name,
  options = [],
  placeholder,
  setErrorMessage,
}: TestComponentProps<T>) => {
  const { control, setError } = useForm({
    defaultValues: { [name]: defaultValue },
  });

  if (setErrorMessage) setError(name, { message: setErrorMessage });

  return (
    <ChakraProvider>
      <ControlledSelect<T>
        control={control}
        fieldError={fieldError}
        isDisabled={isDisabled}
        isLoading={isLoading}
        label={label}
        name={name}
        options={options}
        placeholder={placeholder}
      />
    </ChakraProvider>
  );
};

describe('ControlledSelect', () => {
  test('renders correctly with label', () => {
    render(<TestComponent<TestForm> name="test-input" label="Test Input" />);
    expect(screen.getByLabelText(/test input/i)).toBeInTheDocument();
  });

  test('renders correctly with options', () => {
    render(
      <TestComponent
        name="test-input"
        label="Test Input"
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ]}
      />,
    );

    expect(screen.getByText(/Option 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Option 2/i)).toBeInTheDocument();
  });

  test('handles input change', () => {
    render(
      <TestComponent
        name="test-input"
        label="Test Input"
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ]}
      />,
    );

    const select = screen.getByLabelText(/test input/i) as HTMLSelectElement;

    expect(select.value).toBe('');

    fireEvent.change(select, { target: { value: 'option2' } });
    expect(select.value).toBe('option2');
  });

  test('handles null value', () => {
    render(
      <TestComponent
        defaultValue={null}
        label="Test Input"
        name="test-input"
      />,
    );

    const select = screen.getByLabelText(/test input/i) as HTMLSelectElement;
    expect(select.value).toBe('');
  });

  test('disables input', () => {
    render(
      <TestComponent<TestForm>
        name="test-input"
        label="Test Input"
        isDisabled
      />,
    );
    const select = screen.getByLabelText(/test input/i) as HTMLSelectElement;
    expect(select).toBeDisabled();
  });

  test('disables input while loading', () => {
    render(
      <TestComponent
        name="test-input"
        label="Test Input"
        isLoading
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ]}
      />,
    );

    expect(screen.getByLabelText(/test Input/i)).toBeDisabled();
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

  test('renders correctly with placeholder', () => {
    render(
      <TestComponent
        name="test-input"
        label="Test Input"
        placeholder="Test placeholder"
      />,
    );

    const placeholderOption = screen.getByText(
      /test placeholder/i,
    ) as HTMLOptionElement;
    expect(placeholderOption).toBeInTheDocument();
  });
});
