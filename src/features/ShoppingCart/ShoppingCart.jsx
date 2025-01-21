import { useDispatch, useSelector } from "react-redux";
import ShoppingCartItem from "./ShoppingCartItem.jsx";
import Button from "../../common/components/Button/Button.jsx";
import { v4 as uuid } from "uuid";
import { clearShoppingCart, deleteItem } from "./shoppingCartSlice.js";
import { setShowOrderForm, setOrderId } from "./shoppingCartSlice.js";
import OrderCredentialsForm from "./OrderCredentialsForm.jsx";
import { useCreateOrderMutation } from "../Order/orderApi.js";
import { totalCartAmount } from "./shoppingCartSlice.js";
import { useNavigate} from "react-router-dom";

export default function ShoppingCart() {
    const dispatch = useDispatch();
    const newOrderId = uuid();
    const navigate = useNavigate();
    const allCredentialsentered = useSelector((state) => state.shoppingCart.allCredentialsentered);
    const userAddress = useSelector((state) => state.shoppingCart.address);
    const userFullName = useSelector((state) => state.shoppingCart.fullName);
    const userEmail = useSelector((state) => state.shoppingCart.email);
    const cartItems = useSelector((state) => state.shoppingCart.items);
    const userPayment = useSelector((state) => state.shoppingCart.payment);

    const [createOrder, {isLoading}] = useCreateOrderMutation();

    function handleConfirmOrder() {

        dispatch(setShowOrderForm(true));
    }

    const cartTotal = useSelector((state) => totalCartAmount(state));


    function handleClearCart() {
        dispatch(clearShoppingCart());
    }

    function handleSubmitOrder() {
        const newOrder = {
            orderId: newOrderId,
            items: cartItems,
            fullName: userFullName,
            email: userEmail,
            address: userAddress,
            payment: userPayment
        }
        createOrder(newOrder)
            .unwrap() // Unwraps the promise to handle success and error states
            .then((response) => {
                console.log("Order submitted successfully:", response);
                dispatch(clearShoppingCart());
                alert("Order submitted successfully!");
                dispatch(setOrderId(newOrder.orderId));
            })
            .catch((error) => {
                console.error("Failed to submit order:", error);
                alert("Failed to submit your order. Please try again.");
            });
        navigate("/your-order");
    }

    const items = useSelector((state) => state.shoppingCart.items || []).filter(
        (item) => item.name !== undefined
    );

    const showOrderForm = useSelector(state => state.shoppingCart.showOrderForm);

    const itemsHaveName = items.every((item) => item.name !== "");

    return (
        <aside className="p-4 border rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
            {items.length > 0 && itemsHaveName ? (
                <>
                    {items.map((item, index) => (
                        <ShoppingCartItem key={index} item={item} />
                    ))}
                    <p className="text-2xl font-semibold mb-4">
                        {cartTotal}€
                    </p>
                    <Button onClick={handleConfirmOrder}>Order</Button>
                    <Button onClick={handleClearCart}>Clear Cart</Button>
                    {showOrderForm && !allCredentialsentered && <OrderCredentialsForm />}
                    {allCredentialsentered && <Button onClick={handleSubmitOrder} disabled={isLoading}>{isLoading ? "..Submitting": "Confirm Order"}</Button> }
                </>
            ) : (
                <p className="mb-4">Your cart is empty!</p>
            )}
        </aside>
    );
}
