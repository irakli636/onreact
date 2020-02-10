import React from "react";
import { Button } from "antd";
import { Card } from "antd";

const { Meta } = Card;

export const ItemCard = props => {
  const { id, name, category, price, inventory, cb, isCart } = props;
  const usCurrencyPrice = price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
  const buttonText = isCart ? "Remove from Cart" : "Add to Cart";
  const buttonType = isCart ? "danger" : "primary";
  const inventoryText =
    inventory === 0 ? (
      <span className="no-stock-warnning">Out of Stock</span>
    ) : (
      inventory
    );
  const imageUrl = `https://source.unsplash.com/random/400x200?sig=${id}`;
  return (
    <Card
      hoverable
      className={"item-card"}
      cover={<img alt="example" src={imageUrl} />}
    >
      <Meta title={name} description={id} />
      <div>Category: {category}</div>
      <div>Price: {usCurrencyPrice}</div>
      <div>In stock: {inventoryText}</div>
      <hr />
      <Button type={buttonType} onClick={() => cb({ id, inventory, name })}>
        {buttonText}
      </Button>
    </Card>
  );
};
