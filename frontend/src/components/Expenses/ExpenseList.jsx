import React from 'react'
import ExpenseItem from './ExpenseItem';
import classes from './ExpenseList.module.css'

function ExpenseList({items}) {

  if(items.length === 0) {
    return <h2 className={classes.list}>Found no expenses.</h2>
  }

  return (
    <ul className={classes.list}>
        {items.map(prev => (
          <ExpenseItem key={Math.random.toString()} title={prev.title} price={prev.price} date={prev.date}/>
        ))}
    </ul>
  )
}

export default ExpenseList