import React from "react";
import { Figure, Form } from "react-bootstrap";
import TextInputWithLabel from "../../components/TextInputWithLabel";
import { config } from "../../configs";
import SButton from "../../components/Button";

export default function FormTalent({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
}) {
  return (
    <Form>
      <TextInputWithLabel
        placeholder={"Masukkan nama pembicara"}
        label={"Nama"}
        name="name"
        value={form.name}
        type="text"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukkan role"}
        label={"Role"}
        name="role"
        value={form.role}
        type="text"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukkan avatar"}
        label={"Avatar"}
        name="avatar"
        type="file"
        onChange={handleChange}
      />
      {form.avatar !== '' && (
        <div>
          <Figure>
            <Figure.Image
              width={171}
              height={180}
              alt='171x180'
              src={`${config.api_image}/${form.avatar}`}
            />

            <Figure.Caption>Preview image avatar</Figure.Caption>
          </Figure>
        </div>
      )}
      <SButton variant='primary' action={handleSubmit} loading={isLoading}>
        {edit ? 'Ubah' : 'Simpan'}
      </SButton>
    </Form>
  );
}
