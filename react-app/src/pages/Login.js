import React, { Component } from "react";

export default function Login(props) {
  handleSubmit = e => {
    //1.阻止默认事件
    e.preventDefault();
    //2. 获取表单数据
    console.log(this.state);
    //3. 处理登录逻辑

    //4. 跳转首页视图
    this.props.history.push("/");
  };
  return (
    <div className="login-wrapper">
      <form className="box login-box" onSubmit={this.handleSubmit}>
        {/* Login */}
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              onChange={this.handleChange}
              value={this.state.value}
              type="text"
              className="input"
              placeholder="Email"
              name="email"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              onChange={this.handleChange}
              value={this.state.value}
              type="password"
              className="input"
              placeholder="Password"
              name="password"
            />
          </div>
        </div>
        <div className="control">
          <button className="button is-fullwidth is-primary">Login</button>
        </div>
      </form>
    </div>
  );
}
