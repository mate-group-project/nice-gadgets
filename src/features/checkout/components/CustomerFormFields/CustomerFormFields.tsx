interface CustomerFormFieldsProps {
  form: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  firstErrorRef: React.RefObject<HTMLDivElement | null>;
}

const fields: { name: keyof CustomerFormFieldsProps['form']; placeholder: string }[] = [
  { name: 'firstName', placeholder: 'First name' },
  { name: 'lastName', placeholder: 'Last name' },
  { name: 'email', placeholder: 'Email' },
  { name: 'phone', placeholder: 'Phone' },
];

export const CustomerFormFields = ({
  form,
  errors,
  handleChange,
  firstErrorRef,
}: CustomerFormFieldsProps) => (
  <>
    <h2>Contact information</h2>

    {fields.map(({ name, placeholder }) => (
      <div className="field" key={name}>
        <input
          name={name}
          placeholder={placeholder}
          value={form[name] ?? ''}
          onChange={handleChange}
          className="form__field"
        />
        {errors[name] && (
          <p
            className="error"
            ref={name === Object.keys(errors)[0] ? firstErrorRef : null}
          >
            {errors[name]}
          </p>
        )}
      </div>
    ))}
  </>
);
