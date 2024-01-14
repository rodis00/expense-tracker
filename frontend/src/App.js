import "./App.css";
import Nav from "./components/Nav/Nav";
function App() {
  return (
    <>
      <Nav />
      <main>
        <form action="">
          <label htmlFor="">Expense</label>
          <input type="text" />
          <label htmlFor="">Amount</label>
          <input type="number" name="" id="" />
          <label htmlFor="">Date</label>
          <input type="date" />
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}

export default App;
