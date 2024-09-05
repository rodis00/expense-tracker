export async function login(values) {
  const response = await fetch(
    "http://localhost:8080/expense-tracker/api/v1/auth/authenticate",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw error.message;
  }

  const result = await response.json();

  if (!result.token) {
    return null;
  } else {
    localStorage.setItem("token", result.token);
  }
}
