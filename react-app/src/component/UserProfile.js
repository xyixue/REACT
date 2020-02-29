import React from "react";

export default function UserProfile(props) {
  const { nickname, email, type } = props.user;
  const logout = () => {
    global.auth.logout();
    props.close("logout");
  };
  return (
    <div className="user-profile">
      <p className="title has-text-centered">Profile</p>
      <fieldset disabled>
        <div className="field">
          <div className="control">
            <label className="label">Nickname</label>
            <input type="text" className="input" defaultValue={nickname} />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Email</label>
            <input type="text" className="input" defaultValue={email} />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Type</label>
            <input
              type="text"
              className="input"
              defaultValue={type === 1 ? "Manager" : "General"}
            />
          </div>
        </div>
      </fieldset>
      <br />
      <br />
      <div className="field is-grouped is-grouped-centered">
        <div className="control">
          <button className="button is-primary" type="button" onClick={logout}>
            Logout
          </button>
        </div>
        <div className="control">
          <button
            className="button is-link"
            type="button"
            onClick={() => props.close()}
          >
            Cancle
          </button>
        </div>
      </div>
    </div>
  );
}
