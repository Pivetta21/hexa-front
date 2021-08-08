import { useContext, useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { ModuleI } from 'src/models/Module.model';
import { ServiceResponse } from 'src/models/ServiceResponse.model';

import AuthContext from 'src/providers/AuthContext';
import CourseDashboardContext from 'src/providers/CourseDashboardContext';

import {
  findModulesByCourseId,
  updateModule,
} from 'src/services/module.service';

import { FormContainer } from 'src/styled/Blocks';

import {
  DefaultInput,
  DefaultSelect,
  OutlineInputError,
  ServiceError,
} from 'src/styled/Inputs';

import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonsRowContainer,
} from 'src/styled/Buttons';

import { ButtonLoader } from 'src/styled/Loaders';
import DeleteModule from '../DeleteModule';

const EditModule: React.FC = () => {
  const history = useHistory();

  const [moduleIndex, setModuleIndex] = useState(-1);
  const [modules, setModules] = useState([] as ModuleI[]);
  const [editModuleRes, setEditModuleRes] = useState(
    {} as ServiceResponse<ModuleI>,
  );

  const { authenticatedUser } = useContext(AuthContext);
  const { course } = useContext(CourseDashboardContext);

  function handleModuleChange(e: any) {
    setModuleIndex(e.target.value);
    formik.resetForm();
  }

  async function fetchModules() {
    const serviceResponse = await findModulesByCourseId(course.id);

    if (!serviceResponse.errorResponse && serviceResponse.data) {
      setModules(serviceResponse.data);
    }
  }

  useEffect(() => {
    fetchModules();

    return () => {
      setModules([] as ModuleI[]);
      setModuleIndex(-1);
    };
  }, []);

  const initialValues = {
    name: modules[moduleIndex] ? modules[moduleIndex].name : '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(5, 'O nome do módulo deve ser maior.')
      .max(54, 'O nome do módulo deve ser menor.')
      .required('Esse campo é obrigatório!'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      const serviceResponse = await updateModule(
        modules[moduleIndex].id,
        { name: values.name },
        authenticatedUser!.token!,
      );

      setEditModuleRes(serviceResponse);

      if (!serviceResponse.errorResponse && serviceResponse.data) {
        modules[moduleIndex] = serviceResponse.data;

        setModules(modules);
        actions.resetForm();
      }

      actions.setSubmitting(false);
    },
  });

  return (
    <FormContainer autoComplete="off" onSubmit={formik.handleSubmit}>
      {editModuleRes.errorResponse && !formik.isValidating ? (
        <ServiceError>{editModuleRes.errorResponse.message}</ServiceError>
      ) : null}

      <DefaultSelect>
        <label htmlFor="modOption">Módulo</label>
        <select name="modOption" onChange={(e) => handleModuleChange(e)}>
          <option value="-1" selected>
            Selecione um módulo
          </option>
          {modules.map((module, index) => (
            <option key={module.id} value={index}>
              {index + 1}. {module.name}
            </option>
          ))}
        </select>
      </DefaultSelect>

      {moduleIndex >= 0 && (
        <Fragment>
          <DefaultInput>
            <label htmlFor="name">Editar Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Digite aqui o nome do módulo"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </DefaultInput>

          {formik.touched.name && formik.errors.name ? (
            <OutlineInputError>{formik.errors.name}</OutlineInputError>
          ) : null}

          <DeleteModule
            module={modules[moduleIndex]}
            modules={modules}
            setModules={setModules}
          />
        </Fragment>
      )}

      <ButtonsRowContainer>
        <ButtonPrimary
          type="submit"
          disabled={!(formik.isValid && formik.dirty) ? true : undefined}
        >
          {formik.isSubmitting ? <ButtonLoader /> : 'Salvar Alterações'}
        </ButtonPrimary>

        <ButtonSecondary
          type="button"
          onClick={() => history.push('/dashboard')}
        >
          Voltar
        </ButtonSecondary>
      </ButtonsRowContainer>
    </FormContainer>
  );
};

export default EditModule;
