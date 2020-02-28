import React, { Component } from "react";

class Login extends Component {
  /**
   * 1. 命名和绑定
   * 2. event
   * 3. this
   * 4. 传递参数
   */

  // constructor(){
  //    super();
  //    this.handleClick = this.handleClick.bind(this);
  //  }

  handleClick = (msg, e) => {
    console.log(e.target);
    e.preventDefault(); // 阻止默认事件
    console.log(msg); // this  是 undefined
  };

  render() {
    return (
      // React.createElement('p', {className:'login',},'Login Component')
      // React.createElement(
      //     'p',
      //     {className:'login',},
      //     React.createElement('span','','Login Component'))  jsx 本质
      <div className="login-wrapper">
        <a
          href="/login"
          className="button"
          onClick={this.handleClick.bind(this, "Clicked")}
        >
          click me
        </a>

        <form className="box login-box">
          {/* Login */}
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input type="text" className="input" placeholder="Email" />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input type="password" className="input" placeholder="Password" />
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
