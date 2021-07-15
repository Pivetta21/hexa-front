import { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import AuthContext from 'src/providers/AuthContext';

import { OutlineInput, OutlineInputError } from 'src/styled/Inputs';

import { ButtonPrimary } from 'src/styled/Buttons';
import { ButtonLoader } from 'src/styled/Loaders';
import { useState } from 'react';
import { AuthenticatedUser } from 'src/models/AuthenticatedUser.model';
import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { LoginForm, LoginFormError } from '../style';

interface Props {}

const Login: React.FC<Props> = () => {
  const { login } = useContext(AuthContext);

  const [loginResponse, setLoginResponse] = useState(
    {} as ServiceResponse<AuthenticatedUser>,
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
      const loginResponse = await login(values.email, values.password);

      setLoginResponse(loginResponse);

      setSubmitting(false);
    },
  });

  return (
    <LoginForm autoComplete="off" onSubmit={formik.handleSubmit}>
      {loginResponse.errorResponse && !formik.isValidating ? (
        <LoginFormError>{loginResponse.errorResponse.message}</LoginFormError>
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
        <OutlineInputError>{formik.errors.email}</OutlineInputError>
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
        <OutlineInputError>{formik.errors.password}</OutlineInputError>
      ) : null}

      <p className="link">Problemas para entrar?</p>
      <ButtonPrimary
        type="submit"
        disabled={!(formik.isValid && formik.dirty) ? true : undefined}
      >
        {formik.isSubmitting ? <ButtonLoader /> : 'Entrar'}
      </ButtonPrimary>
    </LoginForm>
  );
};

export default Login;
