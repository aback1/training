import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
    setEmail,
    setPayment,
    setAddress,
    setFullName,
    setAllCredentialsentered
} from "./shoppingCartSlice.js";
import {useDispatch} from "react-redux";

export default function OrderCredentialsForm() {
    const [fullName, setFullUserName] = useState("");
    const [email, setUserEmail] = useState("");
    const [address, setUserAddress] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();



    const paymentOption = searchParams.get("payment") || "paypal"; //Default paypal
    const dispatch = useDispatch();
    const updateSearchParams = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(key, value);
        setSearchParams(newParams);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Name: ${fullName}\nEmail: ${email}\nAddress: ${address}\nPayment: ${paymentOption}`);
        dispatch(setEmail(email));
        dispatch(setAddress(address));
        dispatch(setFullName(fullName));
        dispatch(setPayment(paymentOption));
        dispatch(setAllCredentialsentered(true));
    };

    return (
        <form
            className="max-w-4xl mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg"
            onSubmit={handleSubmit}
        >
            <h2 className="text-2xl font-bold mb-6">Order Credentials Form</h2>
            <div className="mb-4">
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                    Full Name
                </label>
                <input
                    type="text"
                    id="name"
                    value={fullName}
                    onChange={(e) => setFullUserName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="address" className="block text-lg font-medium text-gray-700">
                    Address
                </label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setUserAddress(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-md"
                />
            </div>
            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">Payment Option</label>
                <div className="flex space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="payment"
                            value="paypal"
                            checked={paymentOption === "paypal"}
                            onChange={() => updateSearchParams("payment", "paypal")}
                            className="mr-2"
                        />
                        PayPal
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="payment"
                            value="creditcard"
                            checked={paymentOption === "creditcard"}
                            onChange={() => updateSearchParams("payment", "creditcard")}
                            className="mr-2"
                        />
                        Credit Card
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="payment"
                            value="cash"
                            checked={paymentOption === "cash"}
                            onChange={() => updateSearchParams("payment", "cash")}
                            className="mr-2"
                        />
                        Cash
                    </label>
                </div>
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
                Continue with delivery
            </button>
        </form>
    );
}
