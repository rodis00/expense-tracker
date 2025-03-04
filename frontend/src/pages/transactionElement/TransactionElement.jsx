import React, { useState } from "react";
import TransactionElementLayoutForm from "./TransactionElementLayoutForm";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { fetchIncomeById } from "../../http/incomeHttp";
import { fetchExpenseById } from "../../http/expenseHttp";
import FullScreenLoader from "../../components/fullScreenLoader/FullScreenLoader";
import useLoader from "../../hooks/useLoader";

const TransactionElement = () => {
  const [isEditting, setIsEditting] = useState(false);
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const resourceType = pathParts[1];
  const additionalResource = pathParts[2];
  const id = pathParts[pathParts.length - 1];
  const token = localStorage.getItem("token");

  const { data, isPending, isError, error } = useQuery({
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

  const isLoading = useLoader(isPending);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (isError) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-full md:w-3/4 lg:w-1/2 xlg:w-1/2 min-h-screen flex flex-col rounded-3xl">
        {data && (
          <TransactionElementLayoutForm
            id={id}
            data={data}
            token={token}
            name={resourceType}
            isEditting={isEditting}
            startEditting={handleEditting}
            closeEditting={handleCloseEditting}
            url={additionalResource}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionElement;
