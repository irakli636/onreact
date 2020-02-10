import React from "react";
import { connect } from "react-redux";
import { Badge, Icon, message } from "antd";
import { Link } from "react-router-dom";

import { addCart, sortByPriceAscend, sortByPriceDescend } from "../actions";
import { ItemCard } from "./ItemCard";
import { ShopMenu } from "./ShopMenu";

class Shop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterKey: ""
    };
  }
  onAddCartClick = ({ id, inventory, name }) => {
    if (--inventory >= 0) {
      this.props.onAddCart(id);
    } else {
      message.warning(`No stock on item ${name}`);
    }
  };

  onFilterMenuClick = e => {
    this.setState({ filterKey: e.key });
  };

  generateCategories = inventory => {
    const set = {};
    const result = [];
    inventory.forEach(i => {
      if (set[i.category] === undefined) {
        set[i.category] = 1;
        result.push(i.category);
      }
    });
    return result.sort();
  };

  render() {
    const {
      inventory,
      cart,
      onSortByPriceAscend,
      onSortByPriceDescend
    } = this.props;
    const categories = this.generateCategories(inventory);

    const filteredInventories = inventory.filter((i, index) => {
      if (this.state.filterKey)
        return i.category === categories[this.state.filterKey];
      return i;
    });

    const inventoriesFragments = filteredInventories.map((i, index) => {
      return (
        <div key={index}>
          <ItemCard {...i} cb={this.onAddCartClick} />
        </div>
      );
    });
    return (
      <div>
        <div className="shop-container">
          <h1>Demo Store</h1>
          <div className="shop-menu-container">
            <ShopMenu
              onSortByPriceAscend={onSortByPriceAscend}
              onSortByPriceDescend={onSortByPriceDescend}
              categories={categories}
              onFilterMenuClick={this.onFilterMenuClick}
            />
            <Badge count={cart.length} showZero>
              <Link to="/cart">
                <Icon className="shop-cart-icon" type="shopping-cart" />
              </Link>
            </Badge>
          </div>
        </div>
        <div className="shop-item-card-container">{inventoriesFragments}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    inventory: state.shop.inventory,
    cart: state.shop.cart
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddCart: id => {
      dispatch(addCart(id));
    },
    onSortByPriceAscend: () => {
      dispatch(sortByPriceAscend());
    },
    onSortByPriceDescend: () => {
      dispatch(sortByPriceDescend());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
