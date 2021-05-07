import React from "react";

import { padLeadingZeros } from "../lib/utils";

function List(props) {
  const { disabled, list, count, handleChange, handleSelect } = props;

  return (
    <div className="list-container nes-container is-rounded is-dark">
      <div className="list">
        {list.map(mon => {
          return (
            <div
              className="card nes-container is-dark is-rounded animate__animated animate__fadeIn animate_slower"
              onClick={() => handleSelect(mon)}
              key={mon.num}
            >
              <span className="num">{padLeadingZeros(mon.num, 3)}</span>
              <img className="small" src={mon.sprite} alt={mon.name} />
              <span className="name">{mon.name}</span>
            </div>
          );
        })}
      </div>
      <div className="list-buttons">
        <button
          type="button"
          className={`nes-btn is-primary${count === 0 ? "is-disabled" : ""}`}
          disabled={count === 0}
          onClick={() => handleChange("prev")}
        >
          {"<"}
        </button>
        <button
          type="button"
          className={`nes-btn is-primary${disabled ? "is-disabled" : ""}`}
          disabled={disabled}
          onClick={() => handleChange("next")}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default List;
