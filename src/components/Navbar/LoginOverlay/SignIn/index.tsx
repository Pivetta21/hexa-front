import { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import AuthContext from 'src/providers/AuthContext';

import {
  FormContainer,
  FormErro,
  OutlineInput,
  InputError,
} from 'src/styled/Inputs';

import { ApiResponse } from 'src/models/ApiResponse.model';

import { ButtonPrimary } from 'src/styled/Buttons';
import { ButtonLoader } from 'src/styled/Loaders';
import { useState } from 'react';
import { AuthenticatedUser } from 'src/models/AuthenticatedUser.model';

interface Props {}

const Login: React.FC<Props> = () => {
  const { login } = useContext(AuthContext);

  const [loginResponse, setLoginResponse] = useState(
    {} as ApiResponse<AuthenticatedUser>,
  );

  const initialValues = { email: '', password: '' };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Endereço de e-mail inválido.')
      .required('Esse campo é obrigatório!'),
    password: Yup.string()
      .min(5, 'Sua senha é muito curta.')
      .required('Esse campo é obrigatório!'),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const response = await login(values.email, values.password);

      setLoginResponse(response);

      setSubmitting(false);
    },
  });

  return (
    <FormContainer autoComplete="off" onSubmit={formik.handleSubmit}>
      {loginResponse.dirty && loginResponse.errors && !formik.isValidating ? (
        <FormErro>{loginResponse.errorMessage}</FormErro>
      ) : null}

      <OutlineInput>
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Digite aqui seu e-mail"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </OutlineInput>

      {formik.touched.email && formik.errors.email ? (
        <InputError>{formik.errors.email}</InputError>
      ) : null}

      <OutlineInput>
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Digite aqui sua senha"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </OutlineInput>

      {formik.touched.password && formik.errors.password ? (
        <InputError>{formik.errors.password}</InputError>
      ) : null}

      <p>Problemas para entrar?</p>
      <ButtonPrimary
        type="submit"
        disabled={!(formik.isValid && formik.dirty) ? true : undefined}
      >
        {formik.isSubmitting ? <ButtonLoader /> : 'Entrar'}
      </ButtonPrimary>
    </FormContainer>
  );
};

export default Login;
