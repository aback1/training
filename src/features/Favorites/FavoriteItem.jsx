import Button from "../../common/components/Button/Button.jsx";
import { deleteFavorite } from "./favoritesSlice.js";
import {useDispatch, useSelector} from "react-redux";
import { addItem } from "../ShoppingCart/shoppingCartSlice.js";

export default function FavoriteItem({ item }) {
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.shoppingCart.items) || [];

    const handleDeleteFavorite = () => {
        dispatch(deleteFavorite(item.id));
    };

    const handleAddToShoppingCart = () => {

        const newCartItem = {
            id: item.id,
            name: item.name,
            price: item.price,
            amount: item.amount,
            options: item.options || [],
        }
        dispatch(addItem(newCartItem));
    };

    const totalprice = (item.price * item.amount).toFixed(2);

    return (
        <div className="w-full lg:w-1/3 p-6 border rounded-lg shadow-md bg-white mb-8 overflow-y-auto">
            <h3 className="text-2xl font-extrabold text-gray-800 mb-4">{item.name}</h3>

            <div className="text-lg mb-6">
                <p className="mb-2">
                    <strong>Amount:</strong> {item.amount}
                </p>
                <p className="mb-2">
                    <strong>ID:</strong> {item.id}
                </p>
                <p className="mb-2">
                    <strong>Options:</strong>{" "}
                    {item.options.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {item.options.map((option, index) => (
                                <li key={index}>{option.name}</li>
                            ))}
                        </ul>
                    ) : (
                        "None"
                    )}
                </p>
                <p>
                    <strong>Total Price:</strong> {totalprice}€
                </p>
            </div>

            <div className="flex flex-col space-y-4">
                <Button
                    onClick={handleDeleteFavorite}
                    className="p-4 text-lg font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    Delete Favorite
                </Button>
                <Button
                    onClick={handleAddToShoppingCart}
                    className="p-4 text-lg font-semibold bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    Order Favorite
                </Button>
            </div>
        </div>
    );
}
