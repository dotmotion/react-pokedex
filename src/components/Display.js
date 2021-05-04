import React from "react";

import { Consumer } from "../lib/context";

function Display() {
  return (
    <Consumer>
      {value => {
        const { current } = value;
        return (
          <div className="display-container nes-container is-rounded is-dark animate__animated animate__fadeIn animate_slower">
            {current && (
              <div className="flex-col">
                <div
                  className="nes-container is-dark is-rounded with-title pad"
                  style={{ padding: "16px !important" }}
                >
                  <p className="title">
                    {current && current.name.toUpperCase()}
                  </p>
                  <div className="display-top">
                    <img
                      src={current.img}
                      alt={current.name}
                      className="animate__animated animate__fadeIn animate_slower"
                    />
                    <div className="details">
                      <p>{`Height: ${current.height} m`}</p>
                      <p>{`Weight: ${current.weight} kg`}</p>
                      <p>
                        {`Type: `}
                        {current.types.map(type => `${type} `)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="display-bottom">
                  <table class="nes-table is-bordered is-dark">
                    <tbody>
                      <tr>
                        <td>HP</td>
                        <td>{current.stats.hp}</td>
                        <td>Speed</td>
                        <td>{current.stats.speed}</td>
                      </tr>
                      <tr>
                        <td>Attack</td>
                        <td>{current.stats.atk}</td>
                        <td>Defense</td>
                        <td>{current.stats.def}</td>
                      </tr>
                      <tr>
                        <td>SP Attack</td>
                        <td>{current.stats.spAtk}</td>
                        <td>SP Defense</td>
                        <td>{current.stats.spDef}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );
      }}
    </Consumer>
  );
}

export default Display;
