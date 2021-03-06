import React from "react";
import { useForm } from "react-hook-form";
import axios from "common/axios";
import { toast } from "react-toastify";
export default function Login(props) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async data => {
    //2. 获取表单数据
    const { email, password } = data;
    //3. 处理登录逻辑
    try {
      const res = await axios.post("/auth/login", { email, password });
      const jwToken = res.data;
      // toast.success("login Success");
      global.auth.setToken(jwToken);
      props.history.push("/");
    } catch (error) {
      const msg = error.response.data.message;
      toast.error(msg);
    }
  };
  return (
    <div className="login-wrapper">
      <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
        {/* Login */}
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              type="text"
              className={`input ${errors.email && "is-danger"}`}
              placeholder="Email"
              name="email"
              ref={register({
                required: "Eamil is required",
                pattern: {
                  value: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                  message: "Invaild Email"
                }
              })}
            />
            {errors.email && (
              <p className="helper has-text-danger has-text-centered">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              type="password"
              className={`input ${errors.password && "is-danger"}`}
              placeholder="Password"
              name="password"
              ref={register({
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "cannot be less than 6 digits"
                }
              })}
            />
            {errors.password && (
              <p className="helper has-text-danger has-text-centered">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <div className="control">
          <button className="button is-fullwidth is-primary">Login</button>
        </div>
      </form>
    </div>
  );
}
