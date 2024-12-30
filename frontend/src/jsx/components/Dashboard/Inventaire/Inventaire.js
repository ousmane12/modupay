import React, { Fragment, useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux';
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import {
    getTransactionsInventaireAction,
    getTransactionsInventaireByAgencyAction,
    getTransactionsInventaireByCountryAction,
} from '../../../../store/actions/transactionAction';
import CustomSelect from "./CustomSelect";
import { fetchAgencies } from "../../../../services/agencyService";

const Inventaire = (props) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [agency, setAgency] = useState("");
  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    fetchAgencies().then((response) => {
      setAgencies(response.data);
    });
  }, []);

  const handleSelect = (field) => (value) => {
    setAgency(value);
  };
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

  const handleDateRangeChangeCond = (event, picker) => {
    const startDate = formatDate(picker.startDate.toDate());
    const endDate = formatDate(picker.endDate.toDate());
    setStart(startDate);
    setEnd(endDate);
  };
  
  const handleSubmitAgency = () => {
    if(start !== '' && end !== '' && agency !== '') {
      dispatch(getTransactionsInventaireByAgencyAction(start, end, agency, props.history));
    }
  };
  
  const handleSubmitCountry = () => {
    if(start !== '' && end !== '' && agency !== '') {
      dispatch(getTransactionsInventaireByCountryAction(start, end, agency, props.history));
    }
  }; 
  
  const uniqueCountries = [
    ...new Map(
      agencies
        .filter((agency) => agency.country) // Exclure les agences sans pays
        .map((agency) => [agency.country._id, agency.country]) // Utiliser l'ID du pays comme clé
    ).values(),
  ];
    
  return (
    <Fragment>
  <div className="row">
    {/* Inventaire par Date */}
    <div className="col-xl-12 col-lg-8">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Inventaire par Date</h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="example rangeDatePicker">
                <p className="mb-1">Sélectionner la date</p>
                <DateRangePicker onApply={handleDateRangeChange}>
                  <input type="text" className="form-control input-daterange-timepicker" />
                </DateRangePicker>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Inventaire par Agence */}
    <div className="col-xl-12 col-lg-8">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Inventaire Par Agence</h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="example rangeDatePicker">
                <p className="mb-1">Sélectionner la date et l'agence</p>
                <DateRangePicker onApply={handleDateRangeChangeCond}>
                  <input type="text" className="form-control input-daterange-timepicker" />
                </DateRangePicker>
              </div>
            </div>
            <div>
            <CustomSelect options={agencies} onSelect={handleSelect('agency')} />
            </div>
            <div className="align-items-center justify-content-center">
            <button className="btn btn-primary col-md-6" onClick={handleSubmitAgency}>Soumettre Agence</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Inventaire par Pays */}
    <div className="col-xl-12 col-lg-8">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Inventaire Par Pays</h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="example rangeDatePicker">
                <p className="mb-1">Sélectionner la date et le pays</p>
                <DateRangePicker onApply={handleDateRangeChangeCond}>
                  <input type="text" className="form-control input-daterange-timepicker" />
                </DateRangePicker>
              </div>
            </div>
            <div>
            <CustomSelect options={uniqueCountries} onSelect={handleSelect('country')} />
            </div>
            <button className="btn btn-primary col-md-6" onClick={handleSubmitCountry}>Soumettre Pays</button>
          </div>
        </div>
      </div>
    </div>   
  </div>
</Fragment>

  );
};

export default Inventaire;
