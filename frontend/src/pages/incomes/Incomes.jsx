import React, { useEffect, useState } from "react";
import BarChart from "../../components/charts/BarChart";
import DataPointsSelection from "../../components/transactionComponents/DataPointsSelection";
import Modal from "../../components/modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/modal-slice";
import AddTransactionForm from "../../components/form/AddTransactionForm";
import TransactionList from "../../components/transactionComponents/TransactionList";
import { fetchAllIncomes, fetchIncomes } from "../../http/incomeHttp";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PageNumber from "../../components/transactionComponents/PageNumber";
import { Link } from "react-router-dom";
import AddInfoModal from "../../components/modal/AddInfoModal";
import Percentage from "../../components/transactionComponents/Percentage";
import FullScreenLoader from "../../components/fullScreenLoader/FullScreenLoader";
import useLoader from "../../hooks/useLoader";
import LatestAdded from "../../components/transactionComponents/LatestAdded";

const Incomes = () => {
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
  let incomesAmount = 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["incomes", { userId, token, pageSize, pageNumber, year, month }],
    queryFn: () =>
      fetchIncomes({ userId, token, pageSize, pageNumber, year, month }),
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });

  const { data: allIncomesData, isPending: allIncomesPending } = useQuery({
    queryKey: ["incomes", { userId, token, year, month }],
    queryFn: () => fetchAllIncomes({ userId, token, year, month }),
    enabled: !!userId,
  });

  const isFetching = isPending || allIncomesPending;
  const isLoading = useLoader(isFetching);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (allIncomesData) {
    allIncomesData.forEach((item) => (incomesAmount += item.amount));
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
      <Modal open={version === "form"} className="min-h-full xsm:rounded-3xl">
        <AddTransactionForm upperValue={"Amount"} value={"amount"} />
      </Modal>

      <AddInfoModal version={version} name="incomes" />

      <main className="w-full min-h-screen flex flex-col items-center text-white ">
        <div className="text-center">
          <h1 className="text-xl mt-4 text-neutral-600">Total Incomes</h1>
          <span className="text-3xl text-secondColor">
            {incomesAmount.toFixed(2)}$
          </span>
        </div>
        <DataPointsSelection
          handleSelection={handleDataPointsSelection}
          selectedPoints={chartPoints}
        />
        <BarChart
          selectedPoints={chartPoints}
          name={"incomes"}
          data={allIncomesData}
        />
        <Percentage />

        <div className="flex h-16 items-center mt-8">
          <button
            onClick={handleModalForm}
            className="bg-secondColor w-40 h-12 rounded-full transition-all duration-300 hover:bg-[#28bf8a]"
          >
            Add new income
          </button>
        </div>

        <LatestAdded name="incomes" />

        <h2 className="mt-8 text-4xl">Transactions</h2>

        <TransactionList
          name="incomes"
          data={data}
          isPending={isPending}
          error={error}
          isError={isError}
        />

        <Link
          to={"all-transactions"}
          className="bg-secondColor flex items-center justify-center my-4 w-40 h-12 rounded-full transition-all duration-300 hover:bg-[#28bf8a]"
        >
          Show all incomes
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

export default Incomes;
