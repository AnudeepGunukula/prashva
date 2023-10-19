import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Item from "./Item";
import Labels from "./Labels";
import classes from "./Home.module.css";
import Modal from "./Modal";
function Home() {
  const [dockets, setDockets] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/dockets/")
      .then((response) => {
        setDockets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const btnHandler = () => {
    setOpenModal(!openModal);
  };

  const pushToDockets = (data) => {
    setDockets([...dockets, data]);
  };
  return (
    <>
      <div>
        {openModal && <Modal onClose={btnHandler} fn={pushToDockets} />}
      </div>
      <div className={classes.docketlist}>
        <h1>Docket List</h1>

        <Labels
          className={classes.bold}
          docket={{
            name: "Name",
            start_time: "Start Time",
            end_time: "End Time",
            hours_worked: "Hours Worked",
            rate_per_hour: "Rate Per Hour",
            supplier_name: "Supplier Name",
            purchase_order: "Purchase Order",
            po_desc: "PO Description",
          }}
        />
        <ul>
          {dockets.map((docket) => (
            <li key={docket.id}>
              <Item docket={docket} />
            </li>
          ))}
        </ul>
        <div className={classes.btndiv}>
          <button onClick={btnHandler}>Add Docket</button>
        </div>
      </div>
    </>
  );
}

export default Home;
