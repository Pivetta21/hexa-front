import { useContext, useState } from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';

import CourseDashboardContext from 'src/providers/CourseDashboardContext';
import { FormContainer } from 'src/styled/Blocks';
import { InputRow, ServiceError } from 'src/styled/Inputs';
import AuthContext from 'src/providers/AuthContext';
import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { Course } from 'src/models/Course.model';
import getFormikChangedValues from 'src/helpers/getFormikChangedValues';
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonsRowContainer,
} from 'src/styled/Buttons';

import { ButtonLoader } from 'src/styled/Loaders';

import SelectField from 'src/components/InputField/SelectField';
import InputField from 'src/components/InputField';
import { useHistory } from 'react-router-dom';
import { getImagePicture, updateCourse } from 'src/services/course.service';
import EditCourseImage from './EditCourseImage';

interface Props {}

const EditCourseGeneral: React.FC<Props> = () => {
  const history = useHistory();

  const [editCourseResponse, setEditCourseResponse] = useState(
    {} as ServiceResponse<Course>,
  );

  const { authenticatedUser } = useContext(AuthContext);
  const { course, setCourse } = useContext(CourseDashboardContext);

  const visibilityOption = [
    { value: true, label: 'Listado' },
    { value: false, label: 'Não Listado' },
  ];

  const initialValues = {
    name: course.name,
    description: course.description,
    isPublic: course.isPublic,
    price: course.price,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(5, 'O nome do canal deve ser maior.')
      .max(54, 'O nome do canal deve ser menor.'),
    description: Yup.string(),
    isPublic: Yup.boolean(),
    price: Yup.number()
      .typeError('Digite um número.')
      .min(0, 'Apenas preço positivo.'),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        const changedValues = getFormikChangedValues(values, initialValues);

        if (authenticatedUser && authenticatedUser.token) {
          const serviceResponse = await updateCourse(
            course.id,
            changedValues,
            authenticatedUser.token,
          );

          setEditCourseResponse(serviceResponse);

          if (!serviceResponse.errorResponse && serviceResponse.data) {
            setCourse(serviceResponse.data);
            actions.resetForm();
          }
        }

        actions.setSubmitting(false);
      }}
    >
      {(formik) => (
        <FormContainer autoComplete="off" onSubmit={formik.handleSubmit}>
          {editCourseResponse.errorResponse && !formik.isValidating ? (
            <ServiceError>
              {editCourseResponse.errorResponse.message}
            </ServiceError>
          ) : null}

          <EditCourseImage initialImage={getImagePicture(course)} />

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

          <InputRow className="reset-margin">
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
              disabled={!(formik.isValid && formik.dirty) ? true : undefined}
            >
              {formik.isSubmitting ? <ButtonLoader /> : 'Editar Curso'}
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

export default EditCourseGeneral;
