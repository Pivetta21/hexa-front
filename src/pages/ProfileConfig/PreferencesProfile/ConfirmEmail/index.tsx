import { Fragment, useContext, useRef, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import AuthContext from 'src/providers/AuthContext';
import useOutsideClick from 'src/hooks/useOutsideClick';
import { getEmailConfirmation, confirmEmail } from 'src/services/user.service';
import { ServiceResponse } from 'src/models/ServiceResponse.model';

import { ReactComponent as Close } from 'src/assets/svg/icons/Close.svg';

import { FormContainer, InlineOption } from 'src/styled/Blocks';
import { ContainerCaption, ContainerHeader } from 'src/styled/Texts';
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonsRowContainer,
} from 'src/styled/Buttons';
import {
  Overlay,
  OverlayClose,
  OverlayContainer,
  OverlayDiv,
} from 'src/styled/Overlay';

import { DefaultInput, DefaultInputError, FormError } from 'src/styled/Inputs';
import { ButtonLoader } from 'src/styled/Loaders';

interface Props {}

const ConfirmEmail: React.FC<Props> = () => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);

  const confirmEmailRef = useRef(null);
  const [isConfirmEmail, setIsConfirmEmail] = useOutsideClick(
    confirmEmailRef,
    false,
  );

  const [emailConfirmationRes, setEmailConfirmationRes] = useState(
    {} as ServiceResponse<boolean>,
  );

  const initialValues = {
    code: '',
  };

  const validationSchema = Yup.object({
    code: Yup.number()
      .typeError('Digite um número.')
      .required('Esse campo é obrigatório!'),
  });

  async function sendEmailConfirmation() {
    if (authenticatedUser) {
      await getEmailConfirmation(authenticatedUser.user.email);
    }

    setIsConfirmEmail(true);
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      if (authenticatedUser) {
        const serviceResponse = await confirmEmail(
          authenticatedUser?.user,
          Number(values.code),
        );

        setEmailConfirmationRes(serviceResponse);

        if (!serviceResponse.errorResponse && serviceResponse.data) {
          authenticatedUser.user.isEmailValidated = serviceResponse.data;
          console.log(authenticatedUser);
          setAuthenticatedUser(authenticatedUser);

          setIsConfirmEmail(false);
        }
      }

      actions.setSubmitting(false);
    },
  });

  return (
    <Fragment>
      {!authenticatedUser?.user.isEmailValidated && (
        <InlineOption className="w-100">
          <div>Deseja confirmar seu e-mail?</div>
          <ButtonPrimary onClick={() => sendEmailConfirmation()}>
            Confirmar
          </ButtonPrimary>
        </InlineOption>
      )}

      {!authenticatedUser?.user.isEmailValidated && isConfirmEmail && (
        <OverlayContainer>
          <Overlay>
            <OverlayClose>
              <Close />
            </OverlayClose>

            <OverlayDiv ref={confirmEmailRef}>
              <ContainerHeader>Confirmação de E-mail</ContainerHeader>
              <ContainerCaption>
                Enviamos um e-mail para você com o <br />
                código de verificação.
              </ContainerCaption>

              <FormContainer autoComplete="off" onSubmit={formik.handleSubmit}>
                {emailConfirmationRes.errorResponse && !formik.isValidating ? (
                  <FormError>
                    {emailConfirmationRes.errorResponse.message}
                  </FormError>
                ) : null}

                <DefaultInput>
                  <label htmlFor="code">Código de Verificação</label>
                  <input
                    type="text"
                    id="code"
                    name="code"
                    placeholder="Ex.: 5640"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.code}
                  />
                </DefaultInput>
                {formik.touched.code && formik.errors.code ? (
                  <DefaultInputError>{formik.errors.code}</DefaultInputError>
                ) : null}

                <ButtonsRowContainer>
                  <ButtonPrimary
                    type="submit"
                    disabled={
                      !(formik.isValid && formik.dirty) ? true : undefined
                    }
                  >
                    {formik.isSubmitting ? <ButtonLoader /> : 'Confirmar'}
                  </ButtonPrimary>
                  <ButtonSecondary onClick={() => setIsConfirmEmail(false)}>
                    Voltar
                  </ButtonSecondary>
                </ButtonsRowContainer>
              </FormContainer>
            </OverlayDiv>
          </Overlay>
        </OverlayContainer>
      )}
    </Fragment>
  );
};

export default ConfirmEmail;
