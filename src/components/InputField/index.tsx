import { FieldConfig, useField } from 'formik';
import { DefaultInput, DefaultInputError } from 'src/styled/Inputs';

interface Props extends FieldConfig {
  label: string;
  type?: string;
  placeholder?: string;
  fullWidth?: boolean;
}

const InputField: React.FC<Props> = ({
  label,
  fullWidth = false,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <DefaultInput>
      <label htmlFor={props.name}>{label}</label>
      <input
        className={fullWidth ? 'w-100' : undefined}
        type={props.type ? props.type : 'text'}
        {...field}
        {...props}
      />

      {meta.touched && meta.error ? (
        <DefaultInputError>{meta.error}</DefaultInputError>
      ) : null}
    </DefaultInput>
  );
};

export default InputField;
