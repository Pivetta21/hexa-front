import { Fragment } from 'react';

import { OutlineInput, InputError } from 'src/styled/Inputs';

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
        <InputError>{formik.errors.name}</InputError>
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
        <InputError>{formik.errors.email}</InputError>
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
        <InputError>{formik.errors.password}</InputError>
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
        <InputError>{formik.errors.confirmPassword}</InputError>
      ) : null}
    </Fragment>
  );
};
