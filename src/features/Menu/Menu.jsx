import MenuItem from './MenuItem';
import { useFetchFoodQuery } from "./menuApi.js";
import {selectCartAmount} from "../ShoppingCart/shoppingCartSlice.js";

export default function Menu() {
    const { data: foodData, error, isLoading } = useFetchFoodQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!foodData || foodData.length === 0) {
        return <div>No Food available :(</div>;
    }

    return (
        <div>
            {foodData.map((item) => (
                <MenuItem key={item.id} item={item} />
            ))}
        </div>
    );
}
























