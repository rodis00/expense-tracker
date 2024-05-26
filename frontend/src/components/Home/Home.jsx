import React from "react";
import classes from "./Home.module.css";
import DummyChartLine from "./DummyChartLine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faArrowTrendUp,
  faArrowTrendDown,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ItemData from "../ExpensesEarnings/ItemData";
import { DUMMY_DATA_EXPENSES } from "./DummyData";

function Home() {
  return (
    <>
      <div className={classes.container}>
        <header className={classes.header}></header>
        <h1 className={classes.title}>Take control of your finances!</h1>
        <section className={classes.section}>
          <div className={classes.sectionElem}>
            <div className={classes.iconContainerExpenses}>
              <FontAwesomeIcon icon={faArrowTrendDown} />
            </div>
            <h3 className={classes.sectionTitleExpenses}>Expenses</h3>
            <p className={classes.sectionText}>
              Track your expenses and see what you have spent money on recently
            </p>
          </div>
          <div className={classes.sectionElem}>
            <div className={classes.iconContainerEarnings}>
              <FontAwesomeIcon icon={faArrowTrendUp} />
            </div>
            <h3 className={classes.sectionTitleEarnings}>Earnings</h3>
            <p className={classes.sectionText}>
              See what activities you have earned money from recently
            </p>
          </div>
          <div className={classes.sectionElem}>
            <div className={classes.iconContainerSummaries}>
              <FontAwesomeIcon icon={faDollarSign} />
            </div>
            <h3 className={classes.sectionTitleSummaries}>Summaries</h3>
            <p className={classes.sectionText}>
              Check your balance of expenses in relation to income
            </p>
          </div>
        </section>
        <h2 className={classes.chartText}>
          Gain control of your money with charts and lists that display
          information about your expenses and earnings!
        </h2>
        <DummyChartLine />

        <ul className={classes.list}>
        <ItemData
            key={DUMMY_DATA_EXPENSES[0].id}
            date={DUMMY_DATA_EXPENSES[0].date}
            title={DUMMY_DATA_EXPENSES[0].title}
            amount={DUMMY_DATA_EXPENSES[0].amount}
            disabled={true}
          />
          <ItemData
            key={DUMMY_DATA_EXPENSES[1].id}
            date={DUMMY_DATA_EXPENSES[1].date}
            title={DUMMY_DATA_EXPENSES[1].title}
            amount={DUMMY_DATA_EXPENSES[1].amount}
            disabled={true}
          />
        </ul>

        <footer>
          <p className={classes.account}>
            <Link to={"/login"} className={classes.link}>
              Login
            </Link>{" "}
            or{" "}
            <Link to={"/signup"} className={classes.link}>
              create your account
            </Link>{" "}
            now!
          </p>
        </footer>
      </div>
    </>
  );
}

export default Home;
