import Menu from '../../../features/Menu/Menu';
import ShoppingCart from '../../../features/ShoppingCart/ShoppingCart';
import Favorites from "../../../features/Favorites/Favorites.jsx";

export default function MainLayout() {
    return (
        <div className="flex h-screen">
            <div className="w-1/3 bg-gray-100 overflow-y-auto">
                <Menu />
            </div>
            <div className="w-1/3 bg-gray-100 overflow-y-auto">
                <Favorites />
            </div>
            <div className="w-1/3 bg-white border-l shadow-md overflow-y-auto">
                <ShoppingCart />
            </div>
        </div>
    );
}
