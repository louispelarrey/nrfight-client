import React from 'react';
import { Label } from './label';
import { Input } from './input';

interface IINputField {
  label: string;
  type: string;
  register: any;
  isLoading: boolean;
}

export default function InputField({ label, type, register, isLoading }: IINputField) {
  return (
    <div className="grid gap-1">
      <Label className="text-sm font-medium text-muted-foreground" htmlFor={type}>
        {label}
      </Label>
      <Input
        id={type}
        placeholder={label}
        type={type}
        autoCapitalize="none"
        autoComplete={type}
        autoCorrect="off"
        disabled={isLoading}
        {...register(type)}
      />
    </div>
  );
}