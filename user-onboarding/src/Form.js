import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const LoginForm = ({ errors, touched, values, handleSubmit, status }) => {
  const [users, setUsers] = useState([]);
  console.log(users);

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

  return (
    <div className="login-form">
      <Form>
        <h1>Login</h1>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}
        <Field type="text" name="email" placeholder="Email" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <label className="checkbox-container">
          <Field type="checkbox" name="tos" checked={values.tos} />
          {touched.tos && errors.tos && <p className="error">{errors.tos}</p>}I
          agree to the Terms of Service
        </label>
        <button type="submit">Submit</button>
      </Form>
      <div className="user-list">
        <h1>Users</h1>
        {users.map(user => (
          <h3>{user.name}</h3>
        ))}
      </div>
    </div>
  );
};

const FormikLoginForm = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    tos: Yup.boolean()
      .oneOf([true], "Please agree to the ToS")
      .required()
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post(`https://reqres.in/api/users`, values)
      .then(res => {
        setStatus(res.data);
        console.log("Server response: ", res);
      })
      .catch(err => console.log(err.response));
  }
})(LoginForm);

export default FormikLoginForm;
