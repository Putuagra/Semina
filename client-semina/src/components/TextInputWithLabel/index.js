import React from "react";
import { FormGroup, FormLabel } from "react-bootstrap";
import TextInput from "../TextInput";

export default function TextInputWithLabel({
  label,
  name,
  value,
  type,
  onChange,
  placeholder,
}) {
  return (
    <FormGroup className="mb-2">
      <FormLabel>{label}</FormLabel>
      <TextInput
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
      />
    </FormGroup>
  );
}
