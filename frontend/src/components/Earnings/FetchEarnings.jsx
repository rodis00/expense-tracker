import { earningsActions } from "../../store/earnings-slice";

export async function fetchEarnings(
  user,
  token,
  earningsPageNumber,
  earningYear,
  dispatch
) {
  const response = await fetch(
    `http://localhost:8080/expense-tracker/api/v1/earnings/pages/users/${user}?pageNumber=${earningsPageNumber}&pageSize=5&year=${earningYear}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Could not fetch earning data");
  }

  const resData = await response.json();

  dispatch(earningsActions.fetchEarnings(resData.content));
  dispatch(earningsActions.setMaxPages(resData.totalPages));
}
