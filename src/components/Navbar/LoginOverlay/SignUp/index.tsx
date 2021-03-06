import { Fragment, useState, useContext } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { SignUpPageOne } from './pageOne';
import { SignUpPageTwo } from './pageTwo';

import { createUser, getEmailConfirmation } from 'src/services/user.service';
import { ServiceResponse } from 'src/models/ServiceResponse.model';

import { User } from 'src/models/User.model';

import {
  ButtonPrimary,
  ButtonsColumnContainer,
  ButtonSecondary,
} from 'src/styled/Buttons';

import AuthContext from 'src/providers/AuthContext';
import { ButtonLoader } from 'src/styled/Loaders';
import { ContainerCaption, ContainerHeader } from 'src/styled/Texts';
import { ServiceError } from 'src/styled/Inputs';
import { FormContainer } from 'src/styled/Blocks';

interface Props {}

const SignUp: React.FC<Props> = () => {
  const { login } = useContext(AuthContext);

  const [step, setStep] = useState(1);
  const [user, setUser] = useState({} as User);

  const [createUserResponse, setCreateUserResponse] = useState(
    {} as ServiceResponse<User>,
  );

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'O nome deve ser maior.')
      .max(64, 'O nome deve ser menor.')
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

      if (!serviceResponse.errorResponse && serviceResponse.data) {
        setUser(serviceResponse.data);
        setStep(2);
      }

      setSubmitting(false);
    },
  });

  function handleConfirmEmail() {
    getEmailConfirmation(formik.values.email);

    setStep(3);
  }

  function handleLogin() {
    login(formik.values.email, formik.values.password);
  }

  return (
    <Fragment>
      {step == 1 && (
        <FormContainer autoComplete="off" onSubmit={formik.handleSubmit}>
          {createUserResponse.errorResponse && !formik.isValidating ? (
            <ServiceError>
              {createUserResponse.errorResponse.message}
            </ServiceError>
          ) : null}

          <SignUpPageOne formik={formik} />

          <ButtonPrimary
            type="submit"
            className="w-100"
            disabled={!(formik.isValid && formik.dirty) ? true : undefined}
          >
            {formik.isSubmitting ? <ButtonLoader /> : 'Cadastrar-se'}
          </ButtonPrimary>
        </FormContainer>
      )}

      {step == 2 && (
        <Fragment>
          <ContainerHeader>Confirmar seu e-mail agora?</ContainerHeader>
          <ContainerCaption>
            Lembrando que você pode confirmar <br /> seu e-mail a qualquer
            momento.
          </ContainerCaption>

          <ButtonsColumnContainer>
            <ButtonPrimary type="button" onClick={() => handleConfirmEmail()}>
              Confirmar Agora
            </ButtonPrimary>

            <ButtonSecondary type="button" onClick={() => handleLogin()}>
              Mais Tarde
            </ButtonSecondary>
          </ButtonsColumnContainer>
        </Fragment>
      )}

      {step == 3 && (
        <SignUpPageTwo user={user} password={formik.values.password} />
      )}
    </Fragment>
  );
};

export default SignUp;
