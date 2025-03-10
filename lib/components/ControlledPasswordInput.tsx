import { InputGroup } from '@/components/ui/input-group';
import { Icon, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Field from './Field';
import type { ControlledPasswordInputProps } from './index';

const ControlledPasswordInput = <T,>({
  control,
  fieldError,
  isDisabled,
  label = 'Contraseña',
  name = 'password',
  onBlur,
  helperText,
  onKeyDown,
  placeholder = label,
}: ControlledPasswordInputProps<T>) => {
  const [show, setShow] = useState<boolean>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Field
          disabled={isDisabled}
          errorText={error?.message || fieldError}
          helperText={helperText}
          id={name}
          invalid={!!error || !!fieldError}
          label={label}
        >
          <InputGroup
            endElement={
              <Icon
                onClick={() => setShow(!show)}
                aria-label={show ? `Ocultar ${name}` : `Mostrar ${name}`}
              >
                {show ? <FaEye /> : <FaEyeSlash />}
              </Icon>
            }
          >
            <Input
              name={name}
              onBlur={onBlur}
              onChange={onChange}
              onKeyDown={onKeyDown}
              placeholder={placeholder}
              type={show ? 'text' : 'password'}
              value={value}
            />
          </InputGroup>
        </Field>
      )}
    />
  );
};

export default ControlledPasswordInput;
