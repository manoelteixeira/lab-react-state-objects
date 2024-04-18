export default function OrderItem({ item, deleteItem }) {
  return (
    <li>
      <span onClick={deleteItem}>❌</span>
      <span>{item.name}</span>
      <span>${item.price}</span>
    </li>
  );
}
