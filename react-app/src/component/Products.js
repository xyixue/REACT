import React from "react";
import ToolBox from "component/ToolBox";
import Product from "component/Product";
import axios from "common/axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Panel from "component/Panel";
import AddInventory from "component/AddInventory";

class Products extends React.Component {
  state = {
    products: [],
    sourceProducts: [],
    cartNum: 0
  };

  componentDidMount() {
    axios.get("/products").then(resp => {
      this.setState({
        products: resp.data,
        sourceProducts: resp.data
      });
    });

    this.updateCartNum();
  }

  search = text => {
    //1.复制数组
    let _products = [...this.state.sourceProducts];
    //2. 过滤数组
    _products = _products.filter(p => {
      const matchArray = p.name.match(new RegExp(text, "gi"));
      return matchArray !== null;
    });
    //3.设置新的数组
    this.setState({
      products: _products
    });
  };

  toAdd = () => {
    Panel.open({
      component: AddInventory,
      callback: data => {
        console.log(data);
        if (data) {
          this.add(data);
        }
      }
    });
  };

  add = product => {
    const _products = [...this.state.products];
    _products.push(product);

    const _sproducts = [...this.state.sourceProducts];
    _sproducts.push(product);
    this.setState({
      products: _products,
      sourceProducts: _sproducts
    });
  };

  update = product => {
    const _products = [...this.state.products];
    const _index = _products.findIndex(p => p.id === product.id);
    _products.splice(_index, 1, product);

    const _sproducts = [...this.state.sourceProducts];
    const _sindex = _sproducts.findIndex(p => p.id === product.id);
    _sproducts.splice(_sindex, 1, product);

    this.setState({
      products: _products,
      sourceProducts: _sproducts
    });
  };

  delete = id => {
    const _products = this.state.products.filter(p => p.id !== id);
    const _sproducts = this.state.sourceProducts.filter(p => p.id !== id);
    this.setState({
      products: _products,
      sourceProducts: _sproducts
    });
  };

  updateCartNum = async () => {
    const cartNum = await this.initCartNum();
    this.setState({
      cartNum: cartNum
    });
  };

  initCartNum = async () => {
    const res = await axios.get("/carts");
    console.log(res);
    const carts = res.data || 0;
    const cartNum = carts
      .map(cart => cart.mount)
      .reduce((a, value) => a + value, 0);
    return cartNum;
  };

  render() {
    return (
      <div>
        <ToolBox search={this.search} cartNum={this.state.cartNum} />
        <div className="products">
          <div className="columns is-multiline is-desktop">
            <TransitionGroup component={null}>
              {this.state.products.map(p => {
                return (
                  <CSSTransition
                    classNames="product-fade"
                    timeout={{ enter: 300, exit: 300 }}
                    key={p.id}
                  >
                    <div className="column is-3 " key={p.id}>
                      <Product
                        product={p}
                        update={this.update}
                        delete={this.delete}
                        updateCartNum={this.updateCartNum}
                      />
                    </div>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </div>
          <button className="button is-primary add-btn" onClick={this.toAdd}>
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default Products;
