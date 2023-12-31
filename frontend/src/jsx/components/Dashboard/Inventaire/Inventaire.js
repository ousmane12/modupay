import React, { Fragment, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux';
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import {
    getTransactionsInventaireAction,
} from '../../../../store/actions/transactionAction';

import PageTitle from "../../../layouts/PageTitle";

const Inventaire = (props) => {
    const formatDate = (inputDate) =>{
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return formattedDate;
    }
    const dispatch = useDispatch();
    const handleDateRangeChange = (event, picker) => {
        const startDate = formatDate(picker.startDate.toDate());
        const endDate = formatDate(picker.endDate.toDate());
        // Dispatch your action with the selected date range
        dispatch(getTransactionsInventaireAction(startDate, endDate, props.history));
      };
      

    useEffect(() => {
		dispatch(getTransactionsInventaireAction())
	}, [dispatch])

  return (
    <Fragment>
      <PageTitle activeMenu="Transactions" motherMenu="Inventaire" pageContent="Inventaire" />
      <div className="row">
        <div className="col-xl-12 col-lg-8">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Inventaire</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 mb-3">
                  <div className="example rangeDatePicker">
                    <p className="mb-1">Séléctionner la date</p>
                    <DateRangePicker onApply={handleDateRangeChange}>
                        <input type="text" className="form-control input-daterange-timepicker" />
                    </DateRangePicker>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>   
      </div>
    </Fragment>
  );
};

export default Inventaire;
