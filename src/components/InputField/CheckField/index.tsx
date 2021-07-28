import { FieldConfig, useField } from 'formik';
import { DefaultCheckbox, DefaultInputError } from 'src/styled/Inputs';

interface Props extends FieldConfig {
  label: string;
}

const CheckField: React.FC<Props> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <DefaultCheckbox htmlFor={props.name}>
      <input type="checkbox" {...field} {...props} />
      {label}

      {meta.touched && meta.error ? (
        <DefaultInputError>{meta.error}</DefaultInputError>
      ) : null}
    </DefaultCheckbox>
  );
};

export default CheckField;
