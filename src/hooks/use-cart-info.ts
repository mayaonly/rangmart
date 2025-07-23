'use client';
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hook";

const useCartInfo = () => {
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const { cart_products } = useAppSelector((state) => state.cart);

  useEffect(() => {
    const cart = cart_products.reduce(
      (cartTotal, cartItem) => {
        const {  orderQuantity,variants  } = cartItem;
          if (typeof orderQuantity !== "undefined") {
            const discountedPrice = variants?.[0]?.discounted_price;

          const parsedPrice = parseFloat(discountedPrice)

          if (!isNaN(parsedPrice) && typeof orderQuantity === "number") {
            const itemTotal = parsedPrice * orderQuantity;
            cartTotal.quantity += orderQuantity;
            cartTotal.total += itemTotal;
          } else {
            console.warn("Invalid price or quantity in cartItem:", cartItem);
          }
        }
        return cartTotal;
      },
      {
        total: 0,
        quantity: 0,
      }
    );
    setQuantity(cart.quantity);
    setTotal(cart.total);
  }, [cart_products]);
  
  return {
    quantity,
    total,
    setTotal,
  };
};

export default useCartInfo;
