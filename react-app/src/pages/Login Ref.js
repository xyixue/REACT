import React, { Component } from "react";

class Login extends Component {
  
  emailRef = React.createRef();
  passwordRef = React.createRef();




  handleSubmit = e => {
    //1.阻止默认事件
    e.preventDefault();
    //2. 获取表单数据
   const formData = {
     email:this.emailRef.current.value,
    password:this.passwordRef.current.value
   }
   console.log(formData);
    //3. 处理登录逻辑

    //4. 跳转首页视图
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="login-wrapper">
        <form className="box login-box" onSubmit={this.handleSubmit}>
          {/* Login */}
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input type="text" className="input" placeholder="Email" ref={this.emailRef} />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input type="password" className="input" placeholder="Password"  ref={this.passwordRef} />
            </div>
          </div>
          <div className="control">
            <button className="button is-fullwidth is-primary">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
