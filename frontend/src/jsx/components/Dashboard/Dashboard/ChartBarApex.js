import React from "react";
import ReactApexChart from "react-apexcharts";

class ChartBarApex extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		series: [
		  {
			name: 'Completed',
			data: [0, 0, 0, 0, 0, 0, 0], // Données pour les transactions "completed"
		  },
		  {
			name: 'Initiated',
			data: [0, 0, 0, 0, 0, 0, 0], // Données pour les transactions "initiated"
		  },
		  {
			name: 'Canceled',
			data: [0, 0, 0, 0, 0, 0, 0], // Données pour les transactions "canceled"
		  },
		],
		options: {
		  chart: {
			type: 'bar',
			height: 350,
			toolbar: { show: true },
		  },
		  plotOptions: {
			bar: {
			  horizontal: false,
			  columnWidth: '57%',
			  endingShape: "rounded",
			  borderRadius: 12,
			},
		  },
		  xaxis: {
			categories: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
		  },
		  colors: ['#4CAF50', '#FFA500', '#FF0000'], // Vert, orange, rouge
		  fill: {
			opacity: 1,
		  },
		  tooltip: {
			y: {
			  formatter: function (val) {
				return val + " FCFA";
			  },
			},
		  },
		},
	  };
	}
  
	componentDidUpdate(prevProps) {
	  if (prevProps.transactions !== this.props.transactions) {
		this.updateChartData(this.props.transactions);
	  }
	}
  
	// Fonction pour calculer les sommes des transactions par statut pour chaque jour de la semaine
	updateChartData(transactions) {
	  const weekSumsCompleted = Array(7).fill(0); // Transactions "completed"
	  const weekSumsInitiated = Array(7).fill(0); // Transactions "initiated"
	  const weekSumsCanceled = Array(7).fill(0); // Transactions "canceled"
  
	  const currentDate = new Date();
	  const currentDay = currentDate.getDay(); // Le jour actuel de la semaine (0 = dimanche, 6 = samedi)
  
	  transactions.forEach((transaction) => {
		const transactionDate = new Date(transaction.createdAt);
		const diffInTime = currentDate - transactionDate;
		const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
  
		if (diffInDays >= 0 && diffInDays < 7) {
		  const dayIndex = (currentDay - diffInDays + 7) % 7;
		  if (transaction.status === 'completed') {
			weekSumsCompleted[dayIndex] += Number(transaction.amountTotal || 0);
		  } else if (transaction.status === 'initiated') {
			weekSumsInitiated[dayIndex] += Number(transaction.amountTotal || 0);
		  } else if (transaction.status === 'canceled') {
			weekSumsCanceled[dayIndex] += Number(transaction.amountTotal || 0);
		  }
		}
	  });
  
	  // Mettre à jour les séries de données avec les nouvelles sommes
	  this.setState({
		series: [
		  {
			name: 'Completed',
			data: weekSumsCompleted,
		  },
		  {
			name: 'Initiated',
			data: weekSumsInitiated,
		  },
		  {
			name: 'Canceled',
			data: weekSumsCanceled,
		  },
		],
	  });
	}
  
	render() {
	  return (
		<div id="chart">
		  <ReactApexChart
			options={this.state.options}
			series={this.state.series}
			type="bar"
			height={370}
		  />
		</div>
	  );
	}
  }  

export default ChartBarApex;