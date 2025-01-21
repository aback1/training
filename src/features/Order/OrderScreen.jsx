import OrderItem from "./OrderItem.jsx";
import { useNavigate } from "react-router-dom";
import Button from "../../common/components/Button/Button.jsx";
import { useGetOrderByIdQuery, useFetchOrdersQuery } from "./orderApi.js";
import {useSelector} from "react-redux";

export default function OrderScreen() {
    const orderId = useSelector((state) => state.shoppingCart.orderId);
    const navigate = useNavigate();
    const { data: allOrders, isLoading, error } = useGetOrderByIdQuery(orderId);
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
            <OrderItem key={orderData.orderId} order={orderData} />
            <Button onClick={() => navigate("/")}>Back to Starting Page!</Button>
        </div>
    );
}
