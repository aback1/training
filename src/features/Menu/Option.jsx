import { useSearchParams } from "react-router-dom";

export default function Option({ option, itemName }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const updateSearchParams = (key, isChecked) => {
        const newParams = new URLSearchParams(searchParams);
        if (isChecked) {
            newParams.set(key, "on");
        } else {
            newParams.delete(key);
        }
        setSearchParams(newParams);
    };

    const paramKey = `${itemName}_${option}`;
    const isChecked = searchParams.get(paramKey) === "on";

    return (
        <div className="flex items-center mb-2">
            <input
                type="checkbox"
                className="mr-2"
                onChange={(e) => updateSearchParams(paramKey, e.target.checked)}
                checked={isChecked}
            />
            <label>{option}</label>
        </div>
    );
}
