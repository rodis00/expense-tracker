import React, { useEffect, useState } from "react";
import BarChart from "../../components/charts/BarChart";
import DataPointsSelection from "../../components/transactionComponents/DataPointsSelection";
import Modal from "../../components/modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/modal-slice";
import AddTransactionForm from "../../components/form/AddTransactionForm";
import TransactionList from "../../components/transactionComponents/TransactionList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAllExpenses, fetchExpenses } from "../../http/expenseHttp";
import PageNumber from "../../components/transactionComponents/PageNumber";
import { Link } from "react-router-dom";
import AddInfoModal from "../../components/modal/AddInfoModal";
import Percentage from "../../components/transactionComponents/Percentage";
import FullScreenLoader from "../../components/fullScreenLoader/FullScreenLoader";
import useLoader from "../../hooks/useLoader";

const Expenses = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [chartPoints, setChartPoints] = useState("Monthly");
  const userId = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const version = useSelector((state) => state.modal.modalVersion);
  const token = localStorage.getItem("token");
  const pageSize = 5;
  const year =
    chartPoints === "Monthly" || chartPoints === "Weekly"
      ? new Date().getFullYear()
      : "";
  const month = chartPoints === "Weekly" ? new Date().getMonth() + 1 : "";
  let expensesPrice = 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isPending, error, isError } = useQuery({
    queryKey: [
      "expenses",
      { userId, token, pageNumber, pageSize, month, year },
    ],
    queryFn: () =>
      fetchExpenses({ userId, token, pageSize, year, month, pageNumber }),
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });

  const { data: allExpensesData, isPending: allExpensesPending } = useQuery({
    queryKey: ["expenses", { userId, token, year, month }],
    queryFn: () => fetchAllExpenses({ userId, token, year, month }),
    enabled: !!userId,
  });

  const isFetching = isPending || allExpensesPending;
  const isLoading = useLoader(isFetching);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (allExpensesData) {
    allExpensesData.forEach((item) => (expensesPrice += item.price));
  }

  const handleDataPointsSelection = (selectedPoints) => {
    setChartPoints(selectedPoints);
  };

  const handleModalForm = () => {
    dispatch(modalActions.showForm());
  };

  function pageIncrement() {
    setPageNumber((prev) => prev + 1);
  }

  function pageDecrement() {
    setPageNumber((prev) => prev - 1);
  }

  return (
    <>
      <Modal open={version === "form"} className="min-h-full">
        <AddTransactionForm upperValue={"Price"} value={"price"} />
      </Modal>

      <AddInfoModal version={version} name="expenses" />

      <main className="w-full min-h-screen flex flex-col items-center text-white">
        <div className="text-center">
          <h1 className="text-xl mt-4 text-neutral-600">Total Expenses</h1>
          <span className="text-3xl text-red-500">
            {expensesPrice.toFixed(2)}$
          </span>
        </div>
        <DataPointsSelection
          handleSelection={handleDataPointsSelection}
          selectedPoints={chartPoints}
        />
        <BarChart
          selectedPoints={chartPoints}
          name={"expenses"}
          data={allExpensesData}
        />
        <Percentage />

        <div className="flex h-16 items-center gap-12 mt-8">
          <button
            onClick={handleModalForm}
            className="bg-secondColor w-40 h-12 rounded-full transition-all duration-300 hover:bg-[#28bf8a]"
          >
            Add new expense
          </button>
        </div>

        <h2 className="mt-16 text-4xl">Transactions</h2>
        <TransactionList
          name="expenses"
          data={data}
          isPending={isPending}
          error={error}
          isError={isError}
        />

        <Link
          to={"all-transactions"}
          className="bg-secondColor flex items-center justify-center my-4 w-40 h-12 rounded-full transition-all duration-300 hover:bg-[#28bf8a]"
        >
          Show all expenses
        </Link>

        {data && (
          <PageNumber
            maxPage={data.totalPages}
            page={pageNumber}
            increase={pageIncrement}
            decrease={pageDecrement}
          />
        )}
      </main>
    </>
  );
};

export default Expenses;
