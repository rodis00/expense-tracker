export async function newIncome({ userId, values, token }) {
  const response = await fetch(
    `http://localhost:8080/expense-tracker/api/v1/incomes/users/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(values),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw error.message;
  }

  const result = await response.json();

  return result;
}

export async function fetchIncomes({
  userId,
  token,
  pageSize,
  year,
  pageNumber,
}) {
  const response = await fetch(
    `http://localhost:8080/expense-tracker/api/v1/incomes/pages/users/${userId}?pageSize=${pageSize}&year=${year}&pageNumber=${pageNumber}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw error.message;
  }

  const result = await response.json();

  return result;
}

export async function fetchIncomeById({ id, token }) {
  const response = await fetch(
    `http://localhost:8080/expense-tracker/api/v1/incomes/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw error.message;
  }

  const result = await response.json();

  return result;
}

export async function updateIncomesById({ id, values, token }) {
  const response = await fetch(
    `http://localhost:8080/expense-tracker/api/v1/incomes/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(values),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw error.message;
  }

  const result = await response.json();

  return result;
}
