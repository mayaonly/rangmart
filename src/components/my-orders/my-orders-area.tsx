"use client";

import { useEffect, useState } from "react";
import Wrapper from "@/layouts/wrapper";
import API from "@/utils/api";

interface OrderItem {
  order_item_id: number;
  category_name: string;
  subcategory_name: string;
  product_name: string;
  pid: number;
  variant_id: number;
  color: string;
  size: string;
  quantity: number;
  price: string;
  discounted_price: string;
  variant_image: string;
}

interface Order {
  order: {
    id: number;
    user_id: number;
    created_at: string;
    total_amount: string;
    status: string;
    payment_status: string;
    razorpay_order_id: string;
    first_name: string;
    last_name: string;
    business_name: string;
    country: string;
    street_address: string;
    apartment: string;
    city: string;
    state: string;
    postal_code: string;
    phone: string;
    email: string;
    order_notes: string;
  };
  items: OrderItem[];
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
   const steps = ['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
  const currentStep = 2;

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");

    const fetchOrders = async () => {
      try {
        const response = await API.post("/my-orders", { user_id });
        if (response.data.status) {
          setOrders(response.data.orders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (user_id) {
      fetchOrders();
    }
  }, []);

  return (
    <Wrapper>
      <main>
        <section className="my-orders-area pt-10 pb-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-10">My Orders</h2>
            {orders.length === 0 ? (
              <p className="text-gray-600">No orders found.</p>
            ) : (
              orders.map((orderBlock, index) => (
                <div
                  key={index}
                  className="mb-10 pl-10 p-6 bg-white shadow-md rounded-xl border border-gray-200"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold">
                      Order #{orderBlock.order.id}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Placed on: {new Date(orderBlock.order.created_at).toLocaleString()}
                    </p>
                    <p className="text-sm">
                      <strong>Status:</strong>{" "}
                      <span className="capitalize">{orderBlock.order.status}</span>{" "}
                      | <strong>Payment:</strong>{" "}
                      <span className="capitalize">{orderBlock.order.payment_status}</span>
                       | <strong>Payment Method:</strong>{" "}
                      <span className="capitalize">Cash</span>
                    </p>
                    <p className="text-sm">
                      <strong>Total:</strong> ₹{orderBlock.order.total_amount}
                    </p>
                    <p className="text-sm">
                      <strong>Customer:</strong>{" "}
                      {orderBlock.order.first_name} {orderBlock.order.last_name} (
                      {orderBlock.order.phone}, {orderBlock.order.email})
                    </p>
                    <p className="text-sm">
                      <strong>Address:</strong> {orderBlock.order.street_address},{" "}
                      {orderBlock.order.apartment}, {orderBlock.order.city},{" "}
                      {orderBlock.order.state}, {orderBlock.order.country} -{" "}
                      {orderBlock.order.postal_code}
                    </p>
                    <p className="text-sm italic">
                      <strong>Notes:</strong> {orderBlock.order.order_notes}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
                    {orderBlock.items.map((item) => (
                      <div
                        key={item.order_item_id}
                        className="border p-4 rounded-lg shadow-sm bg-gray-50"
                      >
                        <img
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.variant_image}`}
                          alt={item.product_name}
                          className="w-full h-40 object-cover rounded mb-3"
                          width={100}
                            height={100}
                        />
                        <h4 className="font-semibold">{item.product_name}</h4>
                        <p className="text-sm text-gray-600">
                          Category: {item.category_name} / {item.subcategory_name}
                        </p>
                        {/* <p className="text-sm">
                          <strong>Color:</strong> {item.color} | <strong>Size:</strong> {item.size}
                        </p> */}
                        <p className="text-sm">
                          <strong>Qty:</strong> {item.quantity}
                        </p>
                        <p className="text-sm">
                          <strong>Price:</strong>{" "}
                          {/* <span className="line-through text-red-500">₹{item.price}</span>{" "} */}
                          <span className="text-green-600">₹{item.discounted_price}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                 
                  
                </div>
              ))
            )}
          </div>
        </section>
        
      </main>
    </Wrapper>
  );
}
