export default function OrderItem({ order }) {
    const { items, payment, email, address, fullName, orderId } = order;

    return (
        <div className="text-xl border p-4 rounded-lg shadow-md mb-4">
            <p><strong>Order ID:</strong>{orderId}</p>
            <p><strong>Full Name:</strong> {fullName}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Address:</strong> {address}</p>
            <p><strong>Payment Method:</strong> {payment}</p>
            <p><strong>Items:</strong></p>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.name} - Quantity: {item.quantity}, Price: {item.price}€
                    </li>

                ))}
            </ul>
            <p><strong>Options: </strong></p>
            <ul>
                {items.map((item, itemIndex) =>
                    item.options ? (
                        <li key={itemIndex}>
                            {item.name} options:
                            <ul>
                                {item.options.map((option, optionIndex) => (
                                    <li key={optionIndex}>
                                        {option.name}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ) : null) }
            </ul>
        </div>
    );
}
