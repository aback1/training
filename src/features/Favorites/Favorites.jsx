import {useDispatch, useSelector} from "react-redux";
import FavoriteItem from "./FavoriteItem.jsx";
import Button from "../../common/components/Button/Button.jsx";
import {clearFavorites} from "./favoritesSlice.js";

export default function Favorites() {

    const favorites = useSelector((state) => state.favorites.items);
    const dispatch = useDispatch();

    return (
        <>
            <h1 className="text-2xl font-bold font-black">
                Ihre Favoriten
            </h1>

            {favorites.map((item) => (
                <FavoriteItem key={item.id} item={item}/>
            ))
            }
            <div className="p-4">
                <Button onClick={() => dispatch(clearFavorites())}>Clear Favorites</Button>
            </div>
        </>


    )
}