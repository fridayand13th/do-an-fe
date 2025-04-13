import * as yup from "yup";

const noExtraSpaces = (value: any) => {
  return value && !/^\s|\s{2,}|\s$/.test(value);
};
const emailValidation = yup
  .string()
  .email("Vui lòng nhập email hợp lệ.")
  .required("Trường này là bắt buộc.")
  .trim()
  .test("no-uppercase", "Không được chứa chữ cái viết hoa.", (value) => {
    if (!value) return true;
    return !/[A-Z]/.test(value);
  });

const emailScheme = yup.object().shape({
  email: emailValidation,
});

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Trường này là bắt buộc.")
    .min(8, "Tối thiểu phải là 8 ký tự.")
    .test(
      "no-spaces",
      "Không thể chứa khoảng trống trong mật khẩu.",
      noExtraSpaces,
    )
    .test("has-uppercase", "Phải chứa ít nhất 1 ký tự viết hoa.", (value) =>
      /[A-Z]/.test(value),
    )
    .test("has-lowercase", "Phải chứa ít nhất 1 ký tự viết thường.", (value) =>
      /[a-z]/.test(value),
    )
    .test("has-number", "Phải chứa ít nhất 1 số.", (value) =>
      /[0-9]/.test(value),
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu không trùng khớp.")
    .required("Trường này là bắt buộc."),
});

const loginSchema = yup.object().shape({
  email: emailValidation,
  password: yup
    .string()
    .test(
      "no-spaces",
      " Không thể có khoảng trống trong mật khẩu.",
      noExtraSpaces,
    )
    .required("Trường này là bắt buộc."),
});

const nameValidation = yup
  .string()
  .required("Trường này là bắt buộc.")
  .trim()
  .min(2, "Tối thiểu phải là 2 ký tự.")
  .max(50, "Tối đa là 50 ký tự.")
  .matches(/^[a-zA-Z\s'-]+$/, "Chỉ được chứa các chữ cái và không dấu.");

const hobbyValidation = yup
  .mixed()
  .oneOf(["sáng", "chiều", "tối"], "Giá trị không hợp lệ.");

const hobbySchema = yup.object().shape({
  hobby: hobbyValidation,
});

const registerSchema = loginSchema
  .concat(
    yup.object().shape({
      firstName: nameValidation,
      lastName: nameValidation,
    }),
  )
  .concat(passwordSchema)
  .concat(hobbySchema);

const changePasswordSchema = passwordSchema
  .concat(
    yup.object().shape({
      currentPassword: yup
        .string()
        .test(
          "no-spaces",
          "Không thể chứa khoảng trống trong mật khẩu.",
          noExtraSpaces,
        )
        .required("Trường này là bắt buộc."),
    }),
  )
  .concat(passwordSchema);

const resetPasswordSchema = passwordSchema;

export {
  emailScheme,
  emailValidation,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  changePasswordSchema,
  nameValidation,
};
