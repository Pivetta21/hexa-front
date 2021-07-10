import { FormEvent, Fragment, useContext } from 'react';

import { FormContainer, OutlineInput } from 'src/styled/Inputs';
import { ButtonPrimary } from 'src/styled/Buttons';
import AuthContext from 'src/providers/AuthContext';
import { useState } from 'react';

interface Props {}

const Login: React.FC<Props> = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    login(email, password);
  }

  return (
    <Fragment>
      <FormContainer autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
        <OutlineInput>
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            id="email"
            placeholder="Digite aqui seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </OutlineInput>

        <OutlineInput>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="Digite aqui sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </OutlineInput>

        <p>Problemas para entrar?</p>

        <ButtonPrimary type="submit">Entrar</ButtonPrimary>
      </FormContainer>
    </Fragment>
  );
};

export default Login;
