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

  // Helper Functions
  const addItem = (item) => {
    setCurrentOrder([...currentOrder, item]);
  };

  const deleteItem = (idx) => {
    const filteredOrder = currentOrder.filter(
      (item, itemIDX) => itemIDX !== idx
    );
    setCurrentOrder([...filteredOrder]);
  };

  const calculateTotal = () => {
    const total = currentOrder.reduce((acc, cur) => acc + cur.price, 0);
    return total;
  };

  const tidyOrder = () => {
    console.log("Tidy Up Order");
  };

  const closeOrder = () => {
    // setPastOrder([...currentOrder]);
    setPastOrder([...currentOrder]);
    console.log(pastOrder);
    setCurrentOrder([]);
  };

  // Mappings
  const menu = menuData.map((item, idx) => (
    <MenuItem key={idx} item={item} addItem={() => addItem(item)} />
  ));

  const orderList = currentOrder.map((item, idx) => (
    <OrderItem key={idx} item={item} deleteItem={() => deleteItem(idx)} />
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
