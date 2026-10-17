'use client';

import * as Primitive from '@radix-ui/react-select';
import { IconCheck, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import type { ComponentProps } from 'react';

type SelectProps = Omit<ComponentProps<typeof Primitive.Trigger>, 'value' | 'onChange' | 'children'> & {
  value: string;
  onValueChange: (value: string) => void;
  options: readonly { value: string; label: string; disabled?: boolean }[];
  required?: boolean;
  name?: string;
};

// Radix reserves an empty value for its placeholder. Keep the domain's empty
// filter/optional value selectable through an internal, non-domain value.
const emptyValue = '__zev_empty_option__';

export function Select({ value, onValueChange, options, required, name, disabled, className = '', ...props }: SelectProps) {
  return <Primitive.Root value={value || emptyValue} onValueChange={next => onValueChange(next === emptyValue ? '' : next)} required={required} name={name} disabled={disabled || !options.length}>
    <Primitive.Trigger {...props} className={`select-trigger ${className}`}>
      <span className="min-w-0 flex-1"><Primitive.Value placeholder="Nema dostupnih opcija" /></span>
      <Primitive.Icon className="select-chevron"><IconChevronDown size={18} aria-hidden="true" /></Primitive.Icon>
    </Primitive.Trigger>
    <Primitive.Portal>
      <Primitive.Content className="select-menu" position="popper" sideOffset={8} collisionPadding={12}>
        <Primitive.ScrollUpButton className="select-scroll"><IconChevronUp size={18} aria-hidden="true" /></Primitive.ScrollUpButton>
        <Primitive.Viewport className="p-1.5">
          {options.map(option => <Primitive.Item className="select-option" key={option.value} value={option.value || emptyValue} disabled={option.disabled}>
            <Primitive.ItemText>{option.label}</Primitive.ItemText>
            <Primitive.ItemIndicator className="select-check"><IconCheck size={18} aria-hidden="true" /></Primitive.ItemIndicator>
          </Primitive.Item>)}
        </Primitive.Viewport>
        <Primitive.ScrollDownButton className="select-scroll"><IconChevronDown size={18} aria-hidden="true" /></Primitive.ScrollDownButton>
      </Primitive.Content>
    </Primitive.Portal>
  </Primitive.Root>;
}
