import React from "react";
import { Form } from "react-bootstrap";
import TextInputWithLabel from "../../components/TextInputWithLabel";
import SButton from "../../components/Button";

export default function FormCategory({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
}) {
  return (
    <Form>
      <TextInputWithLabel
        placeholder={"Masukkan nama kategori"}
        label={"Nama kategori"}
        name="name"
        value={form.name}
        type="text"
        onChange={handleChange}
      />
      <SButton variant="primary" action={handleSubmit} isLoading={isLoading}>
        {edit ? "Ubah" : "Simpan"}
      </SButton>
    </Form>
  );
}
