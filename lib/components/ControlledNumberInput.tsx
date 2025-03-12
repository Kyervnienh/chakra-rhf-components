import { Input } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import { InputGroup } from '@/components/ui/input-group';
import Field from './Field';
import type { ControlledInputNumberProps } from './index';

const isDefined = (val: any) => val !== undefined && val !== null;

const ControlledNumberInput = <T,>({
  allowNegative = false,
  append,
  control,
  decimals,
  fieldError,
  helperText,
  isDisabled,
  label,
  max,
  min,
  name,
  placeholder = label,
  prepend,
}: ControlledInputNumberProps<T>) => {
  const getIsAllowed = (value: number | undefined) => {
    if (!isDefined(value)) return true;
    const isMaxDefined = isDefined(max);
    const isMinDefined = isDefined(min);

    if (!isMaxDefined && !isMinDefined) return true;

    return (
      (isMinDefined ? (value as number) >= (min as number) : true) &&
      (isMaxDefined ? (value as number) <= (max as number) : true)
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Field
          errorText={error?.message || fieldError}
          helperText={helperText}
          id={name}
          invalid={!!error || !!fieldError}
          label={label}
        >
          <InputGroup startElement={prepend} endElement={append}>
            <NumericFormat
              allowNegative={allowNegative}
              customInput={Input}
              decimalScale={decimals}
              isAllowed={(values) => getIsAllowed(values?.floatValue)}
              disabled={isDisabled}
              onValueChange={(values) => {
                const { value: _value } = values;
                onChange({ target: { value: _value } });
              }}
              pl={prepend ? 10 : undefined}
              placeholder={placeholder}
              thousandSeparator=","
              value={value}
            />
          </InputGroup>
        </Field>
      )}
    />
  );
};

export default ControlledNumberInput;
