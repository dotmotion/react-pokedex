import React from "react";
import { useTranslation } from "react-i18next";

import { Consumer } from "../lib/context";

function Display() {
  const { t, i18n } = useTranslation();
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
                      <p>
                        {t("height.label")}
                        {`${current.height} m`}
                      </p>
                      <p>
                        {t("weight.label")}
                        {`${current.weight} kg`}
                      </p>
                      <p>
                        {t("type.label")}
                        {current.types.map(type => `${type} `)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="display-bottom">
                  <table class="nes-table is-bordered is-dark">
                    <tbody>
                      <tr>
                        <td>{t("hp.label")}</td>
                        <td>{current.stats.hp}</td>
                        <td>{t("speed.label")}</td>
                        <td>{current.stats.speed}</td>
                      </tr>
                      <tr>
                        <td>{t("attack.label")}</td>
                        <td>{current.stats.atk}</td>
                        <td>{t("defense.label")}</td>
                        <td>{current.stats.def}</td>
                      </tr>
                      <tr>
                        <td>{t("sp-attack.label")}</td>
                        <td>{current.stats.spAtk}</td>
                        <td>{t("sp-defense.label")}</td>
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
