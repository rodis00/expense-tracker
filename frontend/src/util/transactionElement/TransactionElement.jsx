import React, { useState } from "react";
import TransactionElementLayoutForm from "./TransactionElementLayoutForm";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { fetchIncomeById } from "../http/incomeHttp";
import { fetchExpenseById } from "../http/expenseHttp";

const TransactionElement = () => {
  const [isEditting, setIsEditting] = useState(false);
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const resourceType = pathParts[1];
  const id = pathParts[2];
  const token = localStorage.getItem("token");

  const { data, isLoading, isError, error } = useQuery({
    queryKey:
      resourceType === "incomes"
        ? ["incomes", { id, token }]
        : ["expenses", { id, token }],
    queryFn:
      resourceType === "incomes"
        ? () => fetchIncomeById({ id, token })
        : () => fetchExpenseById({ id, token }),
  });

  function handleEditting() {
    setIsEditting(true);
  }

  function handleCloseEditting() {
    setIsEditting(false);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-full md:w-3/4 lg:w-1/2 xlg:w-1/3 min-h-full md:min-h-[40rem] bg-fourthColor flex flex-col rounded-3xl">
        {data && (
          <TransactionElementLayoutForm
            id={id}
            data={data}
            token={token}
            name={resourceType}
            isEditting={isEditting}
            startEditting={handleEditting}
            closeEditting={handleCloseEditting}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionElement;
