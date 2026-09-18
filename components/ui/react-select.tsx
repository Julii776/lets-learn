import type { ComponentProps } from 'react';
import type { GroupBase, StylesConfig } from 'react-select';
import ReactSelect from 'react-select/async-creatable';

import { cn } from '@/lib/utils';

export interface AsyncSelectProps extends ComponentProps<typeof ReactSelect> {
  label?: string;
  error?: string;
  name: string;
}

const AsyncSelect = ({ label, error, name, ...props }: AsyncSelectProps) => {
  const customStyles: StylesConfig<unknown, boolean, GroupBase<unknown>> = {
    dropdownIndicator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: 14,
    }),
    loadingIndicator: (provided) => ({
      ...provided,
      display: 'none',
    }),
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium" htmlFor={name}>
          {label}
        </label>
      )}

      <ReactSelect
        name={name}
        className={cn('react-select', {
          'has-error': !!error,
        })}
        classNamePrefix="select"
        placeholder="Search"
        {...props}
        styles={customStyles}
      />

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default AsyncSelect;
