import React from "react";
import axios from "common/axios";
import { toast } from "react-toastify";
class EditInventory extends React.Component {
  state = {
    id: "",
    name: "",
    price: "",
    tags: "",
    image: "",
    status: ""
  };

  componentDidMount() {
    const { id, name, tags, image, price, status } = this.props.product;
    this.setState({
      id,
      name,
      tags,
      image,
      price,
      status
    });
  }

  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    });
  };

  submit = e => {
    e.preventDefault();
    const product = { ...this.state };
    axios.put(`products/${this.state.id}`, product).then(res => {
      this.props.close(res.data);
      toast.success("修改商品成功！");
    });
  };

  onDelete = () => {
    axios.delete(`products/${this.state.id}`).then(res => {
      this.props.deleteProduct(this.state.id);
      this.props.close();
      toast.success("删除商品成功！");
    });
  };

  render() {
    return (
      <div className="inventory">
        <p className="title has-text-centered">Inventory</p>
        <form onSubmit={this.submit}>
          <div className="field">
            <div className="control">
              <label className="label">Name</label>
              <textarea
                className="textarea"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Price</label>
              <input
                className="input"
                type="number"
                name="price"
                onChange={this.handleChange}
                value={this.state.price}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Tags</label>
              <input
                className="input"
                type="text"
                name="tags"
                onChange={this.handleChange}
                value={this.state.tags}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Image</label>
              <input
                className="input"
                type="text"
                name="image"
                onChange={this.handleChange}
                value={this.state.image}
              />
            </div>
          </div>
          <br />
          <div className="field">
            <div className="control">
              <label className="label">Status</label>
              <div className="select is-fullwidth">
                <select
                  name="status"
                  onChange={this.handleChange}
                  value={this.state.status}
                >
                  <option>available</option>
                  <option>unavailable</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button className="button is-link">Update</button>
            </div>
            <div className="control">
              <button className="button is-danger" onClick={this.onDelete}>
                Delete
              </button>
            </div>
            <div className="control">
              <button
                className="button"
                type="button"
                onClick={() => this.props.close()}
              >
                Cancle
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EditInventory;
