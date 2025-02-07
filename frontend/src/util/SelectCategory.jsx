import React from "react";

const SelectCategory = ({ resource, ...props }) => {
  return (
    <select {...props}>
      {resource === "incomes" ? (
        <>
          <option value="salary">Salary</option>
          <option value="business income">Business income</option>
          <option value="investment">Investment</option>
          <option value="gifts">Gifts</option>
          <option value="pension">Pension</option>
          <option value="other">Other</option>
        </>
      ) : (
        <>
          <option value="food">Food</option>
          <option value="house">House</option>
          <option value="transport">Transport</option>
          <option value="health">Health</option>
          <option value="education">Education</option>
          <option value="clothes">Clothes</option>
          <option value="travel">Travel</option>
          <option value="gifts">Gifts</option>
          <option value="other">Other</option>
        </>
      )}
    </select>
  );
};

export default SelectCategory;
