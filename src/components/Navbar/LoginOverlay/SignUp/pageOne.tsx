import { Fragment } from 'react';

import { OutlineInput, OutlineInputError } from 'src/styled/Inputs';

interface Props {
  formik: any;
}

export const SignUpPageOne: React.FC<Props> = ({ formik }) => {
  return (
    <Fragment>
      <OutlineInput>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Digite aqui seu nome"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.name}
        />
      </OutlineInput>
      {formik.touched.name && formik.errors.name ? (
        <OutlineInputError>{formik.errors.name}</OutlineInputError>
      ) : null}

      <OutlineInput>
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Digite aqui seu e-mail"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </OutlineInput>
      {formik.touched.email && formik.errors.email ? (
        <OutlineInputError>{formik.errors.email}</OutlineInputError>
      ) : null}

      <OutlineInput>
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Digite aqui sua senha"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </OutlineInput>
      {formik.touched.password && formik.errors.password ? (
        <OutlineInputError>{formik.errors.password}</OutlineInputError>
      ) : null}

      <OutlineInput>
        <label htmlFor="confirmPassword">Confirmação de senha</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Digite novamente aqui sua senha"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
        />
      </OutlineInput>
      {formik.touched.password && formik.errors.confirmPassword ? (
        <OutlineInputError>{formik.errors.confirmPassword}</OutlineInputError>
      ) : null}
    </Fragment>
  );
};
