import React from "react";

import style from "./countries.module.css";
import Country from "./country";
import { v4 as uuidv4 } from "uuid";

const Countries = (props) => {
  return (
    <div className={style.countries}>
      {props.countries.map((country) => {
        const countryNew = { country, id: uuidv4() };

        return (
          <Country
            {...countryNew}
            key={countryNew.id}
            onRemoveCountry={props.onRemoveCountry}
          />
        );
      })}
    </div>
  );
};

export default Countries;
