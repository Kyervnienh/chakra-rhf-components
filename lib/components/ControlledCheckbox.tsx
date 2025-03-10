import { Checkbox } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import type { ControlledCheckboxProps } from './index';

const ControlledCheckbox = <T,>({
  control,
  isDisabled,
  fieldError,
  label,
  name,
}: ControlledCheckboxProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <Checkbox.Root
          checked={value}
          disabled={isDisabled}
          invalid={!!error || !!fieldError}
          onChange={onChange}
          ref={ref}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>{label}</Checkbox.Label>
        </Checkbox.Root>
      )}
    />
  );
};

export default ControlledCheckbox;
