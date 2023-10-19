import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./Modal.module.css";
const Modal = ({ isOpen, onClose, fn }) => {
  const [formData, setFormData] = useState({
    name: "",
    start_time: "",
    end_time: "",
    hours_worked: "",
    rate_per_hour: "",
    supplier_name: "",
    purchase_order: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/suppliers")
      .then((response) => setSuppliers(response.data.suppliers))
      .catch((error) => console.error(error));
  }, []);

  const fetchProducts = (value) => {
    axios
      .get(`http://localhost:8000/api/suppliers/?supplier=${value}`)
      .then((response) => setProducts(response.data.PurchaseOrders))
      .catch((error) => console.error(error));
  };

  const submitForm = () => {
    axios
      .post("http://localhost:8000/api/dockets/", formData)
      .then((response) => {
        setDockItem(response.data);
        onClose();
        return response;
      })
      .then((response) => {
        fn(response.data);
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    submitForm();
  };

  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [dockItem, setDockItem] = useState({});
  return (
    <div className={classes["modal-overlay"]}>
      <div className={classes.modal}>
        <span className={classes.close} onClick={onClose}>
          &times;
        </span>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                placeholder="Enter Your Name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label>Start Time:</label>
              <input
                type="text"
                placeholder="HH:MM"
                value={formData.start_time}
                onChange={(e) =>
                  setFormData({ ...formData, start_time: e.target.value })
                }
              />
            </div>
            <div>
              <label>End Time:</label>
              <input
                type="text"
                placeholder="HH:MM"
                value={formData.end_time}
                onChange={(e) =>
                  setFormData({ ...formData, end_time: e.target.value })
                }
              />
            </div>
            <div>
              <label>Hours Worked:</label>
              <input
                type="text"
                placeholder="Enter No.of Hours Worked"
                value={formData.hours_worked}
                onChange={(e) =>
                  setFormData({ ...formData, hours_worked: e.target.value })
                }
              />
            </div>
            <div>
              <label>Rate per Hour:</label>
              <input
                placeholder="Enter Rate Per Hour"
                type="text"
                value={formData.rate_per_hour}
                onChange={(e) =>
                  setFormData({ ...formData, rate_per_hour: e.target.value })
                }
              />
            </div>
            <div>
              <label>Supplier Name:</label>
              <select
                value={formData.supplier_name}
                onChange={(e) => {
                  setFormData({ ...formData, supplier_name: e.target.value });
                  fetchProducts(e.target.value);
                }}
              >
                <option value="">Select a supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier} value={supplier}>
                    {supplier}
                  </option>
                ))}
              </select>
            </div>
            {products.length !== 0 && (
              <div>
                <label>Purchase Order:</label>
                <select
                  value={formData.purchase_order}
                  onChange={(e) =>
                    setFormData({ ...formData, purchase_order: e.target.value })
                  }
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
