import React from "react";
import { FormControl } from "react-bootstrap";

export default function TextInput({
  name,
  value,
  type,
  onChange,
  placeholder,
}) {
  return (
    <FormControl
      name={name}
      value={value}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
