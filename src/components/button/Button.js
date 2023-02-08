import React from "react";
import { useHistory } from "react-router-dom";

function ButtonPage() {
  let history = useHistory();

  const handleClick = () => {
    history.push("/new-page");
  };

  return (
    <div>
      <button onClick={handleClick}>Go to New Page</button>
    </div>
  );
}

export default ButtonPage;
