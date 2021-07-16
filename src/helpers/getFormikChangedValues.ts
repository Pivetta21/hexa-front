import { FormikValues } from 'formik';

type GenericObject = { [key: string]: any };

export default function getFormikChangedValues(
  values: FormikValues,
  initialValues: GenericObject,
  excludedValues?: string[],
): GenericObject {
  const blacklist: GenericObject = {};

  if (excludedValues) {
    excludedValues.forEach((value) => {
      blacklist[value] = '';
    });
  }

  return Object.entries(values).reduce(
    (acc: { [value: string]: any }, [key, value]) => {
      const hasChanged = initialValues[key] !== value;

      if (hasChanged && !(key in blacklist)) {
        acc[key] = value;
      }

      return acc;
    },
    {},
  );
}
