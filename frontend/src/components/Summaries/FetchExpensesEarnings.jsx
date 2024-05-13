import { allExpensesActions } from "../../store/allExpenses-slice";
import { allEarningsActions } from "../../store/allEarnings-slice";

export async function fetchAllExpenses(user, token, dispatch) {
  const response = await fetch(
    `http://localhost:8080/expense-tracker/api/v1/expenses/users/${user}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Could not fetch expenses!");
  }

  const resData = await response.json();

  dispatch(allExpensesActions.fetchAllExpenses(resData));
}

export async function fetchAllEarnings(user, token, dispatch) {
  const response = await fetch(
    `http://localhost:8080/expense-tracker/api/v1/earnings/users/${user}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );

  if (!response.ok) {
    throw new Error("Could not fetch expenses");
  }

  const resData = await response.json();

  dispatch(allEarningsActions.fetchAllEarnings(resData));
}
