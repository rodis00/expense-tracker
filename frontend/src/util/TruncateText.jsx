import React from "react";
import { useMediaQuery } from "@react-hook/media-query";

const TruncateText = ({ text }) => {
  const isExtraSmallScreen = useMediaQuery(
    "only screen and (max-width: 449px)"
  );
  const isSmallScreen = useMediaQuery(
    "only screen and (min-width: 450px) and (max-width: 749px)"
  );
  const isMediumScreen = useMediaQuery(
    "only screen and (min-width: 750px) and (max-width: 1369px)"
  );
  let maxLength = 0;

  if (isExtraSmallScreen) {
    maxLength = 16;
  } else if (isSmallScreen) {
    maxLength = 20;
  } else if (isMediumScreen) {
    maxLength = 25;
  } else {
    maxLength = 40;
  }

  function handleTruncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }

    return text;
  }

  const truncatedText = handleTruncateText(text, maxLength);

  return <span>{truncatedText}</span>;
};

export default TruncateText;
