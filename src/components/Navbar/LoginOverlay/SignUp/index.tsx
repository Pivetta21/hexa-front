import { Fragment, useState } from 'react';

import { createUser } from 'src/services/user.service';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  OutlineInput,
  FormContainer,
  InputError,
  FormError,
} from 'src/styled/Inputs';
import { ButtonPrimary } from 'src/styled/Buttons';
import { ButtonLoader } from 'src/styled/Loaders';
import { useContext } from 'react';
import AuthContext from 'src/providers/AuthContext';
import { AuthenticatedUser } from 'src/models/AuthenticatedUser.model';

import { User } from 'src/models/User.model';
import { ServiceResponse } from 'src/models/ServiceResponse.model';

interface Props {}

const SignUp: React.FC<Props> = () => {
  const { login } = useContext(AuthContext);

  const [createUserResponse, setCreateUserResponse] = useState(
    {} as ServiceResponse<User>,
  );

  const [loginResponse, setLoginResponse] = useState(
    {} as ServiceResponse<AuthenticatedUser>,
  );

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Seu nome é muito curto.')
      .required('Esse campo é obrigatório!'),
    email: Yup.string()
      .email('Endereço de e-mail inválido.')
      .required('Esse campo é obrigatório!'),
    password: Yup.string()
      .min(5, 'Sua senha é muito curta.')
      .required('Esse campo é obrigatório!'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'As senhas devem ser iguais!')
      .required('Esse campo é obrigatório!'),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const { name, email, password } = values;

      const serviceResponse = await createUser(name, email, password);

      setCreateUserResponse(serviceResponse);

      if (!serviceResponse.errorResponse) {
        const loginResponse = await login(email, password);
        setLoginResponse(loginResponse);
      }

      setSubmitting(false);
    },
  });

  return (
    <Fragment>
      <FormContainer autoComplete="off" onSubmit={formik.handleSubmit}>
        {createUserResponse.errorResponse && !formik.isValidating ? (
          <FormError>{createUserResponse.errorResponse.message}</FormError>
        ) : null}

        {loginResponse.errorResponse && !formik.isValidating ? (
          <FormError>{loginResponse.errorResponse.message}</FormError>
        ) : null}

        <OutlineInput>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Digite aqui seu nome"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </OutlineInput>

        {formik.touched.name && formik.errors.name ? (
          <InputError>{formik.errors.name}</InputError>
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

        <OutlineInput>
          <label htmlFor="confirmPassword">Confirmação de senha</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Digite novamente aqui sua senha"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
        </OutlineInput>
        {formik.touched.password && formik.errors.confirmPassword ? (
          <InputError>{formik.errors.confirmPassword}</InputError>
        ) : null}

        <ButtonPrimary
          type="submit"
          disabled={!(formik.isValid && formik.dirty) ? true : undefined}
        >
          {formik.isSubmitting ? <ButtonLoader /> : 'Cadastrar-se'}
        </ButtonPrimary>
      </FormContainer>
    </Fragment>
  );
};

export default SignUp;
