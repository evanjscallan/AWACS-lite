import React, { useState } from 'react';
import { UserInfo } from '../App';
import './../App.css';

interface UserFormProps {
	onSubmit: (data: FormData) => void;
}

export interface FormData {
	firstName?: string;
	lastName?: string;
	email?: string;
	projectName?: string;
	enableFormat?: boolean;
	testName?: string;
	format?: 'Microsoft Azure Devops' | 'Jira' | 'Other' | '';
	additionalProjectDetails?: string;
}
const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
	const [formData, setFormData] = useState<FormData>({
		firstName: '',
		lastName: '',
		email: '',
		projectName: '',
		enableFormat: false,
		testName: '',
		format: '',
		additionalProjectDetails: '',
	});
	const [formatEnabled, setFormatEnabled] = useState(false);
	const enableFormatter = () => {
		setFormatEnabled(!formatEnabled);
	};

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<div>
			<ul>
				<form onSubmit={handleSubmit}>
					<div className="input-rows">
						<li className="input-item">
							<label htmlFor="firstName">First Name</label>
							<input
								autoComplete="on"
								placeholder="First Name..."
								type="text"
								name="firstName"
								onChange={handleChange}
								value={formData.firstName!}
							/>
						</li>
						<li className="input-item">
							<label htmlFor="lastName">Last Name</label>
							<input
								autoComplete="on"
								placeholder="Last Name..."
								type="text"
								name="lastName"
								onChange={handleChange}
								value={formData!.lastName!}
							/>
						</li>
						<li className="input-item">
							<label htmlFor="email">Email</label>
							<input
								placeholder="Email..."
								type="text"
								name="email"
								onChange={handleChange}
								value={formData!.email!}
							/>
						</li>
						<li className="input-item">
							<label htmlFor="projectName">Project Name</label>
							<input
								autoComplete="on"
								placeholder="Project Name..."
								type="text"
								name="projectName"
								onChange={handleChange}
								value={formData.projectName!}
							/>
						</li>
						<li className="input-item">
							<label htmlFor="testName">Test Case Name</label>
							<input
								autoComplete="on"
								placeholder="Test Case Name..."
								type="text"
								name="testName"
								onChange={handleChange}
								value={formData.testName!}
							/>
						</li>
					</div>

					<span>
						<input
							autoComplete="on"
							type="checkbox"
							name="enableFormat"
							title="enableFormatCheckbox"
							required={false}
							onClick={() => enableFormatter()}
						/>
						<label htmlFor="enableFormat">Enable Formatting</label>
					</span>
					{formatEnabled ? (
						<div className="formatterRadio">
							<input
								type="radio"
								title="ADORadio"
								name="format"
								onChange={handleChange}
								value="Microsoft Azure Devops"
							/>
							Azure Devops
							<input
								type="radio"
								title="JiraRadio"
								name="format"
								value="Jira"
							/>
							Jira
							<input
								type="radio"
								title="OtherRadio"
								name="format"
								onChange={handleChange}
								value="Other"
							/>
							Other
						</div>
					) : (
						<p>
							Click the 'Enable Formatting' checkbox for CSV formatting options.
						</p>
					)}
					<textarea
						title="additionalProjectDetails"
						name="additionalProjectDetails"
						className="additional-details"
						onChange={handleChange}
						value={formData.additionalProjectDetails!}
					/>
					<div></div>
					<button type="submit">Submit</button>
				</form>
			</ul>
			<button type="button" className="about-button">
				{' '}
				About{' '}
			</button>
		</div>
	);
};

export default UserForm;
