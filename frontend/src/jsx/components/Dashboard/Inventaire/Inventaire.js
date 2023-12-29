import React, { useState, Fragment } from "react";
import   DatePicker  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

import PageTitle from "../../../layouts/PageTitle";

const Inventaire = () => {
 const [selectedDate, setSelectedDate] = useState(new Date());
 const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
 const handleDateRangeChange = (event, picker) => {
    setDateRange({
      startDate: picker.startDate.toDate(),
      endDate: picker.endDate.toDate(),
    });
  };

 const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Transactions" motherMenu="Inventaire" pageContent="Inventaire" />
      <div className="row">
        <div className="col-xl-9 col-lg-8">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Inventaire par intervalle</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 mb-3">
                  <div className="example rangeDatePicker">
                    <p className="mb-1">Séléctionner les date</p>
                    <DateRangePicker onApply={handleDateRangeChange}>
                    <input type="text" className="form-control input-daterange-timepicker" />
                  </DateRangePicker>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
		    <div className="col-xl-3 col-lg-4">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Inventaire journalier</h4>
            </div>
            <div className="card-body">
              <p className="mb-1">Séléctionner une date</p>
			      <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                   className="form-control"/> 
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Inventaire;
