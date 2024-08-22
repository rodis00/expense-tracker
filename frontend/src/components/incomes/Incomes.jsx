import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faShirt,
  faBriefcase,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import BarChart from "../charts/BarChart";
import DataPointsSelection from "../../util/DataPointsSelection";
import Modal from "../modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/modal-slice";
import AddTransactionForm from "../../util/AddTransactionForm";

const Incomes = () => {
  const [chartPoints, setChartPoints] = useState("Monthly");

  const handleDataPointsSelection = (selectedPoints) => {
    setChartPoints(selectedPoints);
  };

  const dispatch = useDispatch();
  const version = useSelector((state) => state.modal.modalVersion);

  const handleModalForm = () => {
    dispatch(modalActions.showForm());
  };

  return (
    <>
      <Modal open={version === "form"}>
        <AddTransactionForm />
      </Modal>

      <main className="w-full min-h-screen flex flex-col items-center text-white ">
        <div className="text-center">
          <h1 className="text-xl mt-4 text-neutral-600">Total Incomes</h1>
          <span className="text-3xl text-secondColor">$40000</span>
        </div>
        <DataPointsSelection
          handleSelection={handleDataPointsSelection}
          selectedPoints={chartPoints}
        />
        <BarChart selectedPoints={chartPoints} name={"incomes"} />
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
        <ul className="w-[95%] sm:w-3/4 lg:w-1/2 mt-8">
          <li className="w-full h-20 rounded-full bg-thirdColor flex justify-between items-center mb-4">
            <div className="h-14 w-14 sm:h-16 sm:w-16 border-2 border-secondColor rounded-full ml-2 sm:ml-4 flex justify-center items-center">
              <FontAwesomeIcon icon={faBriefcase} className="text-2xl" />
            </div>
            <div className="pl-4 flex flex-col gap-2 grow">
              <h3 className="text-xl">title</h3>
              <div className="flex">
                <p>Amount - date</p>
              </div>
            </div>
            <button className="w-12 h-12 xsm:w-14 lg:w-16 xsm:h-14 lg:h-16 mr-2 sm:mr-4 bg-secondColor rounded-full transition-all duration-300 hover:bg-[#28bf8a]">
              <FontAwesomeIcon
                icon={faEye}
                className="text-lg xsm:text-xl lg:text-2xl"
              />
            </button>
          </li>
          <li className="w-full h-20 rounded-full bg-thirdColor flex justify-between items-center mb-4">
            <div className="h-14 w-14 sm:h-16 sm:w-16 border-2 border-secondColor rounded-full ml-2 sm:ml-4 flex justify-center items-center">
              <FontAwesomeIcon icon={faShirt} className="text-2xl" />
            </div>
            <div className="pl-4 flex flex-col gap-4 grow">
              <h3 className="text-xl">title</h3>
              <div className="flex">
                <p>Amount - date</p>
              </div>
            </div>
            <button className="w-12 h-12 xsm:w-14 lg:w-16 xsm:h-14 lg:h-16 mr-2 sm:mr-4 bg-secondColor rounded-full transition-all duration-300 hover:bg-[#28bf8a]">
              <FontAwesomeIcon
                icon={faEye}
                className="text-lg xsm:text-xl lg:text-2xl"
              />
            </button>
          </li>
        </ul>
        <div className="h-16 my-8 flex items-center gap-8">
          <button className="w-16 h-full rounded-full bg-neutral-800 transition-all duration-300 hover:bg-neutral-700">
            Prev
          </button>
          <span className="text-xl">1</span>
          <button className="w-16 h-full rounded-full bg-neutral-800 transition-all duration-300 hover:bg-neutral-700">
            Next
          </button>
        </div>
      </main>
    </>
  );
};

export default Incomes;
