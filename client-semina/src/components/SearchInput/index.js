import React from "react";
import { Form } from "react-bootstrap";

export default function SearchInput({ handleChange, query, disabled, readOnly }) {
  return (
    <Form.Group className="mb-3">
      <Form.Control
        readOnly={readOnly}
        disabled={disabled}
        type="text"
        placeholder="Masukkan pencarian di sini"
        value={query}
        name="query"
        onChange={handleChange}
      />
    </Form.Group>
  );
}
