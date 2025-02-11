import React from "react";

const SelectCategory = ({ resource, ...props }) => {
  return (
    <select {...props}>
      {resource === "incomes" ? (
        <>
          <option value="SALARY">Salary</option>
          <option value="BUSINESS_INCOME">Business income</option>
          <option value="INVESTMENT">Investment</option>
          <option value="GIFTS">Gifts</option>
          <option value="PENSION">Pension</option>
          <option value="OTHER">Other</option>
        </>
      ) : (
        <>
          <option value="FOOD">Food</option>
          <option value="HOUSE">House</option>
          <option value="TRANSPORT">Transport</option>
          <option value="HEALTH">Health</option>
          <option value="EDUCATION">Education</option>
          <option value="CLOTHES">Clothes</option>
          <option value="TRAVEL">Travel</option>
          <option value="GIFTS">Gifts</option>
          <option value="OTHER">Other</option>
        </>
      )}
    </select>
  );
};

export default SelectCategory;
