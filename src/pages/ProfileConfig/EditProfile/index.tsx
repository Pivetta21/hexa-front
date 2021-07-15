import { useContext } from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';

import AuthContext from 'src/providers/AuthContext';

import { ButtonPrimary, ButtonSecondary } from 'src/styled/Buttons';
import { ButtonLoader } from 'src/styled/Loaders';
import { FormButtonsRow, FormContainer } from 'src/styled/Blocks';

import InputField from 'src/components/InputField';
import { useHistory } from 'react-router-dom';

interface Props {}

const EditProfile: React.FC<Props> = () => {
  const history = useHistory();

  const { authenticatedUser } = useContext(AuthContext);

  const initialValues = {
    name: authenticatedUser?.user.name,
    email: authenticatedUser?.user.email,
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
    password: Yup.string().min(5, 'Sua senha é muito curta.'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password')],
      'As senhas devem ser iguais!',
    ),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        console.log(values);

        actions.setSubmitting(false);
      }}
    >
      {(formik) => (
        <FormContainer autoComplete="off" onSubmit={formik.handleSubmit}>
          <InputField
            fullWidth
            label="Nome"
            name="name"
            placeholder="Digite aqui seu nome"
          />

          <InputField
            fullWidth
            label="E-mail"
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

          <FormButtonsRow>
            <ButtonPrimary
              type="submit"
              disabled={!(formik.isValid && formik.dirty) ? true : undefined}
            >
              {formik.isSubmitting ? <ButtonLoader /> : 'Salvar Alterações'}
            </ButtonPrimary>

            <ButtonSecondary onClick={() => history.push('/profile')}>
              Voltar
            </ButtonSecondary>
          </FormButtonsRow>
        </FormContainer>
      )}
    </Formik>
  );
};

export default EditProfile;
