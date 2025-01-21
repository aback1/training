import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, incrementByAmount } from "../../features/shoppingCart/ShoppingCartSlice";
import { addFavorite } from "../Favorites/favoritesSlice.js";
import Option from "./Option";
import Icon from "../../common/components/Icon/Icon";
import Button from "../../common/components/Button/Button.jsx";
import { v4 as uuidv4 } from "uuid";

export default function MenuItem({ item }) {
    const { id, name, options, price } = item;
    const newFavoriteId = uuidv4();

    const favoriteItems = useSelector((state) => state.favorites.items);
    const [amount, setAmount] = useState(1);
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.shoppingCart.items) || [];

    const handleIncAmount = () => {
        setAmount((prevAmount) => prevAmount + 1);
    };

    const handleDecAmount = () => {
        if (amount > 1) {
            setAmount((prevAmount) => prevAmount - 1);
        }
    };
    //all options that are set to on in the URL
    const selectedOptions = options
        .map((option) => {
            const isSelected = searchParams.get(`${name}_${option}`) === "on"; // Use prefixed key
            return isSelected ? { name: option, selected: true } : null;
        })
        .filter((option) => option !== null);

    const handleAddItemToCart = () => {
        const existingItem = cartItems.find(
            (cartItem) =>
                cartItem.name === name &&
                JSON.stringify(cartItem.options) === JSON.stringify(selectedOptions)
        );

        if (existingItem) {
            dispatch(incrementByAmount({ id: existingItem.id, amount }));
        } else {
            const newItem = {
                id: uuidv4(),
                name,
                price,
                amount,
                options: selectedOptions,
            };

            dispatch(addItem(newItem));
        }
    };

    const handleSetFavourite = () => {

        const newFavorite = {
            id: newFavoriteId,
            name,
            price,
            amount,
            options: selectedOptions,
        };

        const existingItem = favoriteItems.find(
            (favoriteItems) =>
                favoriteItems.name === newFavorite.name && (
                    JSON.stringify(favoriteItems.options) === JSON.stringify(newFavorite.options)
                )
        );

        if(existingItem) {
            alert("The item that you wanted to mark as a favorite is already in the list of favorite items!");
        }
        else {
             dispatch(addFavorite(newFavorite));
        }

    };

    const totalCost = (price * amount).toFixed(2);

    return (
        <div className="border p-4 rounded-lg shadow-md mb-4 flex items-start w-2/3 h-50">
            <Icon name={name} ending="jpg" />
            <div className="ml-4">
                <h2 className="text-xl font-bold mb-2">{name}</h2>
                <div>
                    <h2 className="text-l font-bold">Options:</h2>
                    {options.map((option) => (
                        <Option key={`${name}_${option}`} option={option} itemName={name} />
                    ))}
                    <p className="text-l font-bold">{totalCost}€</p>
                    <Button onClick={handleAddItemToCart}>Add to Cart</Button>
                    <div className="flex items-center justify-center mt-2">
                        <Button onClick={handleDecAmount}>-</Button>
                        <p className="mx-8">{amount}</p>
                        <Button onClick={handleIncAmount}>+</Button>
                    </div>
                </div>
            </div>
            <div className="ml-4">
                <Button className="mb-200 p-4" onClick={handleSetFavourite}>
                    <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                </Button>
            </div>
        </div>
    );
}
