import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {getLocalStorage, setLocalStorage } from "@/utils/localstorage";
import { notifyError, notifySuccess } from "@/utils/toast";
import { IProductData } from "@/types/product-d-t";
import API from '@/utils/api';



interface CartState {
  cart_products: IProductData[];
  orderQuantity: number;
}

let initialState: CartState = {
  cart_products: [],
  orderQuantity: 1,
};


export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add_cart_product: (state, action: PayloadAction<IProductData>) => {
      const isExist = state.cart_products.some((i) => i.id === action.payload.id);
      const user_id = localStorage.getItem("user_id");

      if (!user_id) {
        notifyError("Please login to add products to cart");
        return;
      }
      // if(action.payload.quantity === 0){
      //   notifyError(`Out of stock ${action.payload.name}`);
      // }
      else if (!isExist) {
        const newItem = {
          ...action.payload,
          orderQuantity: 1,
        };
        state.cart_products.push(newItem);
        // ✅ Call backend API to add product

        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}cart/add`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id,
              product_id: newItem.id,
              quantity: 1,
            }),
                    })
            .then((res) => res.json())
            .then((data) => {
              if (!data.status) {
                notifyError(data.message || "Server rejected the request.");
              } else {
                console.log("✅ Synced with DB");
              }
            })
            .catch(() => {
              notifyError("❌ Failed to sync with server.");
        });

        notifySuccess(`${action.payload.name} added to cart`);
        
      } else {
        state.cart_products.map((item) => {
          if (item.id === action.payload.id) {
            if (typeof item.orderQuantity !== "undefined") {
              if (item.variants[0].stock >= item.orderQuantity + state.orderQuantity) {
                item.orderQuantity =
                  state.orderQuantity !== 1
                    ? state.orderQuantity + item.orderQuantity
                    : item.orderQuantity + 1;
                  notifySuccess(`${state.orderQuantity} ${item.name} added to cart`);
                  // console.log("user_id - "+ localStorage.getItem("user_id") + " product_id: " + item.id + " quantity: " + item.orderQuantity);

                  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}cart/add`, {
                    method: "POST", 
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      user_id: localStorage.getItem("user_id"),
                      product_id: item.id,
                      quantity: state.orderQuantity,
                    }),
                  }).catch(() => {
                    notifyError("Failed to sync cart update with server.");
                  });
              } else {
                notifyError(`No more quantity available for this product!`);
                state.orderQuantity = 1;
              }
            }
          }
          return { ...item };
        });
      }
      localStorage.setItem("cart_products", JSON.stringify(state.cart_products));
    },

    increment: (state) => {
      state.orderQuantity = state.orderQuantity + 1;
    },
    decrement: (state) => {
      state.orderQuantity =
        state.orderQuantity > 1
          ? state.orderQuantity - 1
          : (state.orderQuantity = 1);
    },
    quantityDecrement: (state, action: PayloadAction<IProductData>) => {
      state.cart_products.map((item) => {
        if (item.id === action.payload.id) {
          if (item.orderQuantity && item.orderQuantity > 1) {
            item.orderQuantity = item.orderQuantity - 1;
          }
        }
        console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.id}/${localStorage.getItem("user_id")}`);
           fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}updateCartItem/${item.id}/${localStorage.getItem("user_id")}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quantity: item.orderQuantity,
            }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (!data.status) {
              notifyError("Failed to update cart on server");
            }
          })
          .catch(() => {
            notifyError("Network error updating cart");
          });

        notifyError(`${action.payload.name} Quantity Decrement`);
        return { ...item };
      });
      setLocalStorage("cart_products", state.cart_products);
    },
    remove_product: (state, action: PayloadAction<{ id: number; name: string }>) => {
      state.cart_products = state.cart_products.filter(
        (item) => item.id !== action.payload.id
      );
      //alert(action.payload.id);
      setLocalStorage("cart_products", state.cart_products);
      //console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}removeFromCart/${action.payload.id}/${localStorage.getItem("user_id")}`);
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}removeFromCart/${action.payload.id}/${localStorage.getItem("user_id")}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to remove from server");
      })
      .catch(() => {
        notifyError("Server error while removing item");
      });
      notifyError(`${action.payload.name} Remove from cart`);

    },
    initialOrderQuantity: (state) => {
      state.orderQuantity = 1;
    },
    clearCart: (state) => {
      const isClearCart = window.confirm('Are you sure you want to remove all items ?');
      if (isClearCart) {
        state.cart_products = [];
      }
      setLocalStorage("cart_products", state.cart_products);
    },
    clearCart2: (state) => {
      state.cart_products = [];
      
      setLocalStorage("cart_products", state.cart_products);
    },
    getCartProducts:(state) => {
      state.cart_products = getLocalStorage('cart_products');
    }
  },
});

export const {
  add_cart_product,
  increment,
  decrement,
  remove_product,
  quantityDecrement,
  initialOrderQuantity,
  clearCart,
  clearCart2,
  getCartProducts
} = cartSlice.actions;

export default cartSlice.reducer;
