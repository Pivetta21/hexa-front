import { Fragment } from 'react';

import { FormContainer, OutlineInput } from 'src/styled/Inputs';
import { ButtonPrimary } from 'src/styled/Buttons';

interface Props {}

const Login: React.FC<Props> = () => {
  return (
    <Fragment>
      <FormContainer autoComplete="off">
        <OutlineInput>
          <label htmlFor="email">E-mail</label>
          <input type="text" id="email" placeholder="Digite aqui seu e-mail" />
        </OutlineInput>

        <OutlineInput>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="Digite aqui sua senha"
          />
        </OutlineInput>

        <p>Problemas para entrar?</p>

        <ButtonPrimary>Entrar</ButtonPrimary>
      </FormContainer>
    </Fragment>
  );
};

export default Login;
