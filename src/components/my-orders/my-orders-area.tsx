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
            <center>
            <h3 className="tpdetails__title" >My Orders</h3>

            </center>
            {orders.length === 0 ? (
              <p className="text-gray-600">No orders found.</p>
            ) : (
              orders.map((orderBlock, index) => (
                <div
                  key={index}
                  className="mb-50 pl-20 p-6 bg-white shadow-md rounded-xl border border-gray-200"
                >
                  <center>
                     <h6 className="font-semibold mb-2 mt-10">
                          Order #{orderBlock.order.id}
                        </h6>
                  </center>
                  {/* Order Summary + Address */}
                  <div className="flex flex-col md:flex-row justify-between gap-6 row bg-white  p-4 rounded  ">
                      {/* Order Summary - LEFT */}
                      <div className="w-full md:flex-[2] col-md-6" >
                       
                        <p className="text-sm text-gray-500 mb-2">
                          Placed on: {new Date(orderBlock.order.created_at).toLocaleString()}
                        </p>
                        <p className="text-sm mb-1">
                          <strong>Status:</strong>{" "}
                          <span className="capitalize">{orderBlock.order.status}</span> |{" "}
                          <strong>Payment:</strong>{" "}
                          <span className="capitalize">{orderBlock.order.payment_status}</span> |{" "}
                          <strong>Payment Method:</strong> Cash
                        </p>
                        <p className="text-sm mb-1">
                          <strong>Total:</strong> ₹{orderBlock.order.total_amount}
                        </p>
                        <p className="text-sm mb-1">
                          <strong>Customer:</strong> {orderBlock.order.first_name}{" "}
                          {orderBlock.order.last_name} ({orderBlock.order.phone},{" "}
                          {orderBlock.order.email})
                        </p>
                        <p className="text-sm italic">
                          <strong>Notes:</strong> {orderBlock.order.order_notes || "None"}
                        </p>
                      </div>

                      {/* Address Block - RIGHT */}
                      <div className="  rounded w-full md:flex-[1] bg-gray-50 p-4 rounded-md border col-md-6">
                        <h4 className="font-semibold text-sm mb-2">Shipping Address</h4>
                        <p className="text-sm leading-5 text-gray-700">
                          {orderBlock.order.street_address}
                          {orderBlock.order.apartment ? `, ${orderBlock.order.apartment}` : ""}
                          <br />
                          {orderBlock.order.city}, {orderBlock.order.state}
                          <br />
                          {orderBlock.order.country} - {orderBlock.order.postal_code}
                        </p>
                      </div>
                  </div>


                  {/* Order Items Table */}
                  <div className="mt-6 overflow-x-auto mt-10  border shadow p-4 rounded">
                    <table className="w-full text-sm " width={"100%"}>
                      <thead className="bg-gray-100 text-left">
                        <tr>
                          <th className="p-2 border">Image</th>
                          <th className="p-2 border">Product</th>
                          <th className="p-2 border">Category</th>
                          <th className="p-2 border">Qty</th>
                          <th className="p-2 border">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderBlock.items.map((item) => (
                          <tr key={item.order_item_id} className="text-center">
                            <td className="p-2 border">
                              <img
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.variant_image}`}
                                alt={item.product_name}
                                className="mx-auto rounded border"
                                width={100}
                                height={100}
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  objectFit: "cover",
                                }}
                              />
                            </td>
                            <td className="p-2 border font-medium">
                              {item.product_name}
                            </td>
                            <td className="p-2 border">
                              {item.category_name} / {item.subcategory_name}
                            </td>
                            <td className="p-2 border">{item.quantity}</td>
                            <td className="p-2 border text-green-600">
                              ₹{item.discounted_price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
