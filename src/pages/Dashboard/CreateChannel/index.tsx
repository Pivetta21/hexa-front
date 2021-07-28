import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonsRowContainer,
} from 'src/styled/Buttons';

import InputField from 'src/components/InputField';

import { FormContainer, Section } from 'src/styled/Blocks';
import { Header, HeaderCaption } from 'src/styled/Texts';
import { ButtonLoader } from 'src/styled/Loaders';
import { ServiceError } from 'src/styled/Inputs';

import AuthContext from 'src/providers/AuthContext';

import { createChannel } from 'src/services/channel.service';

import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { ChannelI } from 'src/models/Channel.model';

import { setChannel } from 'src/redux/channelSlice';

interface Props {}

const CreateChannel: React.FC<Props> = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { authenticatedUser } = useContext(AuthContext);

  const [createChannelRes, setCreateChannelRes] = useState(
    {} as ServiceResponse<ChannelI>,
  );

  const initialValues = {
    name: '',
    description: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(5, 'O nome do canal deve ser maior.')
      .max(64, 'O nome do canal deve ser menor.')
      .required('Esse campo é obrigatório!'),
    description: Yup.string().optional(),
  });

  return (
    <div className="main-padding">
      <Section>
        <Header>Criar Canal</Header>
        <HeaderCaption>
          Para criar e publicar cursos/vídeos é necessário que você crie um
          canal.
        </HeaderCaption>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            if (authenticatedUser?.user && authenticatedUser.token) {
              const serviceResponse = await createChannel(
                authenticatedUser.token,
                {
                  user: authenticatedUser.user,
                  ...values,
                },
              );

              setCreateChannelRes(serviceResponse);

              if (!serviceResponse.errorResponse && serviceResponse.data) {
                dispatch(setChannel(serviceResponse.data));
                history.push('/dashboard/edit-channel');
              }
            }

            actions.setSubmitting(false);
          }}
        >
          {(formik) => (
            <FormContainer autoComplete="off" onSubmit={formik.handleSubmit}>
              {createChannelRes.errorResponse && !formik.isValidating ? (
                <ServiceError>
                  {createChannelRes.errorResponse.message}
                </ServiceError>
              ) : null}

              <InputField
                fullWidth
                label="Nome"
                name="name"
                placeholder="Digite aqui o nome do canal"
              />

              <InputField
                fullWidth
                label="Descrição"
                name="description"
                placeholder="Digite aqui a descrição do canal"
                isTextarea={true}
              />

              <ButtonsRowContainer>
                <ButtonPrimary
                  type="submit"
                  disabled={
                    !(formik.isValid && formik.dirty) ? true : undefined
                  }
                >
                  {formik.isSubmitting ? <ButtonLoader /> : 'Criar Canal'}
                </ButtonPrimary>

                <ButtonSecondary
                  type="button"
                  onClick={() => history.push('/')}
                >
                  Voltar
                </ButtonSecondary>
              </ButtonsRowContainer>
            </FormContainer>
          )}
        </Formik>
      </Section>
    </div>
  );
};

export default CreateChannel;
