import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const incomeCategories = [
  ["SALARY", "Salary"],
  ["SELL", "Sell"],
  ["SOCIAL_MEDIA", "Social media"],
  ["BUSINESS_INCOME", "Business income"],
  ["INVESTMENT", "Investment"],
  ["GIFTS", "Gifts"],
  ["PENSION", "Pension"],
  ["OTHER", "Other"],
];

const expenseCategories = [
  ["FOOD", "Food"],
  ["HOUSE", "House"],
  ["TRANSPORT", "Transport"],
  ["HEALTH", "Health"],
  ["EDUCATION", "Education"],
  ["CLOTHES", "Clothes"],
  ["TRAVEL", "Travel"],
  ["SUBSCRIPTION", "Subscription"],
  ["GIFTS", "Gifts"],
  ["OTHER", "Other"],
];

const CustomSelect = ({
  isCategory,
  divClass = "",
  buttonClass = "",
  bgClass = "",
  resource,
  category,
  setCategory,
  setCategoryUpdate,
  array,
  selectedValue,
  setValue,
}) => {
  let categories =
    resource === "incomes" ? incomeCategories : expenseCategories;
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const version = useSelector((state) => state.modal.modalVersion);
  let categoryText;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (setCategory && resource) {
      setCategory(() => ({
        category: categories[0][0],
        text: categories[0][1],
      }));
    }
  }, [version]);

  if (category && resource) {
    categoryText = category;
    categories.forEach((item) => {
      item.forEach((elem) => {
        if (elem === categoryText) {
          categoryText = item[1];
        }
      });
    });
  } else if (!category && resource) {
    categoryText = categories[0][1];
  }

  return (
    <div className={`${divClass} text-white `} ref={selectRef}>
      <button
        type="button"
        className={`w-full ${buttonClass} ${bgClass} text-left flex justify-between items-center transition-all duration-150 ${
          isOpen ? "outline outline-2 outline-secondColor" : "outline-none"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`ml-4 ${isCategory ? "flex items-center gap-4" : ""}`}>
          {isCategory && <FontAwesomeIcon icon={faList} />}
          {categoryText ? categoryText : selectedValue}
        </span>
        <span className="mr-4">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <ul
          className={`absolute w-full border border-neutral-700 ${bgClass} rounded-md mt-1 max-h-40 z-10 overflow-y-auto`}
        >
          {resource &&
            categories.map(([value, text]) => (
              <li
                key={value}
                className="px-4 py-2 cursor-pointer hover:bg-neutral-700"
                onClick={() => {
                  if (setCategoryUpdate) {
                    setCategoryUpdate((prev) => ({
                      ...prev,
                      category: value,
                    }));
                  }

                  if (setCategory) {
                    setCategory(() => ({
                      category: value,
                      text: text,
                    }));
                  }
                  setIsOpen(false);
                }}
              >
                {text}
              </li>
            ))}
          {!resource &&
            array
              ?.sort((a, b) => b - a)
              .map((item) => (
                <li
                  key={item}
                  className="px-4 py-2 cursor-pointer hover:bg-neutral-700"
                  onClick={() => {
                    setValue(item);
                    setIsOpen(false);
                  }}
                >
                  {item}
                </li>
              ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
