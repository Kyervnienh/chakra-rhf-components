import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';
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
    <ChakraProvider value={createSystem(defaultConfig)}>
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
    expect(
      screen.getByLabelText('Test Input', { selector: 'button' }),
    ).toBeDefined();
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

    expect(screen.getByText(/Option 1/i)).toBeDefined();
    expect(screen.getByText(/Option 2/i)).toBeDefined();
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

    const select = screen.getByLabelText(/test input/i, {
      selector: 'button',
    }) as HTMLSelectElement;

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

    const select = screen.getByLabelText(/test input/i, {
      selector: 'button',
    }) as HTMLSelectElement;
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
    const select = screen.getByLabelText(/test input/i, {
      selector: 'button',
    }) as HTMLSelectElement;
    expect(select.disabled).toBe(true);
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

    expect(
      (
        screen.getByLabelText(/test Input/i, {
          selector: 'button',
        }) as HTMLSelectElement
      ).disabled,
    ).toBe(true);
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

    const placeholderOption = screen.getByText(
      /test placeholder/i,
    ) as HTMLOptionElement;
    expect(placeholderOption).toBeDefined();
  });
});
