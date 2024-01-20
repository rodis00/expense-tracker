import React, { useState } from "react";
import NewExpense from "./NewExpense";

function Expenses() {
  
  const [expenses, setExpenses] = useState();

  function handleNewExpense(expense){
    setExpenses((prevExpense)=>{
      return[expense, ...prevExpense];
    })
  }

  return (
    <div>
      <NewExpense onAddExpense={handleNewExpense}/>
    </div>
  );
}

export default Expenses;
