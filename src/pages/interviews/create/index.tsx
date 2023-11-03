import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { useRoqClient } from 'lib/roq';
import * as RoqTypes from 'lib/roq/types';

import { interviewValidationSchema } from 'validationSchema/interviews';
import { ApplicationInterface } from 'interfaces/application';
import { InterviewInterface } from 'interfaces/interview';

function InterviewCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const roqClient = useRoqClient();
  const handleSubmit = async (values: InterviewInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await roqClient.interview.create({ data: values as RoqTypes.interview });
      resetForm();
      router.push('/interviews');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<InterviewInterface>({
    initialValues: {
      interview_date: new Date(new Date().toDateString()),
      interviewer: '',
      interview_notes: '',
      interview_result: '',
      next_steps: '',
      application_id: (router.query.application_id as string) ?? null,
    },
    validationSchema: interviewValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Interviews',
              link: '/interviews',
            },
            {
              label: 'Create Interview',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Interview
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="interview_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Interview Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.interview_date ? new Date(formik.values?.interview_date) : null}
              onChange={(value: Date) => formik.setFieldValue('interview_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.interviewer}
            label={'Interviewer'}
            props={{
              name: 'interviewer',
              placeholder: 'Interviewer',
              value: formik.values?.interviewer,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.interview_notes}
            label={'Interview Notes'}
            props={{
              name: 'interview_notes',
              placeholder: 'Interview Notes',
              value: formik.values?.interview_notes,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.interview_result}
            label={'Interview Result'}
            props={{
              name: 'interview_result',
              placeholder: 'Interview Result',
              value: formik.values?.interview_result,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.next_steps}
            label={'Next Steps'}
            props={{
              name: 'next_steps',
              placeholder: 'Next Steps',
              value: formik.values?.next_steps,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<ApplicationInterface>
            formik={formik}
            name={'application_id'}
            label={'Select Application'}
            placeholder={'Select Application'}
            fetcher={() => roqClient.application.findManyWithCount({})}
            labelField={'status'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/interviews')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'interview',
    operation: AccessOperationEnum.CREATE,
  }),
)(InterviewCreatePage);
