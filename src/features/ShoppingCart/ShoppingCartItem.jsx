import Button from "../../common/components/Button/Button.jsx";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, decrementAmount, incrementAmount, selectCartAmount } from "./shoppingCartSlice.js";

export default function ShoppingCartItem({ item }) {
    const { id, name, price, options } = item;

    const dispatch = useDispatch();

    // Get the current amount dynamically using the selector
    const cartAmount = useSelector((state) => selectCartAmount(state, id));
    const totalCost = (price * cartAmount).toFixed(2);

    const handleIncAmount = () => {
        dispatch(incrementAmount(id));
    };

    const handleDecAmount = () => {
        if (cartAmount > 1) {
            dispatch(decrementAmount(id));
        } else {
            dispatch(deleteItem(id));
        }
    };


    return (
        <div className="border p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
            <div>
                <h3 className="text-lg font-bold">{name}</h3>
                <p className="text-sm">Amount: {cartAmount}</p>
                <p className="text-sm">Options: {options.map((option) => option.name).join(", ")}</p>
            </div>
            <div>
                <p className="font-bold">{totalCost}€</p>
            </div>
            <div className="flex items-center justify-center mt-2">
                <Button onClick={handleDecAmount}>-</Button>
                <p className="mx-8">{cartAmount}</p>
                <Button onClick={handleIncAmount}>+</Button>
            </div>

        </div>
    );
}
