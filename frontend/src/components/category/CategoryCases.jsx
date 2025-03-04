import {
  faBurger,
  faBusinessTime,
  faCarSide,
  faGift,
  faGlobe,
  faGraduationCap,
  faHandHoldingDollar,
  faHouse,
  faKitMedical,
  faPersonCane,
  faPlane,
  faSackDollar,
  faShirt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CategoryCases = ({ category }) => {
  let icon;
  switch (category) {
    case "FOOD":
      icon = <FontAwesomeIcon icon={faBurger} className="text-2xl" />;
      break;
    case "HOUSE":
      icon = <FontAwesomeIcon icon={faHouse} className="text-2xl" />;
      break;
    case "TRANSPORT":
      icon = <FontAwesomeIcon icon={faCarSide} className="text-2xl" />;
      break;
    case "HEALTH":
      icon = <FontAwesomeIcon icon={faKitMedical} className="text-2xl" />;
      break;
    case "EDUCATION":
      icon = <FontAwesomeIcon icon={faGraduationCap} className="text-2xl" />;
      break;
    case "CLOTHES":
      icon = <FontAwesomeIcon icon={faShirt} className="text-2xl" />;
      break;
    case "TRAVEL":
      icon = <FontAwesomeIcon icon={faPlane} className="text-2xl" />;
      break;
    case "GIFTS":
      icon = <FontAwesomeIcon icon={faGift} className="text-2xl" />;
      break;
    case "SALARY":
      icon = <FontAwesomeIcon icon={faSackDollar} className="text-2xl" />;
      break;
    case "BUSINESS_INCOME":
      icon = <FontAwesomeIcon icon={faBusinessTime} className="text-2xl" />;
      break;
    case "INVESTMENT":
      icon = (
        <FontAwesomeIcon icon={faHandHoldingDollar} className="text-2xl" />
      );
      break;
    case "PENSION":
      icon = <FontAwesomeIcon icon={faPersonCane} className="text-2xl" />;
      break;
    case "OTHER":
      icon = <FontAwesomeIcon icon={faGlobe} className="text-2xl" />;
      break;

    default:
      icon = <FontAwesomeIcon icon={faGlobe} className="text-2xl" />;
      break;
  }
  return <>{icon}</>;
};

export default CategoryCases;
