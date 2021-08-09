import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Fragment, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ModuleI } from 'src/models/Module.model';
import CourseDashboardContext from 'src/providers/CourseDashboardContext';
import { findModulesByCourseId } from 'src/services/module.service';
import { createVideo } from 'src/services/video.service';
import {
  DefaultInput,
  DefaultSelect,
  OutlineInputError,
  ServiceError,
} from 'src/styled/Inputs';
import { FormContainer } from 'src/styled/Blocks';
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonsRowContainer,
  OutlineButton,
} from 'src/styled/Buttons';
import { ButtonLoader } from 'src/styled/Loaders';
import { useRef } from 'react';
import {
  isFileVideo,
  isFileVideoAccepted,
  uploadVideo,
} from 'src/services/storage.service';
import AuthContext from 'src/providers/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

interface Props {}

const CreateVideo: React.FC<Props> = () => {
  const history = useHistory();

  const videoFileRef = useRef({} as HTMLInputElement);

  const [modules, setModules] = useState([] as ModuleI[]);
  const [moduleId, setModuleId] = useState(-1);

  const [createVideoError, setCreateVideoError] = useState('');
  const [uploadVideoError, setUploadVideoError] = useState('');

  const { authenticatedUser } = useContext(AuthContext);
  const { course } = useContext(CourseDashboardContext);

  const { channel } = useSelector((state: RootState) => state.channel);

  function handleVideoChange() {
    videoFileRef.current.click();
  }

  function handleModuleChange(e: any) {
    setModuleId(e.target.value);
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
    };
  }, []);

  const initialValues = {
    name: '',
    description: '',
    video_url: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(5, 'O nome do vídeo deve ser maior.')
      .max(54, 'O nome do vídeo deve ser menor.')
      .required('Esse campo é obrigatório!'),
    description: Yup.string().optional(),
    video_url: Yup.string().required('Esse campo é obrigatório!'),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);

      const inputFiles = videoFileRef.current.files;

      if (inputFiles) {
        const file = inputFiles[0];

        if (isFileVideo(file) && isFileVideoAccepted(file)) {
          const token = authenticatedUser!.token!;

          const uploadResponse = await uploadVideo(
            token,
            { channelId: channel.id, courseId: course.id },
            file,
          );

          if (!uploadResponse.errorResponse && uploadResponse.data) {
            const newVideo = {
              ...values,
              video_url: uploadResponse.data.filename,
              module: { id: moduleId } as ModuleI,
            };

            const { errorResponse } = await createVideo(newVideo, token);

            if (errorResponse) {
              setCreateVideoError(errorResponse.message);
            } else {
              setCreateVideoError('');
              setUploadVideoError('');
              actions.resetForm();
            }
          } else {
            setUploadVideoError('Não foi possível fazer upload!');
          }
        } else {
          setUploadVideoError('Arquivo possui um formato inválido!');
        }
      }

      actions.setSubmitting(false);
    },
  });

  return (
    <FormContainer autoComplete="off" onSubmit={formik.handleSubmit}>
      {createVideoError.length > 0 && !formik.isValidating ? (
        <ServiceError style={{ marginTop: '0px' }}>
          {createVideoError}
        </ServiceError>
      ) : null}

      <DefaultSelect>
        <label htmlFor="modOption">Módulo</label>
        <select name="modOption" onChange={(e) => handleModuleChange(e)}>
          <option value="-1" selected>
            Selecione um módulo
          </option>
          {modules.map((module, index) => (
            <option key={module.id} value={module.id}>
              {index + 1}. {module.name}
            </option>
          ))}
        </select>
      </DefaultSelect>

      {moduleId > 0 && (
        <Fragment>
          <DefaultInput>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Digite aqui o nome do vídeo"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </DefaultInput>
          {formik.touched.name && formik.errors.name ? (
            <OutlineInputError>{formik.errors.name}</OutlineInputError>
          ) : null}

          <DefaultInput>
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              name="description"
              placeholder="Digite aqui a descrição do vídeo"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </DefaultInput>
          {formik.touched.description && formik.errors.description ? (
            <OutlineInputError>{formik.errors.description}</OutlineInputError>
          ) : null}

          <input
            type="file"
            name="video_url"
            id="video_url"
            ref={videoFileRef}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.video_url}
            hidden
          />
          <OutlineButton
            className="w-100"
            type="button"
            onClick={() => handleVideoChange()}
          >
            {formik.values.video_url.length > 0
              ? formik.values.video_url.replace(/^.*[\\/]/, '')
              : 'Fazer Upload do Vídeo'}
          </OutlineButton>
          {formik.touched.video_url && uploadVideoError.length > 0 ? (
            <OutlineInputError style={{ marginTop: '8px' }}>
              {uploadVideoError}
            </OutlineInputError>
          ) : null}

          <ButtonsRowContainer>
            <ButtonPrimary
              type="submit"
              disabled={!(formik.isValid && formik.dirty) ? true : undefined}
            >
              {formik.isSubmitting ? <ButtonLoader /> : 'Criar Vídeo'}
            </ButtonPrimary>

            <ButtonSecondary
              type="button"
              onClick={() => history.push('/dashboard')}
            >
              Voltar
            </ButtonSecondary>
          </ButtonsRowContainer>
        </Fragment>
      )}
    </FormContainer>
  );
};

export default CreateVideo;
