import React from "react";

import { Consumer } from "../lib/context";
import { padLeadingZeros } from "../lib/utils";

function List() {
  const handleChange = (dispatch, action) => {
    dispatch({ type: "UPDATE", data: action });
  };

  return (
    <Consumer>
      {value => {
        const { chunks, list, dispatch, count, loading } = value;

        return (
          <div className="list-container nes-container is-rounded is-dark">
            <div className="list">
              {!loading ? (
                list.map(mon => {
                  return (
                    <div
                      className="card nes-container is-dark is-rounded animate__animated animate__fadeIn animate_slower"
                      onClick={() => dispatch({ type: "SELECT", data: mon })}
                      key={mon.num}
                    >
                      <span className="num">{padLeadingZeros(mon.num, 3)}</span>
                      <img className="small" src={mon.sprite} alt={mon.name} />
                      <span className="name">{mon.name}</span>
                    </div>
                  );
                })
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div className="list-buttons">
              <button
                type="button"
                className={`nes-btn is-primary${
                  count === 0 ? "is-disabled" : ""
                }`}
                disabled={count === 0}
                onClick={() => handleChange(dispatch, "prev")}
              >
                {"<"}
              </button>
              <button
                type="button"
                className={`nes-btn is-primary${
                  count === chunks.length - 1 ? "is-disabled" : ""
                }`}
                disabled={count === chunks.length - 1}
                onClick={() => handleChange(dispatch, "next")}
              >
                {">"}
              </button>
            </div>
          </div>
        );
      }}
    </Consumer>
  );
}

export default List;
