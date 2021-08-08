import { useState } from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { useHistory } from 'react-router-dom';

import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonsRowContainer,
} from 'src/styled/Buttons';

import { FormContainer } from 'src/styled/Blocks';
import { ServiceError } from 'src/styled/Inputs';

import InputField from 'src/components/InputField';

import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { ModuleI } from 'src/models/Module.model';
import { ButtonLoader } from 'src/styled/Loaders';

import { createModule } from 'src/services/module.service';
import { useContext } from 'react';
import AuthContext from 'src/providers/AuthContext';
import CourseDashboardContext from 'src/providers/CourseDashboardContext';

const CreateModule: React.FC = () => {
  const history = useHistory();

  const { authenticatedUser } = useContext(AuthContext);
  const { course } = useContext(CourseDashboardContext);

  const [createModuleRes, setCreateModuleRes] = useState(
    {} as ServiceResponse<ModuleI>,
  );

  const initialValues = {
    name: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(5, 'O nome do módulo deve ser maior.')
      .max(54, 'O nome do módulo deve ser menor.')
      .required('Esse campo é obrigatório!'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        const access_token = authenticatedUser!.token!;

        const serviceResponse = await createModule(
          { course: course, name: values.name },
          access_token,
        );

        if (!serviceResponse.errorResponse && serviceResponse.data) {
          setCreateModuleRes(serviceResponse);
          actions.resetForm();
        }

        actions.setSubmitting(false);
      }}
    >
      {(formik) => (
        <FormContainer autoComplete="off" onSubmit={formik.handleSubmit}>
          {createModuleRes.errorResponse && !formik.isValidating ? (
            <ServiceError>{createModuleRes.errorResponse.message}</ServiceError>
          ) : null}

          <InputField
            fullWidth
            label="Nome"
            name="name"
            placeholder="Digite aqui o nome do módulo"
          />

          <ButtonsRowContainer>
            <ButtonPrimary
              type="submit"
              disabled={!(formik.isValid && formik.dirty) ? true : undefined}
            >
              {formik.isSubmitting ? <ButtonLoader /> : 'Criar Módulo'}
            </ButtonPrimary>

            <ButtonSecondary
              type="button"
              onClick={() => history.push('/dashboard')}
            >
              Voltar
            </ButtonSecondary>
          </ButtonsRowContainer>
        </FormContainer>
      )}
    </Formik>
  );
};

export default CreateModule;
