import React from "react";
import { connect } from "react-redux";

import { removeCart } from "../actions";
import { ItemCard } from "./ItemCard";

const Summary = props => {
  const { cart, taxRate, exclusive } = props;
  const totalPrice = {};
  const itemsSubtotal = cart
    .reduce((pre, item) => {
      const tax = exclusive.find(i => i === item.category) ? 1 : 1 + taxRate;
      const currentItemPrice = item.price * item.inventory * tax;
      totalPrice[item.name] = currentItemPrice.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      });
      return pre + currentItemPrice;
    }, 0)
    .toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });
  console.log(totalPrice);
  const eachItemTotalPrice = Object.keys(totalPrice).map((key, index) => {
    return (
      <div className="cart-summary-item-row" key={index}>
        <span className="cart-summary-item-name">{key}</span>:
        <span className="cart-summary-item-value">{totalPrice[key]}</span>
      </div>
    );
  });
  return (
    <div className="cart-summary-container">
      <h2>Summary</h2>
      {eachItemTotalPrice}
      <div>
        <h3>{itemsSubtotal}</h3>
      </div>
    </div>
  );
};

class Cart extends React.Component {
  onRemoveCartClick = ({ id }) => {
    this.props.onRemoveCart(id);
  };

  render() {
    const { cart } = this.props;
    const inventories = cart.map((i, index) => {
      return (
        <div key={index}>
          <ItemCard {...i} cb={this.onRemoveCartClick} isCart />
        </div>
      );
    });
    const taxRate = 0.15;
    return (
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <div className="cart-item-card-container">{inventories}</div>
        <Summary taxRate={taxRate} exclusive={["Service"]} cart={cart} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.shop.cart
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRemoveCart: id => {
      dispatch(removeCart(id));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
