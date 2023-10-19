import React from "react";
import classes from "./Item.module.css";
function Item({ docket }) {
  return (
    <>
      <div className={classes["itemcontainer"]}>
        <p>{docket.name}</p>
        <p>{docket.start_time}</p>
        <p>{docket.end_time}</p>
        <p>{docket.hours_worked}</p>
        <p>{docket.rate_per_hour}</p>
        <p>{docket.supplier_name}</p>
        <p>{docket.purchase_order}</p>
        <p>{docket.po_desc}</p>
      </div>
      <hr />
      <br />
    </>
  );
}

export default Item;
