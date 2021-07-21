import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Formik } from 'formik';
import * as Yup from 'yup';

import AuthContext from 'src/providers/AuthContext';

import getFormikChangedValues from 'src/helpers/getFormikChangedValues';

import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonsRowContainer,
} from 'src/styled/Buttons';
import { ButtonLoader } from 'src/styled/Loaders';
import { FormContainer } from 'src/styled/Blocks';

import { getProfilePicture, updateUser } from 'src/services/user.service';

import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { User } from 'src/models/User.model';

import InputField from 'src/components/InputField';
import ProfileImageUpload from 'src/pages/ProfileConfig/EditProfile/ProfileImageUpload';

interface Props {}

const EditProfile: React.FC<Props> = () => {
  const history = useHistory();

  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);

  const [updateUserResponse, setUpdateUserResponse] = useState(
    {} as ServiceResponse<User>,
  );

  const initialValues = {
    name: authenticatedUser?.user.name,
    email: authenticatedUser?.user.email,
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Seu nome é muito curto.'),
    email: Yup.string().email('Endereço de e-mail inválido.'),
    password: Yup.string().min(5, 'Sua senha é muito curta.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'As senhas devem ser iguais!')
      .when(['password'], {
        is: (value: any) => Boolean(value),
        then: Yup.string().required('Preencher este campo!'),
      }),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        const changedValues = getFormikChangedValues(values, initialValues, [
          'confirmPassword',
        ]);

        if (authenticatedUser) {
          const serviceResponse = await updateUser(
            authenticatedUser,
            changedValues,
          );

          setUpdateUserResponse(serviceResponse);

          if (!serviceResponse.errorResponse && serviceResponse.data) {
            setAuthenticatedUser({
              user: serviceResponse.data,
              token: authenticatedUser.token,
            });

            actions.resetForm();
          }
        }

        actions.setSubmitting(false);
      }}
    >
      {(formik) => (
        <FormContainer autoComplete="off" onSubmit={formik.handleSubmit}>
          {updateUserResponse.errorResponse && !formik.isValidating ? (
            <div>{updateUserResponse.errorResponse.message}</div>
          ) : null}

          <ProfileImageUpload
            initialImage={getProfilePicture(authenticatedUser)}
          />

          <InputField
            fullWidth
            label="Nome"
            name="name"
            placeholder="Digite aqui seu nome"
          />

          <InputField
            fullWidth
            label={`E-mail ${
              authenticatedUser?.user.isEmailValidated
                ? '(Verificado)'
                : '(Não verificado)'
            } `}
            name="email"
            placeholder="Digite aqui seu email"
          />

          <InputField
            fullWidth
            label="Nova Senha"
            name="password"
            placeholder="Digite aqui sua nova senha"
            type="password"
          />

          <InputField
            fullWidth
            label="Confirmação de Senha"
            name="confirmPassword"
            placeholder="Confirme aqui a senha digitada"
            type="password"
          />

          <ButtonsRowContainer>
            <ButtonPrimary
              type="submit"
              disabled={!(formik.isValid && formik.dirty) ? true : undefined}
            >
              {formik.isSubmitting ? <ButtonLoader /> : 'Salvar Alterações'}
            </ButtonPrimary>

            <ButtonSecondary onClick={() => history.push('/profile')}>
              Voltar
            </ButtonSecondary>
          </ButtonsRowContainer>
        </FormContainer>
      )}
    </Formik>
  );
};

export default EditProfile;
