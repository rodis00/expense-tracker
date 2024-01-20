import React from 'react'
import ExpensesForm from './ExpensesForm'

function NewExpense({ onAddExpense }) {

    function saveExpenseHandler(enteredExpenseData){
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random.toString()
        }
        onAddExpense(expenseData);
    }

  return (
    <div>
        <ExpensesForm onSaveExpenseData={saveExpenseHandler}/>
    </div>
  )
}

export default NewExpense