import DatePicker from 'react-datepicker';
import { Form } from 'react-bootstrap';
import React from 'react';
import { useField } from 'formik';

export default function MyDateInput({ ...props }) {
  const [field, meta, helpers] = useField(props.name);
  const { setValue } = helpers;

  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <DatePicker
        {...field}
        {...props}
        selected={field.value || null}
        onChange={(value) => setValue(value)}
      />

      {meta.touched && meta.error ? <label>{meta.error}</label> : null}
    </Form.Group>
  );
}
