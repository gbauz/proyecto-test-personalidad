import { Field, ErrorMessage } from 'formik'

const CustomSelect = ({ label, name, options }) => (
  <div className="mb-6">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    <Field
      as="select"
      name={name}
      className="block w-full px-4 py-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
    >
      <option value="">Seleccione una opción</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Field>
    <ErrorMessage name={name} component="div" className="mt-1 text-sm text-red-500" />
  </div>
)

export default CustomSelect
