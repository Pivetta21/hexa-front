import { useContext, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { OutlineInput, OutlineInputError } from 'src/styled/Inputs';
import { ButtonPrimary } from 'src/styled/Buttons';
import { ButtonLoader } from 'src/styled/Loaders';

import AuthContext from 'src/providers/AuthContext';

import { confirmEmail } from 'src/services/user.service';
import { User } from 'src/models/User.model';
import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { LoginForm, LoginFormError } from '../style';
import { ContainerCaption, ContainerHeader } from 'src/styled/Texts';

interface Props {
  user: User;
  password: string;
}

export const SignUpPageTwo: React.FC<Props> = ({ user, password }) => {
  const { login } = useContext(AuthContext);

  const [emailConfirmation, setEmailConfirmation] = useState(
    {} as ServiceResponse<boolean>,
  );

  const initialValues = {
    code: '',
  };

  const validationSchema = Yup.object({
    code: Yup.number()
      .typeError('Digite um número.')
      .required('Esse campo é obrigatório!'),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const serviceResponse = await confirmEmail(user, Number(values.code));

      setEmailConfirmation(serviceResponse);

      if (!serviceResponse.errorResponse && serviceResponse.data) {
        login(user.email, password);
      }

      setSubmitting(false);
    },
  });

  return (
    <LoginForm autoComplete="off" onSubmit={formik.handleSubmit}>
      {emailConfirmation.errorResponse && !formik.isValidating ? (
        <LoginFormError>
          {emailConfirmation.errorResponse.message}
        </LoginFormError>
      ) : null}

      <ContainerHeader>Confirmação de E-mail</ContainerHeader>
      <ContainerCaption>
        Enviamos um e-mail para você com o <br />
        código de verificação.
      </ContainerCaption>

      <OutlineInput>
        <label htmlFor="code">Código de Verificação</label>
        <input
          type="text"
          id="code"
          name="code"
          placeholder="Ex.: 5640"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.code}
        />
      </OutlineInput>
      {formik.touched.code && formik.errors.code ? (
        <OutlineInputError>{formik.errors.code}</OutlineInputError>
      ) : null}

      <ButtonPrimary
        type="submit"
        disabled={!(formik.isValid && formik.dirty) ? true : undefined}
      >
        {formik.isSubmitting ? <ButtonLoader /> : 'Verificar'}
      </ButtonPrimary>
    </LoginForm>
  );
};
