import React from 'react'

function Earnings() {
  return (
    <div className={classes.boxForm}>
    <form action="" className={classes.earningsForm}>
      <div className={classes.earningsForm__earningsData}>
        <div className={classes.earningsForm__earningData}>
          <label>Expense Title</label>
          <input type="text" />
        </div>
        <div className={classes.earningsForm__earningData}>
          <label>Price</label>
          <input type="number" name="" id="" />
        </div>
        <div className={classes.earningsForm__earningData}>
          <label>Date</label>
          <input type="date" />
        </div>
      </div>
      <button type="submit" className={classes.earningsForm__btn}>Add expense</button>
    </form>
    </div>
  )
}

export default Earnings