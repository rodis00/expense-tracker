import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import BarChart from "../charts/BarChart";
import DataPointsSelection from "../../util/DataPointsSelection";
import Modal from "../modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/modal-slice";
import AddTransactionForm from "../../util/AddTransactionForm";
import TransactionList from "../../util/TransactionList";
import { fetchIncomes } from "../../util/http/incomeHttp";
import { useQuery } from "@tanstack/react-query";
import PageNumber from "../../util/PageNumber";
import { Link } from "react-router-dom";
import AddInfoModal from "../../util/AddInfoModal";

const Incomes = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [chartPoints, setChartPoints] = useState("Monthly");
  const userId = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("token");
  const pageSize = 5;
  let incomesAmount = 0;

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["incomes", { userId, token, pageNumber }],
    queryFn: () => fetchIncomes({ userId, token, pageSize, pageNumber }),
    enabled: !!userId,
  });

  if (data) {
    data.content.forEach((item) => (incomesAmount += item.amount));
  }

  const handleDataPointsSelection = (selectedPoints) => {
    setChartPoints(selectedPoints);
  };

  const dispatch = useDispatch();
  const version = useSelector((state) => state.modal.modalVersion);

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
      <Modal open={version === "form"}>
        <AddTransactionForm upperValue={"Amount"} value={"amount"} />
      </Modal>

      <AddInfoModal version={version} name="incomes" />

      <main className="w-full min-h-screen flex flex-col items-center text-white ">
        <div className="text-center">
          <h1 className="text-xl mt-4 text-neutral-600">Total Incomes</h1>
          <span className="text-3xl text-secondColor">{incomesAmount}$</span>
        </div>
        <DataPointsSelection
          handleSelection={handleDataPointsSelection}
          selectedPoints={chartPoints}
        />
        <BarChart selectedPoints={chartPoints} name={"incomes"} data={data} />
        <div className="w-[95%] sm:w-3/4 md:w-1/2 lg:w-1/3 h-20 lg:h-16 mt-4 bg-thirdColor rounded-full flex items-center justify-around text-lg shadow-lg shadow-neutral-800">
          <span className="text-secondColor w-28 pl-4 text-xl">
            <FontAwesomeIcon icon={faArrowUp} /> 45%
          </span>
          <p className="pl-2 pr-4 sm:pr-8 md:pr-4">
            This month you are receving more/less than usual
          </p>
        </div>

        <div className="flex h-16 items-center mt-8">
          <button
            onClick={handleModalForm}
            className="bg-secondColor w-40 h-12 rounded-full transition-all duration-300 hover:bg-[#28bf8a]"
          >
            Add new income
          </button>
        </div>

        <h2 className="mt-16 text-4xl">Transactions</h2>

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
