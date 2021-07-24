import { useContext, useState } from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';

import ChannelContext from 'src/providers/ChannelContext';

import { getBannerPicture, updateChannel } from 'src/services/channel.service';

import getFormikChangedValues from 'src/helpers/getFormikChangedValues';

import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonsRowContainer,
} from 'src/styled/Buttons';
import { Header, HeaderCaption } from 'src/styled/Texts';
import { FormContainer, Section } from 'src/styled/Blocks';

import InputField from 'src/components/InputField';

import EditChannelBanner from './EditChannelBanner';
import DeleteChannel from './DeleteChannel';
import { ButtonLoader } from 'src/styled/Loaders';
import { useHistory } from 'react-router-dom';
import AuthContext from 'src/providers/AuthContext';
import { ChannelI } from 'src/models/Channel.model';
import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { ServiceError } from 'src/styled/Inputs';

const EditChannel: React.FC = () => {
  const history = useHistory();

  const { authenticatedUser } = useContext(AuthContext);
  const { channel, setChannel } = useContext(ChannelContext);

  const [updateChannelResponse, setUpdateChannelResponse] = useState(
    {} as ServiceResponse<ChannelI>,
  );

  const initialValues = {
    name: channel.name,
    description: channel.description,
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(5, 'Nome do canal é muito curto!'),
    description: Yup.string().optional(),
  });

  return (
    <div className="main-padding">
      <Section>
        <Header>Editar Canal</Header>
        <HeaderCaption>
          Nessa página você pode editar as informações sobre seu canal.
        </HeaderCaption>

        <EditChannelBanner initialImage={getBannerPicture(channel)} />

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            const changedValues = getFormikChangedValues(values, initialValues);

            if (authenticatedUser && authenticatedUser.token) {
              const serviceResponse = await updateChannel(
                authenticatedUser.token,
                channel.id,
                changedValues,
              );

              setUpdateChannelResponse(serviceResponse);

              if (!serviceResponse.errorResponse && serviceResponse.data) {
                setChannel(serviceResponse.data);

                actions.resetForm();
              }
            }

            actions.setSubmitting(false);
          }}
        >
          {(formik) => (
            <FormContainer autoComplete="off" onSubmit={formik.handleSubmit}>
              {updateChannelResponse.errorResponse && !formik.isValidating ? (
                <ServiceError>
                  {updateChannelResponse.errorResponse.message}
                </ServiceError>
              ) : null}

              <InputField
                fullWidth={true}
                label="Nome"
                name="name"
                placeholder="Digite aqui o nome do canal"
              />

              <InputField
                isTextarea={true}
                fullWidth={true}
                label="Descrição"
                name="description"
                placeholder="Digite aqui a descrição do canal..."
              />

              <DeleteChannel />

              <ButtonsRowContainer>
                <ButtonPrimary
                  type="submit"
                  disabled={
                    !(formik.isValid && formik.dirty) ? true : undefined
                  }
                >
                  {formik.isSubmitting ? <ButtonLoader /> : 'Salvar Alterações'}
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

export default EditChannel;
