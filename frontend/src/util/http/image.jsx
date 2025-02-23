export async function uploadImage({ userId, token, image }) {
  const formData = new FormData();
  formData.append("file", image);

  const response = await fetch(
    `http://localhost:8080/expense-tracker/api/v1/images/upload/users/${userId}`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw error.message;
  }

  const result = await response.json();

  return result;
}

export async function getImage(path, token) {
  const response = await fetch(
    `http://localhost:8080/expense-tracker/api/v1/images?path=${path}`,
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

  const result = await response.blob();

  return result;
}
