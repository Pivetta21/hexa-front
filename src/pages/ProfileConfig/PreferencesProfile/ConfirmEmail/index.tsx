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

import { DefaultInput, DefaultInputError } from 'src/styled/Inputs';

interface Props {}

const ConfirmEmail: React.FC<Props> = () => {
  const [emailConfirmation, setEmailConfirmation] = useState(
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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      if (authenticatedUser) {
        const serviceResponse = await confirmEmail(
          authenticatedUser?.user,
          Number(values.code),
        );

        setEmailConfirmation(serviceResponse);

        console.log(emailConfirmation);
      }

      actions.setSubmitting(false);
    },
  });

  const { authenticatedUser } = useContext(AuthContext);

  const confirmEmailRef = useRef(null);

  const [isConfirmEmail, setIsConfirmEmail] = useOutsideClick(
    confirmEmailRef,
    false,
  );

  async function sendEmailConfirmation() {
    if (authenticatedUser) {
      await getEmailConfirmation(authenticatedUser.user.email);
    }

    setIsConfirmEmail(true);
  }

  async function handleConfirmEmail() {
    console.log('Confirmando email...');
    setIsConfirmEmail(false);
  }

  return (
    <Fragment>
      <InlineOption className="w-100">
        <div>Deseja confirmar seu e-mail?</div>
        <ButtonPrimary onClick={() => sendEmailConfirmation()}>
          Confirmar
        </ButtonPrimary>
      </InlineOption>

      {isConfirmEmail && (
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
                    onClick={() => handleConfirmEmail()}
                  >
                    Confirmar
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
