import * as yup from "yup";

export const schema = yup.object().shape({
  description: yup.string().required(),
  category: yup.string().required(),
  type: yup.string().required(),
  date: yup.date().required(),
  value: yup.number().positive().required(),
});
