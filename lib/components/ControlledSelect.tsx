import {
  Field,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  createListCollection,
  //Spinner,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import type { ControlledSelectProps } from './index';

const ControlledSelect = <T,>({
  control,
  fieldError,
  helperText,
  isDisabled,
  isLoading,
  label,
  name,
  options,
  placeholder = label,
}: ControlledSelectProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onBlur, onChange, value },
        fieldState: { error },
      }) => (
        <Field.Root invalid={!!error || !!fieldError}>
          <Field.Label>{label}</Field.Label>

          <SelectRoot
            collection={createListCollection({ items: options })}
            disabled={isDisabled || isLoading}
            name={name}
            onInteractOutside={() => onBlur()}
            onValueChange={({ value }) => onChange(value)}
            value={value || []}
            width="320px"
          >
            <SelectTrigger>
              <SelectValueText placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              {options.map((option) => (
                <SelectItem item={option} key={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>

          {helperText && <Field.HelperText>{helperText}</Field.HelperText>}

          {(error?.message || fieldError) && (
            <Field.ErrorText>{error?.message || fieldError}</Field.ErrorText>
          )}
        </Field.Root>
      )}
    />
  );
};

export default ControlledSelect;
