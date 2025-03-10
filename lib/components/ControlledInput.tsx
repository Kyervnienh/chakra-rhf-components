import { Input } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import Field from './Field';
import type { ControlledInputProps } from './index';

const ControlledInput = <T,>({
  control,
  fieldError,
  helperText,
  isDisabled,
  label,
  name,
  onBlur: customOnBlur,
  onKeyDown,
  placeholder = label,
  type = 'text',
}: ControlledInputProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
      <Field
        disabled={isDisabled}
        errorText={error?.message || fieldError}
        helperText={helperText}
        id={name}
        invalid={!!error || !!fieldError}
        label={label}
      >
        <Input
          id={name}
          onBlur={(e) => {
            onBlur();
            customOnBlur?.(e);
          }}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          type={type}
          value={value ?? ''}
        />
      </Field>
    )}
  />
);

export default ControlledInput;
