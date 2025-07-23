"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IProductData } from "@/types/product-d-t";
import { useAppDispatch } from "@/redux/hook";
import { add_cart_product, quantityDecrement, remove_product } from "@/redux/features/cart";

// prop type
type IProps = {
  product: IProductData;
};

const CartItem = ({ product }: IProps) => {
  const dispatch = useAppDispatch();
  return (
    <tr>
      <td className="product-thumbnail">
        <Link href={`/shop-details/${product.id}`}>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${product.image_url}`}
            width={125}
            height={125}
            alt="cart-img"
          />
        </Link>
      </td>
      <td className="product-name">
        <Link href={`/shop-details/${product.id}`}>{product.name}</Link>
      </td>
      <td className="product-price">
         ₹ {(parseFloat(product.variants[0].discounted_price))}
      </td>
      <td className="product-quantity">
        <span
          onClick={() => dispatch(quantityDecrement(product))}
          className="cart-minus"
        >
          -
        </span>
        <input
          className="cart-input"
          type="text"
          value={product.orderQuantity}
          readOnly
        />
        <span
          onClick={() => dispatch(add_cart_product(product))}
          className="cart-plus"
        >
          +
        </span>
      </td>
      {product.orderQuantity && (
        <td className="product-subtotal">
          <span className="amount">
           ₹
            {((parseFloat(product.variants[0].discounted_price)) * product.orderQuantity).toFixed(2)}
          </span>
        </td>
      )}
      <td className="product-remove">
        <a onClick={() => dispatch(remove_product(product))} className="pointer">
          <i className="fa fa-times"></i>
        </a>
      </td>
    </tr>
  );
};

export default CartItem;
