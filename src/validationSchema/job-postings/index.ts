import * as yup from 'yup';

export const jobPostingValidationSchema = yup.object().shape({
  title: yup.string().nullable(),
  description: yup.string().nullable(),
  requirements: yup.string().nullable(),
  salary_range: yup.string().nullable(),
  posted_date: yup.date().nullable(),
  closing_date: yup.date().nullable(),
  company_id: yup.string().nullable().required(),
});
