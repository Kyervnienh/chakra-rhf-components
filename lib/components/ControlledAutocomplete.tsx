import { Controller } from 'react-hook-form';

import { type GroupBase, Select } from 'chakra-react-select';
import Field from './Field';
import type { ControlledSelectProps, Option } from './index';

const ControlledAutocomplete = <T,>({
  control,
  fieldError,
  helperText,
  isClearable = true,
  isDisabled,
  isLoading,
  label,
  loadingMessage = 'Cargando...',
  name,
  noOptionsMessage = 'No se encontraron resultados',
  options,
  placeholder = label,
  // variant = 'filled',
}: ControlledSelectProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => (
        <Field
          errorText={error?.message || fieldError}
          helperText={helperText}
          id={name}
          invalid={!!error || !!fieldError}
          label={label}
        >
          <Select<Option, false, GroupBase<Option>>
            backspaceRemovesValue
            isClearable={isClearable}
            isDisabled={isDisabled}
            isLoading={isLoading}
            loadingMessage={() => loadingMessage}
            noOptionsMessage={() => noOptionsMessage}
            onBlur={onBlur}
            onChange={(option) => onChange(option?.value)}
            options={options}
            placeholder={placeholder}
            ref={ref}
            value={options?.find((option) => option.value === value)}
            //variant={variant}
          />
        </Field>
      )}
    />
  );
};

export default ControlledAutocomplete;
