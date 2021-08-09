/* eslint-disable @typescript-eslint/no-unused-vars */
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ModuleI } from 'src/models/Module.model';
import { VideoI } from 'src/models/Video.model';
import CourseDashboardContext from 'src/providers/CourseDashboardContext';
import { findModulesByCourseId } from 'src/services/module.service';
import { findVideosByModuleId, updateVideo } from 'src/services/video.service';
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
import getFormikChangedValues from 'src/helpers/getFormikChangedValues';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import AuthContext from 'src/providers/AuthContext';
import {
  deleteVideo,
  isFileVideo,
  isFileVideoAccepted,
  uploadVideo,
} from 'src/services/storage.service';
import { ServiceResponse } from 'src/models/ServiceResponse.model';
import DeleteVideo from '../DeleteVideo';

interface Props {}

const EditVideo: React.FC<Props> = () => {
  const history = useHistory();

  const { channel } = useSelector((state: RootState) => state.channel);

  const [modules, setModules] = useState([] as ModuleI[]);
  const [moduleId, setModuleId] = useState(-1);

  const [videos, setVideos] = useState([] as VideoI[]);
  const [videoIndex, setVideoIndex] = useState(-1);

  const videoFileRef = useRef({} as HTMLInputElement);

  const [editVideoRes, setEditVideoRes] = useState(
    {} as ServiceResponse<VideoI>,
  );
  const [uploadVideoError, setUploadVideoError] = useState('');

  const { authenticatedUser } = useContext(AuthContext);
  const { course } = useContext(CourseDashboardContext);

  function handleFileChange() {
    videoFileRef.current.click();
  }

  function handleVideoChange(e: any) {
    setVideoIndex(e.target.value);
    formik.resetForm();
  }

  function handleModuleChange(e: any) {
    setModuleId(e.target.value);
    fetchVideosByModuleId(e.target.value);
  }

  async function fetchVideosByModuleId(moduleId: number) {
    const serviceResponse = await findVideosByModuleId(moduleId);

    if (!serviceResponse.errorResponse && serviceResponse.data) {
      setVideos(serviceResponse.data);
    } else {
      setVideos([] as VideoI[]);
    }
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
      setVideos([] as VideoI[]);
      setVideoIndex(-1);
    };
  }, []);

  const initialValues = {
    name: videos[videoIndex] ? videos[videoIndex].name : '',
    description:
      videos[videoIndex] && videos[videoIndex].description
        ? videos[videoIndex].description
        : '',
    video_url: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(5, 'O nome do módulo deve ser maior.')
      .max(54, 'O nome do módulo deve ser menor.'),
    description: Yup.string().optional(),
    video_url: Yup.string().optional(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);

      let video_url = '';
      const token = authenticatedUser!.token!;
      const inputFiles = videoFileRef.current.files;

      const changedValues = getFormikChangedValues(values, initialValues);

      if ('video_url' in changedValues && inputFiles) {
        const file = inputFiles[0];

        if (isFileVideo(file) && isFileVideoAccepted(file)) {
          await deleteVideo(
            token,
            { moduleId: moduleId, videoId: videos[videoIndex].id },
            videos[videoIndex].video_url,
          );

          const uploadResponse = await uploadVideo(
            token,
            { channelId: channel.id, courseId: course.id },
            file,
          );

          if (!uploadResponse.errorResponse && uploadResponse.data) {
            video_url = uploadResponse.data.filename;
            videos[videoIndex].video_url = video_url;

            setUploadVideoError('');
            actions.resetForm();
          } else {
            delete changedValues.video_url;
            setUploadVideoError('Não foi possível fazer upload!');
          }
        } else {
          delete changedValues.video_url;
          setUploadVideoError('Arquivo possui um formato inválido!');
        }
      }

      const newVideo = {
        ...changedValues,
      };

      if (video_url.length > 0) {
        newVideo.video_url = video_url;
      }

      const serviceResponse = await updateVideo(
        videos[videoIndex].id,
        newVideo,
        token,
      );

      setEditVideoRes(serviceResponse);

      if (!serviceResponse.errorResponse && serviceResponse.data) {
        videos[videoIndex] = serviceResponse.data;
      }

      actions.setSubmitting(false);
    },
  });

  return (
    <div>
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

      {videos.length > 0 && (
        <DefaultSelect>
          <label htmlFor="videoOption">Vídeo</label>
          <select name="videoOption" onChange={(e) => handleVideoChange(e)}>
            <option value="-1" selected disabled hidden>
              Selecione um vídeo
            </option>
            {videos.map((video, index) => (
              <option key={video.id} value={index}>
                {index + 1}. {video.name}
              </option>
            ))}
          </select>
        </DefaultSelect>
      )}

      {videoIndex >= 0 && (
        <FormContainer autoComplete="off" onSubmit={formik.handleSubmit}>
          {editVideoRes.errorResponse && !formik.isValidating ? (
            <ServiceError>{editVideoRes.errorResponse.message}</ServiceError>
          ) : null}

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
            onClick={() => handleFileChange()}
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

          <DeleteVideo
            video={videos[videoIndex]}
            videos={videos}
            setVideos={setVideos}
            setVideoIndex={setVideoIndex}
          />

          <ButtonsRowContainer>
            <ButtonPrimary
              type="submit"
              disabled={!(formik.isValid && formik.dirty) ? true : undefined}
            >
              {formik.isSubmitting ? <ButtonLoader /> : 'Editar Vídeo'}
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
    </div>
  );
};

export default EditVideo;
