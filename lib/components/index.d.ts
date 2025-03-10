import type { ModalProps } from '@chakra-ui/react';
import type { QueryKey } from '@tanstack/react-query';
import type React from 'react';
import type {
  Control,
  DefaultValues,
  FieldValues,
  Path,
} from 'react-hook-form';
import type { ObjectSchema } from 'yup';

import type { CustomMutationProps } from '../../../hooks/useCustomMutation';
import type { BasicDateInputProps } from '../BasicDateInput';

export interface ControlledInputProps<T> {
  append?: string;
  control: Control<FieldValues | any>;
  fieldError?: string | null;
  helperText?: string;
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
  extends Omit<ControlledInputProps<T>, 'onKeyDown' | 'prepend' | 'type'>,
    Omit<BasicDateInputProps, 'onChange' | 'value' | 'error'> {
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
  helperText?: string;
  options: Option[];
}

export interface ControlledInputNumberProps<T>
  extends Omit<ControlledInputProps<T>, 'onKeyDown' | 'type'> {
  allowNegative?: boolean;
  decimals?: number;
  max?: number;
  min?: number;
}

export interface ModalFormProps<T, TData = unknown, TVariables = void> {
  children: React.ReactNode;
  closeAfterSubmit?: boolean;
  defaultValues?: DefaultValues<T>;
  isOpen: boolean;
  modalProps?: Omit<ModalProps, 'children' | 'isOpen' | 'onClose'>;
  mutationFn: CustomMutationProps<TData, TVariables, T>['mutationFn'];
  noCloseButton?: boolean;
  onClose?: () => void;
  onSuccess?: CustomMutationProps<TData, TVariables, T>['onSuccess'];
  onSuccessMessage?: string;
  queryKey?: QueryKey | null;
  saveText?: string;
  title: string;
  validation?: (data: T, context: object) => ObjectSchema<any>;
}

export interface PlaceholderInputProps {
  label: string;
}
