import * as yup from "yup";

const nameValidation = yup
  .string()
  .required("Trường này là bắt buộc.")
  .min(2, "Tối thiểu phải là 2 ký tự.")
  .max(50, "Tối đa là 50 ký tự.");

const dateValidation = yup
  .string()
  .required("Trường này là bắt buộc.")
  .test(
    "is-valid-date",
    "Định dạng ngày không hợp lệ.",
    (value) => !isNaN(Date.parse(value || "")),
  );

const taskStatus = yup
  .mixed()
  .oneOf(
    ["Chưa xử lý", "Đang xử lý", "Đã xử lý", "Hủy"],
    "Giá trị không hợp lệ.",
  );

const statusSchema = yup.object().shape({
  status: taskStatus.required("Trường này là bắt buộc."),
});

const taskSchema = yup
  .object()
  .shape({
    name: nameValidation,
    startDate: dateValidation,
    endDate: dateValidation.test(
      "is-after-start",
      "Ngày kết thúc phải sau hoặc bằng ngày bắt đầu.",
      function (value) {
        const { startDate } = this.parent;
        if (!startDate || !value) return true;
        return new Date(value) >= new Date(startDate);
      },
    ),
  })
  .concat(statusSchema);

export { taskSchema };
