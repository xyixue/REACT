import React from "react";
import { Link } from "react-router-dom";
class ToolBox extends React.Component {
  state = {
    searchTexe: ""
  };

  handleChange = e => {
    const value = e.target.value;
    this.setState({
      searchTexe: value
    });
    this.props.search(value);
  };
  clearSearchText = () => {
    this.setState({
      searchTexe: ""
    });
    this.props.search("");
  };

  render() {
    return (
      <div className="tool-box">
        <div className="logo-text">store</div>
        <div className="search-box">
          <div className="field has-addons">
            <div className="control">
              <input
                type="text"
                className="input search-input"
                placeholder="Search Product"
                value={this.state.searchTexe}
                onChange={this.handleChange}
              />
            </div>
            <div className="control">
              <button className="button" onClick={this.clearSearchText}>
                X
              </button>
            </div>
          </div>
        </div>
        <Link to="/cart" className="cart-box">
          <i className="fas fa-shopping-cart"></i>
          <span className="cart-num">{this.props.cartNum}</span>
        </Link>
      </div>
    );
  }
}

export default ToolBox;
