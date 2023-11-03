import * as yup from 'yup';

export const applicationValidationSchema = yup.object().shape({
  application_date: yup.date().nullable(),
  status: yup.string().nullable(),
  resume: yup.string().nullable(),
  cover_letter: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
  job_posting_id: yup.string().nullable().required(),
});
