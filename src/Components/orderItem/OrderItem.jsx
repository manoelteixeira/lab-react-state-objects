export default function OrderItem({ item, deleteItem }) {
  return (
    <li>
      <span onClick={deleteItem}>❌</span>
      <span>{item.name}</span>
      <span>
        {item.quantity > 1 && `${item.quantity} x `}${item.price}
      </span>
    </li>
  );
}
