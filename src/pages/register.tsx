import React from 'react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { Box, Button } from '@chakra-ui/react';

import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface registerProps {}

const Register: React.FC<registerProps> = () => {
  const [{ data }, register] = useRegisterMutation();
  const router = useRouter();

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            // worked
            router.push('/');
          }
        }}>
        {({ isSubmitting }) => (
          <Form>
            <InputField name='username' placeholder='username' label='Username' />
            <Box mt={4}>
              <InputField name='password' placeholder='password' label='Password' type='password' />
            </Box>
            <Button mt={4} type='submit' colorScheme='teal' isLoading={isSubmitting}>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);

// * Snippet
// import React from 'react'
// interface registerProps{
// }
// const register:React.FC<registerProps> = () => {
//   return (<div></div>)
// }
// export default register
