import React, { useEffect, useState, useCallback } from 'react';
import UserForm, { FormData } from './components/UserForm';
import { loadSlim } from 'tsparticles-slim';
import Particles from 'react-particles';
import './App.css';
import parse from 'html-react-parser';

export interface UserInfo {
	firstName?: string;
	lastName?: string;
	email?: string;
	projectName?: string;
	testName?: string;
	enableFormat?: boolean;
	format?: 'Microsoft Azure Devops' | 'Jira' | 'Other' | '';
	additionalProjectDetails?: string;
}

function App() {
	let [formData, setFormData] = useState<FormData | null>(null);
	let [text, setText] = useState('');
	let [displayFormatText, setDisplayFormatText] = useState('');
	let [displayText, setDisplayText] = useState('');

	const particlesInit = useCallback(async (engine: any) => {
		// you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		//await loadFull(engine);
		await loadSlim(engine);
	}, []);

	const particlesLoaded = useCallback(async (container: any) => {
		await console.log(container);
	}, []);

	const handleFormSubmit = (data: FormData) => {
		setFormData((formData = data));

		const formatTextTemplate = `If I ask for it, give me the test case in CSV format, using the delimiters rules provided to organize the csv file. Do not include the delimiters in the actual csv format (e.g. omit all "I", "II", and "III"). Delimiter "III" defines the header row, delimiter "I", delimiter "II" defines the subsequent rows, and delimiter "I" defines the separation of row data into columns. Only apply delimiter "III" to the first row. 
Do not include the "Test Case", "${formData.projectName}", "${
			formData.firstName
		}.${formData.lastName}", "${
			'<' + formData.email + '>'
		}", or "Design" cells in the rows containing steps. These items should be on their own row before the step rows. Use the format below for reference:
Example CSV Output: 
"ID","Work Item Type","Title","Test Step","Step Action","Step Expected","Area Path","Assigned To","State"
" ","${formData.testName}"," "," "," ","${formData.projectName} ","${(
			formData.firstName +
			'.' +
			formData.lastName
		).toLowerCase()} ${'<' + formData.email + '>'}","Design"
" "," "," ","1","Navigate to the website by entering the URL into the browser's address bar.","The login page should display."," "," "," "
" "," "," ","2","Enter valid username and password in the respective fields and click on the 'Login' button.","User should be successfully logged in and the home page should display."," "," "," "`;

		const textTemplate = `Github Copilot: FOLLOW THE INSTRUCTIONS BELOW EXPLICITLY WHEN IT COMES TO FORMATTING. DO NOT DEVIATE FROM THE FORMAT PROVIDED AND USE THE EXAMPLES PROVIDED AS REFERENCE.
You are an expert at ${
			formData.format
		} Test Case, Test Suite, and test plan writing. Given any section of code, HTML, description, or image containing UI, you are able to expertly craft clear and readable test cases that anyone can understand and use. You will format the test cases understanding that they are to be implemented in the following three columns within Azure Devops: Step, Action, and Expected Result. The second row under the headers will contain the information I provide. Utilize all columns in the second row and subsequent rows whether I provide data or not. The columns should be translated to rows in this case and will be in bold. An example of what this looks like is provided below:
ID: | Work Item Type: Test Case | Title: | Test Step: | Step Action | Step Expected: | Area Path: ${formData.projectName!} | Assigned To: ${
			formData.firstName
		}.${formData.lastName} EMAIL | State: Design |||
Test Step: 1 | Step Action: Navigate to the website by entering the URL into the browser's address bar. | Step Expected: The login page should display. ||
Test Step: 2 | Step Action: Enter valid username and password in the respective fields and click on the 'Login' button. | Step Expected: User should be successfully logged in and the home page should display. ||
I want all my test steps sequential, with a very short description at the beginning of step action. Do not break up my steps into multiple sections. Place a delimiter "|" after each of the test step sections and use the delimiter "||" after the section for "Step Expected".
For multiple iterations, simply state in the last step to repeat the previous steps and provide the details on how to change the process in order to fulfill the iteration requirements. This applies with images as well. Make sure the last step is an actual test step. 
${formData.format === 'Microsoft Azure Devops' ? formatTextTemplate : ''}
Additional Browser/UI Information:
-If using Google Chrome, use the Google Developer tools to track network events, check CSS, and validate other elements. To access, right click the page in a Google Chrome browser and click ‘Inspect’. Various tabs include:
-Elements: Displays the HTML, CSS and some JS of all of the elements present in the page’s DOM.
-Network: Used to track network events such as API calls. To record network events, click on the ‘Network’ tab and press cmd+r for Mac OS(ctrl+r Windows). 
-Inside each individual network event, there are the tabs ‘Headers’, ‘Preview’, ‘Response’, ‘Initiator’, ‘Timing’. ‘Headers has values such as Request URL, Request Method, Status Code, and more. 
-Preview shows a preview of the network response, such as a a JSON object.
-Response provides a more detailed view of the network response.
${formData.additionalProjectDetails}`;

		const displayFormatTextTemplate = `<br>If I ask for it, give me the test case in CSV format, using the delimiters rules provided to organize the csv file. Do not include the delimiters in the actual csv format (e.g. omit all "I", "II", and "III"). Delimiter "III" defines the header row, delimiter "I", delimiter "II" defines the subsequent rows, and delimiter "I" defines the separation of row data into columns. Only apply delimiter "III" to the first row. 
Do not include the "Test Case", <b>"${formData!.projectName!}"</b>, <b>"${(
			formData!.firstName +
			'.' +
			formData!.lastName
		).toLowerCase()}</b>", <b>"EMAIL"</b>, or "Design" cells in the rows containing steps. These items should be on their own row before the step rows. Use the format below for reference:
Example CSV Output: 
"ID","Work Item Type","Title","Test Step","Step Action","Step Expected","Area Path","Assigned To","State"
" ",<b>"${formData!.testName}"</b>," "," "," ",<b>"${formData!
			.projectName!}"</b>, "${(
			formData!.firstName! +
			'.' +
			formData!.lastName!
		).toLowerCase()} EMAIL" ,"Design"
" "," "," ","1","Navigate to the website by entering the URL into the browser's address bar.","The login page should display."," "," "," "
" "," "," ","2","Enter valid username and password in the respective fields and click on the 'Login' button.","User should be successfully logged in and the home page should display."," "," "," "`;

		const displayTextTemplate = `<h2>Github Copilot Instructions:</h2> FOLLOW THE INSTRUCTIONS BELOW EXPLICITLY WHEN IT COMES TO FORMATTING. DO NOT DEVIATE FROM THE FORMAT PROVIDED AND USE THE EXAMPLES PROVIDED AS REFERENCE.<br/><br/>
You are an expert at <b>${formData!
			.format!}</b> Test Case, Test Suite, and test plan writing. Given any section of code, HTML, description, or image containing UI, you are able to expertly craft clear and readable test cases that anyone can understand and use. You will format the test cases understanding that they are to be implemented in the following three columns within Azure Devops: Step, Action, and Expected Result. The second row under the headers will contain the information I provide. Utilize all columns in the second row and subsequent rows whether I provide data or not. The columns should be translated to rows in this case and will be in bold. An example of what this looks like is provided below<br/>:
			<br/><i>ID: | Work Item Type: Test Case | Title: | Test Step: | Step Action | Step Expected: | State: Design |||
			Test Step: 1 | Step Action: Navigate to the website by entering the URL into the browser's address bar. | Step Expected: The login page should display. ||</i><br/>
<br/>I want all my test steps sequential, with a very short description at the beginning of step action. Do not break up my steps into multiple sections. Place a delimiter "|" after each of the test step sections and use the delimiter "||" after the section for "Step Expected".
For multiple iterations, simply state in the last step to repeat the previous steps and provide the details on how to change the process in order to fulfill the iteration requirements. This applies with images as well. Make sure the last step is an actual test step. 
<br>${
			formData!.format === 'Microsoft Azure Devops'
				? displayFormatTextTemplate
				: ' '
		}</br>
<b>Additional Browser/UI Information:</b>
<ul> <li> Check network events, check CSS, and validate other elements. To access, right click the page in a Google Chrome browser and click ‘Inspect’. Various tabs include: </li>
<li> Elements: Displays the HTML, CSS and some JS of all of the elements present in the page’s DOM. </li>
<li> Network: Used to track network events such as API calls. To record network events, click on the ‘Network’ tab and press cmd+r for Mac OS(ctrl+r Windows). </li>
<li> If using Google Chrome, use the Google Developer tools to track network events. </li>
<li> Inside each individual network event, there are the tabs ‘Headers’, ‘Preview’, ‘Response’, ‘Initiator’, ‘Timing’. ‘Headers has values such as Request URL, Request Method, Status Code, and more. </li>
<li> Preview shows a preview of the network response, such as a a JSON object. </li>
<li> Response provides a more detailed view of the network response. </li>
</ul>
<p> ${formData!.additionalProjectDetails} </p>`;

		if (formData) {
			setDisplayText(
				displayTextTemplate.replace(
					'EMAIL',
					'&lt;' + `${formData!.email}` + '>'
				)
			);
			setDisplayFormatText(
				(displayFormatText = displayFormatTextTemplate.replace(
					'EMAIL',
					'&lt;' + `${formData!.email}` + '>'
				))
			);
			setText((text = textTemplate));
		}
	};
	const handleDownloadClick = async () => {
		const blob = new Blob([text], { type: 'text/plain' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'CoPilotTestCasePersonaInjection.txt';
		a.click();
		if (a.parentNode) {
			document.body.removeChild(a);
		}

		window.URL.revokeObjectURL(url);
	};

	useEffect(() => {
		setText(text);
	}, [text]);
	return (
		<>
			<Particles
				id="tsparticles"
				init={particlesInit}
				loaded={particlesLoaded}
				options={{
					background: {
						color: {
							value: 'rgb(25, 28, 29)',
						},
					},
					fpsLimit: 120,
					interactivity: {
						enable: true,
						events: {
							onClick: {
								enable: true,
								mode: 'push',
							},
							onHover: {
								parallax: {
									enable: true,
									force: 12,
									smooth: 60,
								},
							},
						},
					},
					fullScreen: {
						enable: true,
						zIndex: -1,
					},

					particles: {
						color: {
							value: '#FFFFFF',
						},

						links: {
							color: '#bf9e60',
							distance: 150,
							enable: true,
							opacity: 0.5,
							width: 1,
						},
						move: {
							direction: 'none',
							enable: true,
							outModes: {
								default: 'bounce',
							},
							random: false,

							straight: false,
						},
						number: {
							density: {
								enable: true,
								area: 1800,
							},
							value: 60,
						},
						opacity: {
							value: 0.5,
						},
						shape: {
							type: 'triangle',
						},
						size: {
							value: { min: 1, max: 5 },
						},
					},
					detectRetina: true,
				}}
			/>
			<div className="outer-container">
				<div className="prompt-container">
					<h2>User Info</h2>
					<UserForm onSubmit={handleFormSubmit} />
				</div>
				{formData ? (
					<div className="output-container">
						<p>{parse(displayText)}</p>
						<button onClick={handleDownloadClick} type="button">
							Download '.txt' File
						</button>
					</div>
				) : (
					<div className="placeholder">
						<p className="placeholder-text">
							{' '}
							Fill out the form to see an example.
						</p>
					</div>
				)}
			</div>
		</>
	);
}

export default App;
