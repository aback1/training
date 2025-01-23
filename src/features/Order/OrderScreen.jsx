import OrderItem from "./OrderItem.jsx";
import { useNavigate } from "react-router-dom";
import Button from "../../common/components/Button/Button.jsx";
import { useGetOrderByIdQuery, useFetchOrdersQuery } from "./orderApi.js";
import {useSelector} from "react-redux";

export default function OrderScreen() {
    const orderId = useSelector((state) => state.shoppingCart.orderId);
    const navigate = useNavigate();
    const { data: allOrders, isLoading, error } = useGetOrderByIdQuery(orderId);
    //if we want to display all orders
    //const { data: allOrders, isLoading, error } = useFetchOrdersQuery();

    if (isLoading) {
        return <p>...Loading</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    if (!allOrders || !Array.isArray(allOrders)) {
        console.error("Expected an array but got:", allOrders);
        return <p>Invalid data format received from the server.</p>;
    }

    console.log("orderID: ", orderId);

    const orderData = allOrders.find((order) => order.orderId.toString() === orderId);
    console.log(orderData);

    if (!orderData) {
        return <p>No order details found for this ID.</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-full p-6">
            <h1 className="text-2xl font-bold mb-4">Thank you for your order!</h1>
            <OrderItem key={orderData.orderId} order={orderData}/>
            <Button onClick={() => navigate("/")}>Back to Starting Page!</Button>
            <p className="mt-4 font-semibold">
                Total Price: €{orderData.items.reduce((total, item) =>
                total + (item.amount * item.price), 0
            ).toFixed(2)}
                <div className="mt-4 w-full max-w-md">
                    {orderData.items.map((item) => (
                        <div key={item.id} className="mb-2">
                            <p>Name: {item.name}</p>
                            <p>Amount: {item.amount}</p>
                            <p>Price: €{(item.amount * item.price).toFixed(2)}</p>
                        </div>
                    ))}
                </div>

            </p>
        </div>
    );
}
