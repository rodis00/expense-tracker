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
  switch (category.toLowerCase()) {
    case "food":
      icon = <FontAwesomeIcon icon={faBurger} className="text-2xl" />;
      break;
    case "house":
      icon = <FontAwesomeIcon icon={faHouse} className="text-2xl" />;
      break;
    case "transport":
      icon = <FontAwesomeIcon icon={faCarSide} className="text-2xl" />;
      break;
    case "health":
      icon = <FontAwesomeIcon icon={faKitMedical} className="text-2xl" />;
      break;
    case "education":
      icon = <FontAwesomeIcon icon={faGraduationCap} className="text-2xl" />;
      break;
    case "clothes":
      icon = <FontAwesomeIcon icon={faShirt} className="text-2xl" />;
      break;
    case "travel":
      icon = <FontAwesomeIcon icon={faPlane} className="text-2xl" />;
      break;
    case "gifts":
      icon = <FontAwesomeIcon icon={faGift} className="text-2xl" />;
      break;
    case "salary":
      icon = <FontAwesomeIcon icon={faSackDollar} className="text-2xl" />;
      break;
    case "business income":
      icon = <FontAwesomeIcon icon={faBusinessTime} className="text-2xl" />;
      break;
    case "investment":
      icon = (
        <FontAwesomeIcon icon={faHandHoldingDollar} className="text-2xl" />
      );
      break;
    case "pension":
      icon = <FontAwesomeIcon icon={faPersonCane} className="text-2xl" />;
      break;
    case "other":
      icon = <FontAwesomeIcon icon={faGlobe} className="text-2xl" />;
      break;

    // case 'food': icon = <FontAwesomeIcon icon={faBurger} className="text-2xl" />
  }
  return <>{icon}</>;
};

export default CategoryCases;
