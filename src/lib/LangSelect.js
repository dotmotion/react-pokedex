import React from "react";
import { useTranslation } from "react-i18next";

const LangSelect = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = event => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div
      style={{ padding: "1rem 0" }}
      className="lang-select"
      onChange={changeLanguage}
    >
      <label>
        <input
          type="radio"
          className="nes-radio is-dark"
          name="language"
          value="en"
          defaultChecked
        />
        <span>ENG</span>
      </label>

      <label>
        <input
          type="radio"
          className="nes-radio is-dark"
          name="language"
          value="es"
        />
        <span>SPA</span>
      </label>
    </div>
  );
};

export default LangSelect;
