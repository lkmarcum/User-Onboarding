import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (status) {
      setUser([...user, status]);
    }
  });

  return (
    <div className="login-form">
      <h1>Login</h1>
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        <Field type="text" name="email" placeholder="Email" />
        <Field type="password" name="password" placeholder="Password" />
        <label className="checkbox-container">
          I agree to the Terms of Service
          <Field type="checkbox" name="tos" />
        </label>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};
