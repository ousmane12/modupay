import React from "react";
import ReactApexChart from "react-apexcharts";

class ChartBarApex extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		series: [
		  {
			name: 'Transactions',
			data: [0, 0, 0, 0, 0, 0, 0], // Initialisation avec des valeurs par défaut
		  },
		  {
			name: 'Dépenses',
			data: [0, 0, 0, 0, 0, 0, 0], // Initialisation avec des valeurs par défaut
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
		  colors: ['#f9b70e', '#FD5353'], // Couleurs des courbes
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
	  // Vérifier si les transactions ou les dépenses ont changé et mettre à jour les données
	  if (prevProps.transactions !== this.props.transactions || prevProps.expenses !== this.props.expenses) {
		this.updateChartData(this.props.transactions, this.props.expenses);
	  }
	}
  
	// Fonction pour calculer la somme des transactions et des dépenses pour chaque jour de la semaine
	updateChartData(transactions, expenses) {
	  const weekSumsTransactions = Array(7).fill(0); // Sommes des transactions
	  const weekSumsExpenses = Array(7).fill(0); // Sommes des dépenses
  
	  const currentDate = new Date();
	  const currentDay = currentDate.getDay(); // Le jour actuel de la semaine (0 = dimanche, 6 = samedi)
  
	  // Calcul des sommes pour les transactions
	  transactions.forEach((transaction) => {
		const transactionDate = new Date(transaction.createdAt);
		const diffInTime = currentDate - transactionDate;
		const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
  
		if (diffInDays >= 0 && diffInDays < 7) {
		  weekSumsTransactions[(currentDay - diffInDays + 7) % 7] += Number(transaction.amountTotal || 0);
		}
	  });
  
	  // Calcul des sommes pour les dépenses
	  expenses.forEach((expense) => {
		const expenseDate = new Date(expense.createdAt);
		const diffInTime = currentDate - expenseDate;
		const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
  
		if (diffInDays >= 0 && diffInDays < 7) {
		  weekSumsExpenses[(currentDay - diffInDays + 7) % 7] += Number(expense.amount || 0);
		}
	  });
  
	  // Mettre à jour les séries de données avec les nouvelles sommes
	  this.setState({
		series: [
		  {
			name: 'Transactions',
			data: weekSumsTransactions,
		  },
		  {
			name: 'Dépenses',
			data: weekSumsExpenses,
		  },
		],
	  });
	}
	render() {
		return (
			<div id="chart" >
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