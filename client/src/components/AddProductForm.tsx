import { useState, type ChangeEvent, type FormEvent } from "react";
import type { NewProduct } from "../types";

type Props = {
  onSubmit: (input: NewProduct) => Promise<void>;
  onCancel: () => void;
};

export default function AddProductForm({ onSubmit, onCancel }: Props) {
  const [values, setValues] = useState({ name: "", price: "", category: "", image_url: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const change = (field: keyof typeof values) => (e: ChangeEvent<HTMLInputElement>) =>
    setValues((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({ ...values, price: Number(values.price) });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <form className="form-panel" onSubmit={handleSubmit}>
      <h2>Add a product</h2>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" value={values.name} onChange={change("name")} placeholder="Desk Lamp" />
        </div>
        <div className="field">
          <label htmlFor="price">Price</label>
          <input id="price" value={values.price} onChange={change("price")} placeholder="19.99" />
        </div>
        <div className="field">
          <label htmlFor="category">Category</label>
          <input id="category" value={values.category} onChange={change("category")} placeholder="Home" />
        </div>
        <div className="field">
          <label htmlFor="image_url">Image URL</label>
          <input id="image_url" value={values.image_url} onChange={change("image_url")} placeholder="https://..." />
        </div>
      </div>
      {error && <p className="field-error">{error}</p>}
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
