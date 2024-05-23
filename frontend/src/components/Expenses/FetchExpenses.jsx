import { expenseActions } from "../../store/expense-slice";

export async function fetchExpenses(
  user,
  token,
  expensePageNumber,
  expenseYear,
  dispatch
) {
  const response = await fetch(
    `http://localhost:8080/expense-tracker/api/v1/expenses/pages/users/${user}?pageNumber=${expensePageNumber}&pageSize=5&year=${expenseYear}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Could not fetch expense data");
  }

  const resData = await response.json();

  dispatch(expenseActions.fetchExpenses(resData.content));
  dispatch(expenseActions.setMaxPages(resData.totalPages));
}
