import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export interface InputFieldProps<T extends FieldValues>
  extends React.ComponentProps<'input'> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  description?: string;
  placeholder: string;
}

const InputField = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  ...inputProps
}: InputFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}

          <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete="off"
            {...inputProps}
          />

          {description && <FieldDescription>{description}</FieldDescription>}

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default InputField;
