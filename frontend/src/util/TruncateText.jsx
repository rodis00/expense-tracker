import React from "react";

const TruncateText = ({ text }) => {
  const maxLength = 30;

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
