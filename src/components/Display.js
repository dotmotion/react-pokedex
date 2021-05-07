import React from "react";
import { useTranslation } from "react-i18next";

import { Consumer } from "../lib/context";
import LangSelect from "../lib/LangSelect";

function Display() {
  const { t } = useTranslation();
  const dummy = {
    num: 0,
    name: "",
    weight: "",
    height: "",
    stats: {
      hp: "",
      atk: "",
      def: "",
      spAtk: "",
      spDef: "",
      speed: ""
    },
    types: [""],
    sprite: "",
    img: ""
  };
  return (
    <Consumer>
      {value => {
        const { current } = value;
        let pokemon;
        current === null ? (pokemon = dummy) : (pokemon = current);
        return (
          <div className="display-container nes-container is-rounded is-dark animate__animated animate__fadeIn animate_slower">
            <LangSelect />
            <div className="flex-col">
              <div
                className="nes-container is-dark is-rounded with-title pad"
                style={{ padding: "16px !important" }}
              >
                <p className="title">{pokemon && pokemon.name.toUpperCase()}</p>
                <div className="display-top">
                  <img
                    src={pokemon.img}
                    alt={pokemon.name}
                    className="animate__animated animate__fadeIn animate_slower"
                  />
                  <div className="details">
                    <p>
                      {t("height.label")}
                      {`${pokemon.height} m`}
                    </p>
                    <p>
                      {t("weight.label")}
                      {`${pokemon.weight} kg`}
                    </p>
                    {/* <p>
                      {t("type.label")}
                      {pokemon.types.map(type => `${type} `)}
                    </p> */}
                  </div>
                </div>
              </div>
              <div className="display-bottom">
                <table class="nes-table is-bordered is-dark">
                  <tbody>
                    <tr>
                      <td>{t("hp.label")}</td>
                      <td>{pokemon.stats.hp}</td>
                      <td>{t("speed.label")}</td>
                      <td>{pokemon.stats.speed}</td>
                    </tr>
                    <tr>
                      <td>{t("attack.label")}</td>
                      <td>{pokemon.stats.atk}</td>
                      <td>{t("defense.label")}</td>
                      <td>{pokemon.stats.def}</td>
                    </tr>
                    <tr>
                      <td>{t("sp-attack.label")}</td>
                      <td>{pokemon.stats.spAtk}</td>
                      <td>{t("sp-defense.label")}</td>
                      <td>{pokemon.stats.spDef}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }}
    </Consumer>
  );
}

export default Display;
