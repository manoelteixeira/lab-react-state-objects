export default function MenuItem({ item, addItem }) {
  return (
    <tr onClick={addItem}>
      <td className="item-image">{item.image}</td>
      <td className="item-name">
        <span>{item.name}</span> <br />
        {item.spiceLevel >= 1 && <span>{"🌶️".repeat(item.spiceLevel)}</span>}
      </td>
      <td className="item-price">${item.price}</td>
    </tr>
  );
}
