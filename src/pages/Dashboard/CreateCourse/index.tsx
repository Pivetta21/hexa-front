import { Formik } from 'formik';
import * as Yup from 'yup';

import { FormContainer, Section } from 'src/styled/Blocks';
import { Header, HeaderCaption } from 'src/styled/Texts';
import { InputRow, ServiceError } from 'src/styled/Inputs';
import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from 'src/providers/AuthContext';
import { ServiceResponse } from 'src/models/ServiceResponse.model';
import InputField from 'src/components/InputField';
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonsRowContainer,
} from 'src/styled/Buttons';
import { ButtonLoader } from 'src/styled/Loaders';

import SelectField from 'src/components/InputField/SelectField';

interface Props {}

const CreateCourse: React.FC<Props> = () => {
  const history = useHistory();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { authenticatedUser } = useContext(AuthContext);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [createCourseRes, setCreateCourseRes] = useState(
    {} as ServiceResponse<any>,
  );

  const visibilityOption = [
    { value: true, label: 'Listado' },
    { value: false, label: 'Não Listado' },
  ];

  const initialValues = {
    name: '',
    description: '',
    isPublic: false,
    price: 0.0,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(5, 'O nome do canal deve ser maior.')
      .max(64, 'O nome do canal deve ser menor.')
      .required('Esse campo é obrigatório!'),
    description: Yup.string().optional(),
    isPublic: Yup.boolean().required('Esse campo é obrigatório!'),
    price: Yup.number()
      .typeError('Digite um número.')
      .min(0, 'Apenas preço positivo.')
      .required('Esse campo é obrigatório!'),
  });

  return (
    <div className="main-padding">
      <Section>
        <Header>Criar Curso</Header>
        <HeaderCaption>
          Pense em um bom nome e uma boa descrição para o seu curso.
        </HeaderCaption>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            console.log(values);

            actions.setSubmitting(false);
          }}
        >
          {(formik) => (
            <FormContainer autoComplete="off" onSubmit={formik.handleSubmit}>
              {createCourseRes.errorResponse && !formik.isValidating ? (
                <ServiceError>
                  {createCourseRes.errorResponse.message}
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

              <InputRow>
                <InputField
                  label="Preço (R$)"
                  name="price"
                  type="number"
                  placeholder="Digite aqui o preço"
                />

                <SelectField
                  label="Visibilidade"
                  name="isPublic"
                  options={visibilityOption}
                />
              </InputRow>

              <ButtonsRowContainer>
                <ButtonPrimary
                  type="submit"
                  disabled={
                    !(formik.isValid && formik.dirty) ? true : undefined
                  }
                >
                  {formik.isSubmitting ? <ButtonLoader /> : 'Criar Canal'}
                </ButtonPrimary>

                <ButtonSecondary onClick={() => history.push('/dashboard')}>
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

export default CreateCourse;
