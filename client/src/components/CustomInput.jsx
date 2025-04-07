import { Field, ErrorMessage } from 'formik'

const CustomInput = ({ label, name, type = 'text', placeholder }) => (
  <div className="mb-6">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      className="block w-full px-4 py-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
    />
    <ErrorMessage name={name} component="div" className="mt-1 text-sm text-red-500" />
  </div>
)

export default CustomInput
