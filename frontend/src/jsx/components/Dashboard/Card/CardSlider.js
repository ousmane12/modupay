import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import wave1 from './../../../../images/pattern/wave1.png';
import wave2 from './../../../../images/pattern/wave2.png';
import wave3 from './../../../../images/pattern/wave3.png';
import wave4 from './../../../../images/pattern/wave4.png';
import circle from './../../../../images/pattern/circle.png';


const CardSlider = (investments) => {
	const calculateInvestmentSums = (investments) => {
		
		// Initialisation des sommes
		let totalAmountInvested = 0;
		let totalInterestEarned = 0;
		let totalEarned = 0;

		if (!Array.isArray(investments.investments)) {
			console.error("Investments should be an array");
			return {
			  totalAmountInvested: 0,
			  totalInterestEarned: 0,
			  totalEarned: 0,
			};
		  }
	  
		// Calcul des totaux
		investments.investments.forEach(investment => {
		  totalAmountInvested += investment?.amountInvested || 0;
		  totalInterestEarned += investment?.totalInterestEarned || 0;
		});
	  
		// Calcul du montant total gagné (investissement + intérêts)
		totalEarned = totalAmountInvested + totalInterestEarned;
	  
		// Retourne les résultats
		return {
		  totalAmountInvested,
		  totalInterestEarned,
		  totalEarned,
		  investedPlusInterest: totalEarned,
		};
	  }	  
	const { totalAmountInvested, totalInterestEarned, totalEarned } = calculateInvestmentSums(investments);
	const settings = {
		dots: false,
		infinite: true,
		arrows: false,
		speed: 3000,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1560,
				settings: {
				  slidesToShow: 3,
				  slidesToScroll: 1,
				},
			},
			{
				breakpoint: 1200,
				settings: {
				  slidesToShow: 2,
				  slidesToScroll: 1,
				},
			},	
			{
				breakpoint: 640,
				settings: {
				  slidesToShow: 1,
				  slidesToScroll: 1,
				},
			},
		],
	};
	return(
		<>
			<Slider className="card-slider owl-carousel" {...settings}>
				<div className="items">
					<div className="card-bx bg-green mb-0">
						<img className="pattern-img" src={wave1} alt="" />
						<div className="card-info text-white">
							<div className="d-flex align-items-center">
								<div className="me-auto">
									<p className="mb-1 fs-18 font-w700">Investissement</p>
									<h2 className="fs-24 font-w800  text-white mb-5">{totalAmountInvested.toLocaleString()} FCFA</h2>
								</div>
								<img src={circle} className="mb-4" alt="" />
							</div>
							<div className="d-flex">
							</div>
						</div>
					</div>
				</div>
				<div className="items ">
					<div className="card-bx bg-orange">
						<img className="pattern-img" src={wave2} alt="" />
						<div className="card-info text-white">
							<div className="d-flex align-items-center">
								<div className="me-auto">
									<p className="mb-1 fs-18 font-w700">Intérêts Gagnés</p>
									<h2 className="fs-24 font-w800  text-white mb-5">{totalInterestEarned.toLocaleString()} FCFA</h2>
								</div>
								<img src={circle} className="mb-4" alt="" />
							</div>
						</div>
					</div>
				</div>
				<div className="items">
					<div className="card-bx bg-blue mb-0">
						<img className="pattern-img" src={wave3} alt="" />
						<div className="card-info text-white">
							<div className="d-flex align-items-center">
								<div className="me-auto">
									<p className="mb-1 fs-18 font-w700">Total Gagné</p>
									<h2 className="fs-24 font-w800  text-white mb-5">{totalEarned.toLocaleString()} FCFA</h2>
								</div>
								<img src={circle} className="mb-4" alt="" />
							</div>
						</div>
					</div>
				</div>
				<div className="items">
					<div className="card-bx bg-purpel mb-0">
						<img className="pattern-img" src={wave4} alt="" />
						<div className="card-info text-white">
							<div className="d-flex align-items-center">
								<div className="me-auto">
									<p className="mb-1 fs-18 font-w700">Total</p>
									<h2 className="fs-24 font-w800  text-white mb-5">{totalEarned.toLocaleString()} FCFA</h2>
								</div>
								<img src={circle} className="mb-4" alt="" />
							</div>
						</div>
					</div>
				</div>	
				<div className="items">
					
				</div>
			</Slider>
		</>
	)
}
export default CardSlider;