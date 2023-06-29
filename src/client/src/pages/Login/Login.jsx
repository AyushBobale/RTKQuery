import * as yup from "yup";

import React, { useEffect } from "react";

import { useFormik } from "formik";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../redux/slices/loginSlice";
import { useServerStatusQuery } from "../../redux/slices/rootSlice";

const Login = () => {
  const [login] = useLoginMutation();
  const loginForm = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string("Must be a string").required("Username is required"),
      password: yup
        .string("Must be a string")
        .required("Please Enter your password"),
    }),
    onSubmit: (values) => {
      login({
        username: values.username,
        password: values.password,
      });
    },
  });

  //
  const serverStatus = useServerStatusQuery();
  console.log(serverStatus.data);

  return (
    <div>
      <div className="register-form-wrapper">
        <div className="input-wrapper">
          <span>
            {loginForm.touched.username && loginForm.errors.username
              ? loginForm.errors.username
              : ""}
          </span>
          <input
            placeholder="Username"
            type="text"
            name="username"
            value={loginForm.values.username}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            id=""
          />
        </div>
        <div className="input-wrapper">
          <span>
            {loginForm.touched.password && loginForm.errors.password
              ? loginForm.errors.password
              : ""}
          </span>
          <input
            placeholder="Password"
            type="text"
            name="password"
            value={loginForm.values.password}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            id=""
          />
        </div>
      </div>
      <button onClick={loginForm.handleSubmit}>Login</button>
    </div>
  );
};

export default Login;
