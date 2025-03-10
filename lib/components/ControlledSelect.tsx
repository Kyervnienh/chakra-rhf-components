import {
  Field,
  SelectContent,
  SelectItem,
  SelectLabel,
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
  //isLoading,
  label,
  name,
  options,
  // placeholder = label,
}: ControlledSelectProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <SelectRoot
          collection={createListCollection({
            items: options,
          })}
          width="320px"
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          id={name}
          invalid={!!error || !!fieldError}
        >
          <SelectLabel>{label}</SelectLabel>
          <SelectTrigger>
            <SelectValueText placeholder="Select movie" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem item={option} key={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>

          {helperText && <Field.HelperText>{helperText}</Field.HelperText>}

          {(error?.message || fieldError) && (
            <Field.ErrorText>{error?.message || fieldError}</Field.ErrorText>
          )}
        </SelectRoot>
      )}
    />
  );
};

export default ControlledSelect;
