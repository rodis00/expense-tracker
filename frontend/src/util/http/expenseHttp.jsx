export async function newExpense({ userId, values, token }) {
    const response = await fetch(
      `http://localhost:8080/expense-tracker/api/v1/expenses/users/${userId}`,
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
  