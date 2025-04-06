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
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonthAgency, setSelectedMonthAgency] = useState("");
  const [selectedYearAgency, setSelectedYearAgency] = useState(new Date().getFullYear());
  const [selectedMonthCountry, setSelectedMonthCountry] = useState("");
  const [selectedYearCountry, setSelectedYearCountry] = useState(new Date().getFullYear());

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

  // Fonction utilitaire pour calculer le début et la fin du mois
  const calculateMonthRange = (month, year) => {
    if (!month || !year) return { startDate: "", endDate: "" };
    
    const firstDay = new Date(year, parseInt(month) - 1, 1);
    const lastDay = new Date(year, parseInt(month), 0, 23, 59, 59); // Dernier jour du mois à 23:59:59
    
    return {
      startDate: formatDate(firstDay),
      endDate: formatDate(lastDay)
    };
  };
  
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
    if((start !== '' && end !== '') || (selectedMonthAgency !== '')) {
      let startDate = start;
      let endDate = end;
      
      // Si un mois est sélectionné, on utilise les dates calculées
      if (selectedMonthAgency !== '') {
        const monthRange = calculateMonthRange(selectedMonthAgency, selectedYearAgency);
        startDate = monthRange.startDate;
        endDate = monthRange.endDate;
      }
      
      if (agency !== '' && startDate && endDate) {
        dispatch(getTransactionsInventaireByAgencyAction(startDate, endDate, agency, props.history));
      }
    }
  };
  
  const handleSubmitCountry = () => {
    if((start !== '' && end !== '') || (selectedMonthCountry !== '')) {
      let startDate = start;
      let endDate = end;
      
      // Si un mois est sélectionné, on utilise les dates calculées
      if (selectedMonthCountry !== '') {
        const monthRange = calculateMonthRange(selectedMonthCountry, selectedYearCountry);
        startDate = monthRange.startDate;
        endDate = monthRange.endDate;
      }
      
      if (agency !== '' && startDate && endDate) {
        dispatch(getTransactionsInventaireByCountryAction(startDate, endDate, agency, props.history));
      }
    }
  }; 

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChangeAgency = (e) => {
    setSelectedMonthAgency(e.target.value);
  };

  const handleYearChangeAgency = (e) => {
    setSelectedYearAgency(e.target.value);
  };

  const handleMonthChangeCountry = (e) => {
    setSelectedMonthCountry(e.target.value);
  };

  const handleYearChangeCountry = (e) => {
    setSelectedYearCountry(e.target.value);
  };

  const handleSubmitMonth = () => {
    if(selectedMonth !== '') {
      const { startDate, endDate } = calculateMonthRange(selectedMonth, selectedYear);
      dispatch(getTransactionsInventaireAction(startDate, endDate, props.history));
    }
  };
  
  const uniqueCountries = [
    ...new Map(
      agencies
        .filter((agency) => agency.country) // Exclure les agences sans pays
        .map((agency) => [agency.country._id, agency.country]) // Utiliser l'ID du pays comme clé
    ).values(),
  ];

  // Générer les années pour le sélecteur
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 5}, (_, i) => currentYear - i);
  
  // Composant réutilisable pour les sélecteurs de mois et d'année
  const MonthYearSelector = ({ monthValue, onMonthChange, yearValue, onYearChange }) => (
    <>
      <div className="col-md-6 mb-3">
        <p className="mb-1">Sélectionner le mois</p>
        <select className="form-control" value={monthValue} onChange={onMonthChange}>
          <option value="">Sélectionner un mois</option>
          <option value="1">Janvier</option>
          <option value="2">Février</option>
          <option value="3">Mars</option>
          <option value="4">Avril</option>
          <option value="5">Mai</option>
          <option value="6">Juin</option>
          <option value="7">Juillet</option>
          <option value="8">Août</option>
          <option value="9">Septembre</option>
          <option value="10">Octobre</option>
          <option value="11">Novembre</option>
          <option value="12">Décembre</option>
        </select>
      </div>
      <div className="col-md-6 mb-3">
        <p className="mb-1">Sélectionner l'année</p>
        <select className="form-control" value={yearValue} onChange={onYearChange}>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
    </>
  );
    
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

    {/* Nouvelle section: Inventaire par Mois */}
    <div className="col-xl-12 col-lg-8">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Inventaire Par Mois</h4>
        </div>
        <div className="card-body">
          <div className="row">
            <MonthYearSelector 
              monthValue={selectedMonth} 
              onMonthChange={handleMonthChange} 
              yearValue={selectedYear} 
              onYearChange={handleYearChange} 
            />
            <div className="align-items-center justify-content-center">
              <button className="btn btn-primary col-md-6" onClick={handleSubmitMonth}>Afficher l'inventaire</button>
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
                <p className="mb-1">Sélectionner la date</p>
                <DateRangePicker onApply={handleDateRangeChangeCond}>
                  <input type="text" className="form-control input-daterange-timepicker" />
                </DateRangePicker>
              </div>
            </div>
            <div className="mb-3">
              <p className="mb-1">Ou sélectionner un mois spécifique</p>
              <div className="row">
                <MonthYearSelector 
                  monthValue={selectedMonthAgency} 
                  onMonthChange={handleMonthChangeAgency} 
                  yearValue={selectedYearAgency} 
                  onYearChange={handleYearChangeAgency} 
                />
              </div>
            </div>
            <div className="mb-3">
              <p className="mb-1">Sélectionner l'agence</p>
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
                <p className="mb-1">Sélectionner la date</p>
                <DateRangePicker onApply={handleDateRangeChangeCond}>
                  <input type="text" className="form-control input-daterange-timepicker" />
                </DateRangePicker>
              </div>
            </div>
            <div className="mb-3">
              <p className="mb-1">Ou sélectionner un mois spécifique</p>
              <div className="row">
                <MonthYearSelector 
                  monthValue={selectedMonthCountry} 
                  onMonthChange={handleMonthChangeCountry} 
                  yearValue={selectedYearCountry} 
                  onYearChange={handleYearChangeCountry} 
                />
              </div>
            </div>
            <div className="mb-3">
              <p className="mb-1">Sélectionner le pays</p>
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