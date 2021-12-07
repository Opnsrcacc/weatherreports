import { useState, useEffect, Fragment } from 'react';
import './App.css';
import { request, checkvalue } from './service';

function App() {
	let [locationData, setlocationData] = useState([]),
		[loader, setloader] = useState(false);

	let getReports = () => {
		setloader(true);
		request('http://api.weatherapi.com/v1/forecast.json?key=698dc13c77094cf187695058201212&q=London&days=1',
			'get',
			{}
		).then(response => {
			if (response && response.data) {
				setlocationData([...Array.of(response.data)]);
			}
		}).catch(err => {
			console.log(`err in get reports ${err}`)
		}).finally(() => {
			setloader(false);
		});
	};

	useEffect(() => {
		getReports();
	}, []);

	return (
		<div className="App">
			<h3 style={{ textAlign: 'center' }} > Weather Reports  </h3>
			{loader ? <div> fetching data.... </div> : null}
			{
				locationData.length > 0 ?
					locationData.map((item, inde) => {
						let { location: { name = '', region = '', country = '', localtime_epoch = '' } = {},
							current: { condition: { text = '', icon = '' } = {}, temp_c = '' } = {},
							forecast: { forecastday = [] } = {}
						} = item;
						return (
							<Fragment key={inde}>
								<div className='location-country-info' >
									<span>  Label : </span>
									<span> {checkvalue(name) ? name : ''} </span>
									<br />
									<span>  Region : </span>
									<span> {checkvalue(region) ? region : ''} </span>
									<br />
									<span>  Countr : </span>
									<span> {checkvalue(country) ? country : ''} </span>
								</div>
								<div className='location-current'>
									<h5> Current Temperature : {checkvalue(temp_c) ? `${temp_c} 'c` : ''}  </h5>
									<img src={icon} alt="icon" />
									<p> {text} </p>
								</div>
								<div className="loation-forecast" >
									{
										[...forecastday].map((inneritem, innerindex) => {
											let { day: { condition: { text: forecasttext = '', icon: forecastIcon = '' } = {} } = {}, hour = [] } = inneritem;
											return (
												<ul key={innerindex}>
													<li>
														<img src={forecastIcon} alt="forecastIcon" />
														<p> {forecasttext} </p>
														{
															[...hour].map((inhour, inhouritem) => {
																let { condition: { text: hourtet = '', icon: houricon = '' } = {}, temp_c :temperaturec = '' } = inhour;
																return (
																	<ul key={inhouritem}>
																		<h5> Temperature : {checkvalue(temperaturec) ? `${temperaturec} 'c` : ''}  </h5>
																		<img src={houricon} alt="houricon" />
																		<p> {hourtet} </p>
																	</ul>
																)
															})
														}
													</li>
												</ul>
											)
										})
									}
								</div>
							</Fragment>
						)
					})
					: null
			}
		</div>
	);
}

export default App;
