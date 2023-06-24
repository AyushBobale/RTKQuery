import * as yup from "yup";

import React, { useEffect } from "react";

import { useFormik } from "formik";
import { useLoginMutation } from "../../redux/slices/loginSlice";
import { useServerStatusQuery } from "../../redux/slices/rootSlice";

const Register = () => {
  const registerForm = useFormik({
    initialValues: {
      username: "",
      password: "",
      c_password: "",
    },
    validationSchema: yup.object({
      username: yup
        .string("Must be a string")
        .max(20, "Cannot exced 20 chars")
        .min(5, "Min 5 chars required")
        .required("Username is required"),
      password: yup
        .string()
        .required("Please Enter your password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      c_password: yup
        .string()
        .required("Please confirm password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const [login] = useLoginMutation();

  useEffect(() => {
    login({
      username: "test",
      password: "test",
    });
  }, []);
  //
  const serverStatus = useServerStatusQuery();
  console.log(serverStatus.data);

  return (
    <div>
      <div className="register-form-wrapper">
        <div className="input-wrapper">
          <span>
            {registerForm.touched.username && registerForm.errors.username
              ? registerForm.errors.username
              : ""}
          </span>
          <input
            placeholder="Username"
            type="text"
            name="username"
            value={registerForm.values.username}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            id=""
          />
        </div>
        <div className="input-wrapper">
          <span>
            {registerForm.touched.password && registerForm.errors.password
              ? registerForm.errors.password
              : ""}
          </span>
          <input
            placeholder="Password"
            type="text"
            name="password"
            value={registerForm.values.password}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            id=""
          />
        </div>
        <div className="input-wrapper">
          <span>
            {registerForm.touched.c_password && registerForm.errors.c_password
              ? registerForm.errors.c_password
              : ""}
          </span>
          <input
            placeholder="Confirm Password"
            type="text"
            name="c_password"
            value={registerForm.values.c_password}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            id=""
          />
        </div>
      </div>
      <button onClick={registerForm.handleSubmit}>Submit</button>
    </div>
  );
};

export default Register;
