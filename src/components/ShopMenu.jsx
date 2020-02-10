import React from "react";
import { Menu, Dropdown, Icon } from "antd";

export const ShopMenu = props => {
  const sortMenu = (
    <Menu>
      <Menu.Item>
        <div onClick={props.onSortByPriceAscend}>Price Ascend</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={props.onSortByPriceDescend}>Price Descend</div>
      </Menu.Item>
    </Menu>
  );

  const filterMenuItem = props.categories.map((i, index) => {
    return (
      <Menu.Item key={index}>
        <div>{i}</div>
      </Menu.Item>
    );
  });

  const filterMenu = (
    <Menu onClick={props.onFilterMenuClick}>{filterMenuItem}</Menu>
  );
  return (
    <div>
      <Dropdown className="sort-dropdown-menu" overlay={sortMenu}>
        <a className="ant-dropdown-link" href="#">
          Sort by <Icon type="down" />
        </a>
      </Dropdown>
      <Dropdown className="sort-dropdown-menu" overlay={filterMenu}>
        <a className="ant-dropdown-link" href="#">
          Filter by <Icon type="down" />
        </a>
      </Dropdown>
    </div>
  );
};
