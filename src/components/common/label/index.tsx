import { TInputFieldProps } from '@@types/components/commons/forms';
import { Box, FormLabel, FormLabelProps } from '@chakra-ui/react';
import { useMemo } from 'react';

export default function Label({
  width,
  label,
  hideLabel,
  formLabelProps,
  align,
  labelWidth,
  renderRequire,
  children,
  className,
}: Omit<TInputFieldProps, 'errors' | 'children'> & {
  children?: React.ReactNode | string;
  formLabelProps?: FormLabelProps;
  align?: string;
  className?: string;
}) {
  return (
    <FormLabel
      className={className}
      mb={label && !hideLabel ? '8px' : '0'}
      w={width || '100%'}
      {...formLabelProps}
    >
      {!hideLabel && label && (
        <Box
          pb="4px"
          whiteSpace="nowrap"
          mr={align === 'vertical' ? 0 : '0.5rem'}
          width={labelWidth}
        >
          <span className="relative">
            {label}
            {renderRequire &&
              (align === 'vertical' || !align ? (
                <span className="absolute top-0 right-[-12px] text-danger-400">
                  *
                </span>
              ) : (
                <span className="absolute top-[-4px] left-[-8px] text-danger-400">
                  *
                </span>
              ))}
          </span>
        </Box>
      )}
      {children}
    </FormLabel>
  );
}
