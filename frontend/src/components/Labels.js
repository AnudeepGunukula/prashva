import React from "react";
import classes from "./Labels.module.css";

function Labels({ docket }) {
  return (
    <div className={classes["itemcontainer"]}>
      <h3>{docket.name}</h3>
      <h3>{docket.start_time}</h3>
      <h3>{docket.end_time}</h3>
      <h3>{docket.hours_worked}</h3>
      <h3>{docket.rate_per_hour}</h3>
      <h3>{docket.supplier_name}</h3>
      <h3>{docket.purchase_order}</h3>
      <h3>{docket.po_desc}</h3>
    </div>
  );
}

export default Labels;
