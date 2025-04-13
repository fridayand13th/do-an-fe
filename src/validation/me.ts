import * as yup from "yup";
import { emailValidation, nameValidation } from "./auth";

const hobbyValidation = yup
  .mixed()
  .oneOf(["sáng", "chiều", "tối"], "Giá trị không hợp lệ.");

const hobbySchema = yup.object().shape({
  hobby: hobbyValidation,
});

export const meSchema = yup
  .object()
  .shape({
    firstName: nameValidation,
    lastName: nameValidation,
    email: emailValidation,
    phone: yup
      .string()
      .trim()
      .test(
        "phone-validation",
        "Số điện thoại không chính xác.",
        function (value) {
          if (value && value.length > 0) {
            const phonePattern =
              /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            return phonePattern.test(value);
          }
          return true;
        },
      ),
  })
  .concat(hobbySchema);
