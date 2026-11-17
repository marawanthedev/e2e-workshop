import { useState, type ChangeEvent, type FormEvent } from "react";
import { productSchema } from "../schemas/product";
import type { NewProduct } from "../types";

type Props = {
  onSubmit: (input: NewProduct) => Promise<void>;
  onCancel: () => void;
};

type Values = { name: string; price: string; category: string; image_url: string };
type Errors = Partial<Record<keyof Values, string>>;

export default function AddProductForm({ onSubmit, onCancel }: Props) {
  const [values, setValues] = useState<Values>({ name: "", price: "", category: "", image_url: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const change = (field: keyof Values) => (e: ChangeEvent<HTMLInputElement>) =>
    setValues((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const result = productSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Errors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof Values;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      await onSubmit(result.data);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  const field = (name: keyof Values, label: string, placeholder: string) => (
    <div className={errors[name] ? "field invalid" : "field"}>
      <label htmlFor={name}>{label}</label>
      <input id={name} value={values[name]} onChange={change(name)} placeholder={placeholder} />
      {errors[name] && <span className="field-error">{errors[name]}</span>}
    </div>
  );

  return (
    <form className="form-panel" onSubmit={handleSubmit} noValidate>
      <h2>Add a product</h2>
      <div className="form-grid">
        {field("name", "Name", "Desk Lamp")}
        {field("price", "Price", "19.99")}
        {field("category", "Category", "Home")}
        {field("image_url", "Image URL", "https://...")}
      </div>
      {serverError && <p className="field-error">{serverError}</p>}
      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Adding..." : "Add product"}
        </button>
        <button className="btn" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
