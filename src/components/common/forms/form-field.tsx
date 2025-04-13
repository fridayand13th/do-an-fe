import {
  TFormFieldProvider,
  TInputFieldProps,
} from "@@types/components/commons/forms";
import { InputGroup, InputLeftAddon, InputRightAddon } from "@chakra-ui/react";
import Label from "@components/common/label";
import {
  cloneElement,
  createContext,
  HTMLAttributes,
  useCallback,
  useContext,
  useMemo,
} from "react";

const FormFieldContext = createContext<Omit<TFormFieldProvider, "children">>({
  errors: {},
  align: "vertical",
  basis: "",
});

const useFormFieldContext = () => {
  const context = useContext(FormFieldContext);
  if (context === undefined) {
    throw new Error("useFormFieldContext must be used within a <FormField />");
  }
  return context;
};

const FormField = ({
  children,
  errors,
  align = "vertical",
  basis,
  ...props
}: TFormFieldProvider & HTMLAttributes<HTMLFormElement>) => {
  const value = useMemo(
    () => ({ errors, align, basis }),
    [errors, align, basis],
  );
  return (
    <FormFieldContext.Provider value={value}>
      <form {...props}>{children}</form>
    </FormFieldContext.Provider>
  );
};

const Field = ({
  children,
  width,
  label,
  hideLabel,
  renderRequire,
  errorMessage,
  isHideLabelErrorMessage = false,
  inputLeftAddon,
  inputRightAddon,
  labelWidth,
  inputGroupSize,
  ...restProps
}: Omit<TInputFieldProps, "errors">) => {
  const { errors, align } = useFormFieldContext();
  const props: Record<string, any> & { name: string } = (
    children as React.ReactElement
  ).props;

  const formLabelProps = useMemo<{
    width: string;
    flexDir: any;
    alignItems: any;
  }>(
    () =>
      align === "vertical"
        ? {
            width: width || "100%",
            flexDir: "column",
            alignItems: "initial",
          }
        : {
            width: width || "100%",
            flexDir: "initial",
            alignItems: "center",
          },
    [width, align],
  );

  const errorsObject = useCallback(() => {
    if (!props.name) return undefined;
    if (!props.name.includes(".")) return errors[props.name];

    const splited = props.name.split(".");
    let _object: any = errors;
    for (const _name of splited) {
      if (!_object) return undefined;
      _object = _object[_name];
    }

    return _object;
  }, [errors]);

  return (
    <Label
      className="mr-0 relative flex"
      {...formLabelProps}
      renderRequire={renderRequire}
      hideLabel={hideLabel}
      align={align}
      formLabelProps={formLabelProps}
      label={label}
      labelWidth={labelWidth}
    >
      <InputGroup size={inputGroupSize}>
        {inputLeftAddon && <InputLeftAddon>{inputLeftAddon}</InputLeftAddon>}
        {cloneElement(children as React.ReactElement, {
          style: { boxSizing: "border-box" },
        })}
        {inputRightAddon && (
          <InputRightAddon>{inputRightAddon}</InputRightAddon>
        )}
        <div className="absolute h-2 bottom-[-3px]">
          <span className="font-bold text-xs text-danger-400">
            {!!errorsObject()
              ? setErrorMessage(
                  errorsObject() as any,
                  label,
                  errorMessage,
                  isHideLabelErrorMessage,
                )
              : ""}
          </span>
        </div>
      </InputGroup>
    </Label>
  );
};

export const Form = Object.assign(FormField, {
  Field,
});

const setErrorMessage = (
  error: {
    type:
      | "required"
      | "maxLength"
      | "minLength"
      | "max"
      | "min"
      | "pattern"
      | "value"
      | "validate";
    message?: string;
  },
  label?: string,
  errorMessage?: string,
  isHideLabelErrorMessage?: boolean,
) => {
  if (!label) return "";
  if (!error) return "";
  if (error?.message) {
    return isHideLabelErrorMessage ? error?.message : `là ${error?.message}`;
  }
  const { type } = error;

  switch (type) {
    case "required":
      return `Đây là trường bắt buộc`;
    case "maxLength":
      return `Quá dài`;
    case "minLength":
      return `Quá ngắn`;
    case "max":
      return `Giá trị tối đa`;
    case "min":
      return `Giá trị tối thiểu`;
    case "pattern":
      return errorMessage;
    case "value":
      return error.message;
    case "validate":
      return errorMessage;
    default:
      return "";
  }
};
