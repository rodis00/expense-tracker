import React, { useEffect } from "react";
import chart from "../../assets/chart.svg";
import money from "../../assets/money.svg";
import lines from "../../assets/lines-for-background.svg";
import cards from "../../assets/cards.svg";
import formImage from "../../assets/formImage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowTrendUp,
  faArrowTrendDown,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import "./Home.css";
import BarChart from "../charts/BarChart";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <header className="w-full h-screen overflow-x-hidden">
        <img
          src={cards}
          alt=""
          className="absolute top-10 z-20 w-8/12 left-1/3 xsm:w-6/12 xsm:left-1/2 sm:w-5/12 sm:left-[calc(100%-41.666667%)] md:w-4/12 md:left-2/3 lg:top-0 lg:left2/3"
        />
        <img
          src={chart}
          alt="chart without any points"
          className="h-32 sm:h-40 lg:h-48 w-full relative z-10"
        />
        <img
          src={money}
          alt="coins stacked on top of each other"
          className="w-48 sm:w-56 lg:w-64 m-10 relative sm:left-10 lg:left-20 z-10"
        />
        <img
          src={lines}
          alt=""
          className="absolute left-0 bottom-0 w-3/4 sm:w-7/12 lg:w-5/12"
        />
        <div className="text-white text-3xl text-center font-bold mx-5 my-12 xsm:mt-20 relative sm:my-10 sm:text-4xl">
          Take Control of Your Finances
        </div>
        <p className="text-white text-base sm:text-lg mx-7 text-center relative">
          Gain control of your money and track your expenses and incomes
        </p>
        <button
          onClick={handleScroll}
          className="border-0 flex justify-center items-center bg-secondColor w-12 h-12  sm:w-14 sm:h-14 rounded-full absolute top-[calc(100%-90px)] left-[calc(50%-1.75rem)]"
        >
          <FontAwesomeIcon
            icon={faArrowDown}
            className="text-white text-2xl sm:text-3x1"
          />
        </button>
      </header>

      <main className="overflow-x-hidden">
        <h2 className="w-3/4 mx-auto text-center mt-20 text-white text-2xl font-semibold">
          View your transactions in separate places and in different ways
        </h2>
        <div></div>
        <section className="w-full bg-main mt-20 flex justify-center">
          <div className=" w-full lg:w-[85%] flex flex-col lg:flex-row items-center justify-center gap-12">
            <div
              className="w-[90%] xsm:w-[85%] sm:w-3/4 md:w-1/2 lg:w-1/3 xlg:w-1/4 h-80 rounded-3xl text-white"
              id="infoItem1"
            >
              <div className="w-full h-full bg-section rounded-3xl flex flex-col items-center gap-8">
                <div className="w-14 h-14 mt-8 border-2 border-solid border-[#28bf8a] flex items-center justify-center">
                  <FontAwesomeIcon icon={faArrowTrendUp} className="text-2xl" />
                </div>
                <h2 className="text-xl uppercase text-[#28bf8a] font-bold">
                  Incomes
                </h2>
                <p className="text-center text-lg px-8">
                  See what activities you have recently received income
                </p>
              </div>
            </div>

            <div
              className="w-[90%] xsm:w-[85%] sm:w-3/4 md:w-1/2 lg:w-1/3 xlg:w-1/4 h-80 rounded-3xl text-white"
              id="infoItem3"
            >
              <div className="w-full h-full bg-section rounded-3xl flex flex-col items-center gap-8">
                <div className="w-14 h-14 mt-8 border-2 border-solid border-amber-300 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faMoneyCheckDollar}
                    className="text-2xl"
                  />
                </div>
                <h2 className="text-xl uppercase text-amber-300 font-bold">
                  Summaries
                </h2>
                <p className="text-center text-lg px-8">
                  Compare your income against your expenses and see how much you
                  managed to save
                </p>
              </div>
            </div>

            <div
              className="w-[90%] xsm:w-[85%] sm:w-3/4 md:w-1/2 lg:w-1/3 xlg:w-1/4 h-80 rounded-3xl text-white"
              id="infoItem2"
            >
              <div className="w-full h-full bg-section rounded-3xl flex flex-col items-center gap-8">
                <div className="w-14 h-14 mt-8 border-2 border-solid border-[#8f0000] flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faArrowTrendDown}
                    className="text-2xl"
                  />
                </div>
                <h2 className="text-xl uppercase text-[#8f0000] font-bold">
                  Expenses
                </h2>
                <p className="text-center text-lg px-8">
                  Check your expenses you have made recently
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col lg:flex-row justify-center pb-12 mt-20 bg-thirdColor lg:gap-4 xlg:gap-0">
          <div className="w-full md:w-4/5 lg:w-2/5 flex flex-col items-center justify-between mx-auto lg:mx-0">
            <h3 className="text-center my-20 text-white text-2xl w-4/5 lg:w-2/3 xlg:w-1/2">
              Plan your budget for your goals with saving plans!
            </h3>
            <div className="w-full flex justify-center gap-2 lg:gap-4 text-white">
              <div className="bg-fourthColor h-24 w-40 rounded-3xl">
                <h3 className="text-neutral-600 pl-4 pt-2">House</h3>
                <p className="pl-4 text-xl font-semibold">200000$</p>
                <progress
                  value={20000}
                  max={200000}
                  className="h-2 w-[80%] [&::-webkit-progress-bar]:rounded-3xl [&::-webkit-progress-value]:rounded-3xl [&::-webkit-progress-bar]:bg-neutral-700 [&::-webkit-progress-value]:bg-[#28bf8a] block mx-auto mt-4"
                />
              </div>
              <div className="bg-fourthColor h-24 w-40 rounded-3xl">
                <h3 className="text-neutral-600 pl-4 pt-2">Car</h3>
                <p className="pl-4 text-xl font-semibold">15000$</p>
                <progress
                  value={9600}
                  max={15000}
                  className="h-2 w-[80%] [&::-webkit-progress-bar]:rounded-3xl [&::-webkit-progress-value]:rounded-3xl [&::-webkit-progress-bar]:bg-neutral-700 [&::-webkit-progress-value]:bg-[#28bf8a] block mx-auto mt-4"
                />
              </div>
              <div className="bg-fourthColor h-24 w-40 rounded-3xl">
                <h3 className="text-neutral-600 pl-4 pt-2">Books</h3>
                <p className="pl-4 text-xl font-semibold">1000$</p>
                <progress
                  value={550}
                  max={1000}
                  className="h-2 w-[80%] [&::-webkit-progress-bar]:rounded-3xl [&::-webkit-progress-value]:rounded-3xl [&::-webkit-progress-bar]:bg-neutral-700 [&::-webkit-progress-value]:bg-[#28bf8a] block mx-auto mt-4"
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-4/5 lg:w-2/5 flex flex-col items-center mx-auto lg:mx-0">
            <h3 className="text-center my-20 text-white text-2xl w-4/5 lg:w-2/3 xlg:w-1/2">
              Schedule your payments that will be added whenever you want!
            </h3>
            <div className="w-full flex justify-center gap-2 lg:gap-4 text-white">
              <div className="min-h-24 pb-2 xlg:pb-0 w-40 bg-fourthColor rounded-3xl">
                <h3 className="text-neutral-600 pl-4 pt-2">Rent</h3>
                <p className="pl-4 text-xl font-semibold">200$</p>
                <p className="pl-4 text-sm text-amber-300">Once - 28.09.2024</p>
              </div>
              <div className="min-h-24 pb-2 xlg:pb-0 w-40 bg-fourthColor rounded-3xl">
                <h3 className="text-neutral-600 pl-4 pt-2">Netflix</h3>
                <p className="pl-4 text-xl font-semibold">20$</p>
                <p className="pl-4 text-sm text-amber-300">
                  Monthly - 28.09.2024
                </p>
              </div>
              <div className="min-h-24 pb-2 xlg:pb-0 w-40 bg-fourthColor rounded-3xl">
                <h3 className="text-neutral-600 pl-4 pt-2">Car insurance</h3>
                <p className="pl-4 text-xl font-semibold">500$</p>
                <p className="pl-4 text-sm text-amber-300">
                  Yearly - 28.09.2024
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12 flex flex-col items-center">
          <h3 className="text-center my-20 text-white text-2xl w-[90%]">
            Add your transactions with form and display them using charts!
          </h3>
          <div className="w-full flex justify-center">
            <div className="w-full lg:w-4/5 flex flex-col lg:flex-row gap-8 items-center ">
              <div className="flex justify-center w-full lg:w-3/5">
                <BarChart
                  selectedPoints={"Monthly"}
                  name={"incomes"}
                  home={true}
                />
              </div>
              <div className="w-full xsm:w-4/5 sm:w-3/5 md:w-2/5">
                <img
                  src={formImage}
                  className="w-full"
                  alt="image with form that has multiple inputs to fill them wit data by user"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-thirdColor h-16 flex justify-center items-center text-xl text-neutral-500">
        <span className="px-2 font-semibold text-white transition-all duration-300 cursor-pointer hover:text-secondColor">
          Login
        </span>{" "}
        or{" "}
        <span className="px-2 font-semibold text-white transition-all duration-300 cursor-pointer hover:text-secondColor">
          Signup
        </span>{" "}
        now!
      </footer>
    </>
  );
};

export default Home;
