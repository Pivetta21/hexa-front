import { Fragment, useContext, useEffect, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { ReactComponent as Subtract } from 'src/assets/svg/icons/Subtract.svg';

import AuthContext from 'src/providers/AuthContext';

import { VideoComment } from 'src/models/VideoComment.model';

import { getProfilePicture } from 'src/services/user.service';
import {
  createVideoComments,
  deleteComment,
  findVideoComments,
} from 'src/services/videoComments';
import { DefaultInput, DefaultInputError } from 'src/styled/Inputs';

import {
  VideoCommentBlock,
  VideoCommentForm,
  VideoCommentsContainer,
  VideoCommentsList,
} from './styles';
import formatDate from 'src/helpers/formatDate';

interface Props {
  videoId: number;
}

const VideoComments: React.FC<Props> = ({ videoId }) => {
  const { authenticatedUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([] as VideoComment[]);

  async function handleRemoveComment(commentId: number) {
    const serviceResponse = await deleteComment(
      commentId,
      authenticatedUser!.token!,
    );

    if (!serviceResponse.errorResponse) {
      document.getElementById(`comment${commentId}`)?.classList.add('hide');
    }
  }

  function renderComments(): JSX.Element[] {
    const elements = [];

    for (let i = comments.length - 1; i >= 0; i--) {
      const comment = comments[i];

      elements.push(
        <VideoCommentsList key={comment.id} id={`comment${comment.id}`}>
          <img src={getProfilePicture(comment.user)} />

          <VideoCommentBlock>
            <div>
              <h1>
                {comment.user?.name}
                <span>
                  Publicado em {formatDate('pt-br', comment.published_at)}
                </span>
              </h1>
              {comment.user?.id == authenticatedUser?.user.id ? (
                <div className="delete" title="Deseja excluir seu comentário?">
                  <Subtract onClick={() => handleRemoveComment(comment.id)} />
                </div>
              ) : undefined}
            </div>
            <p>{comment.text}</p>
          </VideoCommentBlock>
        </VideoCommentsList>,
      );
    }

    return elements;
  }

  async function fetchComments() {
    const { errorResponse, data } = await findVideoComments(videoId);

    if (!errorResponse && data) {
      setComments(data);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    formik.resetForm();

    setTimeout(() => {
      fetchComments();
    }, 400);

    return () => {
      setIsLoading(true);
      setComments([] as VideoComment[]);
    };
  }, [videoId]);

  const initialValues = {
    text: '',
  };

  const validationSchema = Yup.object({
    text: Yup.string()
      .min(3, 'Seu comentário deve ser maior.')
      .max(240, 'O seu comentário deve ser menor.')
      .required('É necessário um texto para comentar!'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      const { errorResponse, data } = await createVideoComments(
        {
          text: values.text,
          userId: authenticatedUser!.user.id,
          videoId: videoId,
        },
        authenticatedUser!.token!,
      );

      if (!errorResponse && data) {
        data.user = authenticatedUser?.user;
        comments.push(data);
        setComments(comments);
      }

      actions.setSubmitting(false);

      if (formik.isValid && formik.dirty) {
        actions.resetForm();
      }
    },
  });

  return (
    <VideoCommentsContainer>
      <VideoCommentForm autoComplete="off" onSubmit={formik.handleSubmit}>
        <img src={getProfilePicture(authenticatedUser?.user)} />

        <DefaultInput>
          <textarea
            id="text"
            name="text"
            placeholder="Adicione um comentário público..."
            onChange={formik.handleChange}
            value={formik.values.text}
          />
          <p className="reset" onClick={() => formik.resetForm()}>
            Cancelar
          </p>
          <p className="send" onClick={() => formik.submitForm()}>
            Enviar
          </p>
        </DefaultInput>
      </VideoCommentForm>

      {formik.touched.text && formik.errors.text ? (
        <DefaultInputError style={{ marginTop: '-8px', marginBottom: '32px' }}>
          {formik.errors.text}
        </DefaultInputError>
      ) : null}

      {!isLoading && comments.length > 0 && (
        <Fragment>{renderComments()}</Fragment>
      )}
    </VideoCommentsContainer>
  );
};

export default VideoComments;
