import { TInputFieldProps } from "@@types/components/commons/forms";
import { Box, FormLabel } from "@chakra-ui/react";
import React, { cloneElement, useMemo } from "react";

export default function InputField({
  label,
  required,
  errorMessage,
  errors,
  children,
  renderRequire,
  width,
  hideLabel,
}: TInputFieldProps) {
  const props = (children as React.ReactElement).props;
  const errorObject = useMemo(() => {
    if (!errors) return undefined;
    //@ts-ignore
    return errors[props.name as string];
  }, [errors]);

  const setErrorMessage = (error: {
    type: "required" | "maxLength" | "minLength" | "max" | "min";
    message?: string;
  }) => {
    if (!label) return "";
    if (error.message) return `${errorObject?.message}`;
    const { type } = error;

    switch (type) {
      case "required":
        return `Trường bắt buộc`;
      case "maxLength":
        return `Quá dài`;
      case "minLength":
        return `Quá ngắn`;
      case "max":
        return `Giá trị tối đa`;
      case "min":
        return `Giá trị tối thiểu`;
    }
  };
  return (
    <FormLabel className="mb-4 mr-0 relative" w={width || "100%"}>
      <Box pb="4px">
        {!hideLabel && label && (
          <span className="relative">
            {label}
            {renderRequire && (
              <span className="absolute top-0 right-[-12px] text-red-400">
                *
              </span>
            )}
          </span>
        )}
      </Box>
      <Box mt="2">
        {cloneElement(children as React.ReactElement, {
          style: { boxSizing: "border-box" },
        })}
      </Box>
      <div className="absolute h-2 bottom-[-3px]">
        <span className="font-bold text-xs text-red-400">
          {!!errorObject && setErrorMessage(errorObject as any)}
        </span>
      </div>
    </FormLabel>
  );
}
