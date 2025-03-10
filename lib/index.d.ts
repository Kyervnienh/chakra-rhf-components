import type { Control, FieldValues, Path } from 'react-hook-form';

export interface ControlledInputProps<T> {
  control: Control<FieldValues | any>;
  fieldError?: string | null;
  isDisabled?: boolean;
  label?: string;
  name: Path<T>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  prepend?: string;
  type?: string;
  variant?: 'filled' | 'outline' | 'unstyled';
}

export interface ControlledCheckboxProps<T>
  extends Omit<
    ControlledInputProps<T>,
    'onKeyDown' | 'placeholder' | 'prepend' | 'type'
  > {}

export interface ControlledDateInputProps<T>
  extends Omit<ControlledInputProps<T>, 'onKeyDown' | 'prepend' | 'type'> {
  format?: string;
  inputFormat?: string;
  isDisabled?: boolean;
  label?: string;
  maxDate?: Date;
  minDate?: Date;
  placeholder?: string;
  onChange?: (value?: string | null) => void;
}

export interface ControlledPasswordInputProps<T>
  extends Omit<ControlledInputProps<T>, 'name' | 'prepend' | 'type'> {
  name?: 'password' | Path<T>;
}

export interface Option {
  label: string;
  value: string;
  isDisabled?: boolean;
}

export interface ControlledSelectProps<T>
  extends Omit<ControlledInputProps<T>, 'onBlur' | 'onKeyDown' | 'type'> {
  isClearable?: boolean;
  isLoading?: boolean;
  loadingMessage?: string;
  noOptionsMessage?: string;
  options: Option[];
}

export interface ControlledInputNumberProps<T>
  extends Omit<ControlledInputProps<T>, 'onKeyDown' | 'type'> {
  allowNegative?: boolean;
  decimals?: number;
  max?: number;
  min?: number;
}

export interface PlaceholderInputProps {
  label: string;
}
