import { FieldConfig, useField } from 'formik';
import { DefaultInputError, DefaultSelect } from 'src/styled/Inputs';

interface Props extends FieldConfig {
  label: string;
  options: { value: any; label: string }[];
}

const SelectField: React.FC<Props> = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <DefaultSelect>
      <label htmlFor={props.name}>{label}</label>
      <select {...field} {...props}>
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>

      {meta.touched && meta.error ? (
        <DefaultInputError>{meta.error}</DefaultInputError>
      ) : null}
    </DefaultSelect>
  );
};

export default SelectField;
