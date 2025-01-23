import React, { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const Option = React.memo(({ option, itemName }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Memoize the updateSearchParams function
    const updateSearchParams = useCallback(
        (key, isChecked) => {
            const newParams = new URLSearchParams(searchParams);
            if (isChecked) {
                newParams.set(key, "on");
            } else {
                newParams.delete(key);
            }
            setSearchParams(newParams);
        },
        [searchParams, setSearchParams] // Dependencies
    );

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
});

export default Option;
