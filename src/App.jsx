import { useState } from "react";
import Footer from "./Components/footer/Footer";
import Header from "./Components/header/Header";
import MenuItem from "./Components/menuItem/MenuItem";
import OrderItem from "./Components/orderItem/OrderItem";
import menuData from "./data";

function App() {
  // States
  const [currentOrder, setCurrentOrder] = useState([]);
  const [pastOrder, setPastOrder] = useState([]);
  const [tidy, setTidy] = useState(false);

  // Helper Functions
  const getCurrentOrderIDS = () => {
    return [...new Set(currentOrder.map((item) => item.id))];
  };

  const addItem = (item) => {
    if (!tidy || !getCurrentOrderIDS().includes(item.id)) {
      const newItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      };
      setCurrentOrder([...currentOrder, newItem]);
    } else {
      const order = [...currentOrder];
      order.map((i) => {
        if (i.id == item.id) {
          i.quantity++;
        }
      });
      setCurrentOrder([...order]);
    }
  };

  const deleteItem = (item) => {
    const idx = currentOrder.indexOf(item);
    if (!tidy || item.quantity == 1) {
      const filteredOrder = currentOrder.filter(
        (item, itemIDX) => itemIDX !== idx
      );
      setCurrentOrder([...filteredOrder]);
    } else {
      const order = [...currentOrder];
      order[idx].quantity--;
      setCurrentOrder([...order]);
    }
  };

  const calculateTotal = () => {
    const total = currentOrder.reduce(
      (acc, cur) => acc + cur.quantity * cur.price,
      0
    );
    return total;
  };

  const tidyOrder = () => {
    const itemIDs = getCurrentOrderIDS();
    const order = [];
    for (const id of itemIDs) {
      const itemsArr = currentOrder.filter((item) => item.id == id);
      let quantity = 0;
      for (const item of itemsArr) {
        quantity += item.quantity;
      }
      const newItem = itemsArr[0];
      newItem.quantity = quantity;
      order.push(newItem);
    }
    if (!tidy) {
      setTidy(true);
    }
    setCurrentOrder([...order]);
  };

  const closeOrder = () => {
    setPastOrder([...currentOrder]);
    console.log(pastOrder);
    setCurrentOrder([]);
  };

  // Mappings
  const menu = menuData.map((item, idx) => (
    <MenuItem key={idx} item={item} addItem={() => addItem(item)} />
  ));

  const orderList = currentOrder.map((item, idx) => (
    <OrderItem key={idx} item={item} deleteItem={() => deleteItem(item)} />
  ));

  // Output
  return (
    <div className="App">
      <Header />
      <main>
        <aside>
          <table>
            <tbody>{menu}</tbody>
          </table>
        </aside>
        <section>
          <div>
            <h2>Current Order</h2>
            <ul>{orderList}</ul>
            <h4>Total: ${calculateTotal()}</h4>
            <div>
              <button onClick={tidyOrder}>Tidy order</button>
              <button onClick={closeOrder}>Close order</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
