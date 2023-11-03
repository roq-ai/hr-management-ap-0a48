import * as yup from 'yup';

export const interviewValidationSchema = yup.object().shape({
  interview_date: yup.date().nullable(),
  interviewer: yup.string().nullable(),
  interview_notes: yup.string().nullable(),
  interview_result: yup.string().nullable(),
  next_steps: yup.string().nullable(),
  application_id: yup.string().nullable().required(),
});
