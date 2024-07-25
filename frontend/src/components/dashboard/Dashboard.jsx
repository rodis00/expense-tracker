import React from "react";
import LineChart from "../charts/LineChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faArrowTrendDown,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { DUMMY_DATA_EXPENSES } from "../../DummyData";
import DoughnutChart from "../charts/DoughnutChart";

const Dashboard = () => {

  const testArray = DUMMY_DATA_EXPENSES.slice(0,3);

  return (
    <main className="w-full min-h-screen flex flex-col text-white">
      <div className="text-center my-4"><h1 className="text-2xl text-neutral-600">Welcome back</h1><span className="text-3xl font-semibold">User</span></div>
      <div className="flex flex-col lg:flex-row lg:ml-12">
        
        <section className="w-full md:w-3/4 lg:w-[70%] h-full flex flex-col items-center justify-center">
          <ul className="w-full lg:w-[85%] flex flex-col xsm:flex-row justify-center items-center md:gap-8 ">
            <li className="w-[90%] xsm:w-1/3 lg:w-1/3 xsm:h-36 h-20 xlg:h-24 bg-thirdColor shadow-lg shadow-neutral-0 lg:shadow-neutral-800 mt-4 xsm:mt-0"><div className="w-full h-full flex xsm:flex-col xlg:flex-row items-center"><div className="w-14 h-14 mx-4 border-2 border-yellow-500 flex justify-center items-center xsm:mt-4 xlg:mt-0"><FontAwesomeIcon icon={faArrowTrendUp} className="text-2xl"/></div><div className="grow xsm:text-center xlg:text-left"><h2 className="text-neutral-600 text-lg xlg:text-xl mt-2 xlg:mt-0">Available Balance</h2><span className="text-xl xlg:text-2xl">amount</span></div></div></li>
            <li className="w-[90%] xsm:w-1/3 lg:w-1/3 xsm:h-36 h-20 xlg:h-24 bg-thirdColor shadow-lg shadow-neutral-0 lg:shadow-neutral-800 mt-4 xsm:mt-0"><div className="w-full h-full flex xsm:flex-col xlg:flex-row items-center"><div className="w-14 h-14 mx-4 border-2 border-secondColor flex justify-center items-center xsm:mt-4 xlg:mt-0"><FontAwesomeIcon icon={faArrowTrendUp} className="text-2xl"/></div><div className="grow xsm:text-center xlg:text-left"><h2 className="text-neutral-600 text-lg xlg:text-xl mt-2 xlg:mt-0">Incomes</h2><span className="text-xl xlg:text-2xl">amount</span></div></div></li>
            <li className="w-[90%] xsm:w-1/3 lg:w-1/3 xsm:h-36 h-20 xlg:h-24 bg-thirdColor shadow-lg shadow-neutral-0 lg:shadow-neutral-800 mt-4 xsm:mt-0"><div className="w-full h-full flex xsm:flex-col xlg:flex-row items-center"><div className="w-14 h-14 mx-4 border-2 border-red-400 flex justify-center items-center xsm:mt-4 xlg:mt-0"><FontAwesomeIcon icon={faArrowTrendDown} className="text-2xl"/></div><div className="grow xsm:text-center xlg:text-left"><h2 className="text-neutral-600 text-lg xlg:text-xl mt-2 xlg:mt-0">Expenses</h2><span className="text-xl xlg:text-2xl">amount</span></div></div></li>
          </ul>
          <div className="w-full flex justify-center">
            <LineChart/>
          </div>
        </section>

        <aside className="w-full md:w-3/4 flex flex-col items-center lg:w-[30%] h-full">
          <h2 className="text-center text-2xl -mt-2 font-semibold">Recently Added</h2>
          <ul className="w-[95%] mt-8">
            {testArray.map(item=>(
              <li key={item.id} className="w-full h-20 rounded-full bg-thirdColor flex justify-between items-center mb-4">
                <div className="h-14 w-14 sm:h-16 sm:w-16 border-2 border-secondColor rounded-full ml-2 sm:ml-4 flex justify-center items-center"><FontAwesomeIcon icon={faBriefcase} className="text-2xl"/></div>

                <h3 className="text-xl text-left pl-4 grow">{item.title}</h3>
                  <p className="pr-4 text-center text-red-500">{item.amount}$</p>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4 w-[95%]"><p className="text-neutral-600 pl-4">min</p><h2 className="text-xl">Salary</h2><p className="text-neutral-600 pr-4">max</p></div>
          <div className="flex w-[95%] h-12 mt-2 items-center justify-between rounded-3xl bg-thirdColor">
            <p className="pl-4 text-secondColor">200$</p>
            <p className="pr-4 text-secondColor">10000$</p>
          </div>
          <div className="flex justify-between mt-4 w-[95%]"><p className="text-neutral-600 pl-4">min</p><h2 className="text-xl">Expense</h2><p className="text-neutral-600 pr-4">max</p></div>
          <div className="flex w-[95%] h-12 mt-2 items-center justify-between rounded-3xl bg-thirdColor mb-4">
            <p className="pl-4 text-red-500">100$</p>
            <p className="pr-4 text-red-500">5000$</p>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Dashboard;
