import { Fragment } from 'react';

import { OutlineInput, FormContainer } from 'src/styled/Inputs';
import { ButtonPrimary } from 'src/styled/Buttons';

interface Props {}

const SignUp: React.FC<Props> = () => {
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

        <OutlineInput>
          <label htmlFor="password">Confirmação de senha</label>
          <input
            type="password"
            id="password"
            placeholder="Digite novamente aqui sua senha"
          />
        </OutlineInput>

        <ButtonPrimary>Cadastrar-se</ButtonPrimary>
      </FormContainer>
    </Fragment>
  );
};

export default SignUp;
