import { InputGroupProps } from '@chakra-ui/react';
import React from 'react';
import { FieldErrors, FieldErrorsImpl } from 'react-hook-form';

export type TInputFieldProps = {
  label?: string;
  required?: boolean;
  errorMessage?: string;
  children: React.ReactNode;
  renderRequire?: boolean;
  hideLabel?: boolean;
  width?: string;
  isHideLabelErrorMessage?: boolean;
  errors?: Partial<FieldErrorsImpl<any>>;
  inputLeftAddon?: string | React.ReactNode;
  inputRightAddon?: string | React.ReactNode;
  objectKey?: string;
  labelWidth?: string;
  inputGroupSize?: InputGroupProps['size'];
};

export type TFormFieldProvider = {
  children: React.ReactNode;
  errors: FieldErrors;
  align?: 'horizontal' | 'vertical';
  basis?: string;
};

export type TField = {
  children: React.ReactNode;
};
