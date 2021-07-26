import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { Formik } from 'formik';
import * as Yup from 'yup';

import getFormikChangedValues from 'src/helpers/getFormikChangedValues';

import { RootState } from 'src/redux/store';
import { setChannel } from 'src/redux/channelSlice';

import AuthContext from 'src/providers/AuthContext';

import { getBannerPicture, updateChannel } from 'src/services/channel.service';

import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { ChannelI } from 'src/models/Channel.model';

import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonsRowContainer,
} from 'src/styled/Buttons';
import { Header, HeaderCaption } from 'src/styled/Texts';
import { FormContainer, Section } from 'src/styled/Blocks';
import { ButtonLoader } from 'src/styled/Loaders';
import { ServiceError } from 'src/styled/Inputs';

import InputField from 'src/components/InputField';

import EditChannelBanner from './EditChannelBanner';
import DeleteChannel from './DeleteChannel';

const EditChannel: React.FC = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { channel } = useSelector((state: RootState) => state.channel);

  const { authenticatedUser } = useContext(AuthContext);

  const [updateChannelResponse, setUpdateChannelResponse] = useState(
    {} as ServiceResponse<ChannelI>,
  );

  const initialValues = {
    name: channel.name,
    description: channel.description,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(5, 'O nome do canal deve ser maior.')
      .max(64, 'O nome do canal deve ser menor.'),
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
                dispatch(setChannel(serviceResponse.data));

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
