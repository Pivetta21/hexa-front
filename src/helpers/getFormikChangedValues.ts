import { FormikValues } from 'formik';

export default function getFormikChangedValues(
  values: FormikValues,
  initialValues: FormikValues,
  excludedValues?: string[],
): FormikValues {
  const blacklist: Set<string> = new Set(excludedValues);

  return Object.entries(values).reduce(
    (acc: { [value: string]: any }, [key, value]) => {
      const hasChanged = initialValues[key] !== value;

      if (hasChanged && !blacklist.has(key)) {
        acc[key] = value;
      }

      return acc;
    },
    {},
  );
}
