import React, { useEffect, useState } from 'react';

const ModalForm = ({ isOpen, onClose, mode, onSubmit, clientData }) => {
	const [rate, setRate] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [job, setJob] = useState('');
	const [status, setStatus] = useState(false);

	useEffect(() => {
		if (mode === 'edit' && clientData) {
			setName(clientData.name || '');
			setEmail(clientData.email || '');
			setJob(clientData.job || '');
			setRate(clientData.rate || '');
			setStatus(clientData.isactive ?? false);
		} else if (mode === 'add') {
			setName('');
			setEmail('');
			setJob('');
			setRate('');
			setStatus(false);
		}
	}, [mode, clientData]);

	// Handle the change of status
	const handleStatusChange = (e) => {
		setStatus(e.target.value === 'Active'); // Set status as boolean
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!name.trim() || !email.trim() || !job.trim() || !rate) {
			alert('All fields are required.');
			return;
		}

		try {
			const payload = {
				name: name.trim(),
				email: email.trim(),
				job: job.trim(),
				rate: Number(rate),
				isactive: status,
			};
			await onSubmit(payload);
			onClose();
		} catch (error) {
			console.error('Error submitting client:', error);
			alert('Submission failed. Check console for details.');
		}
	};

	return (
		<div>
			<dialog id="my_modal_3" className="modal" open={isOpen}>
				<div className="modal-box">
					<h3 className="font-bold text-lg py-4">
						{mode === 'edit' ? 'Edit Client' : 'Client Details'}
					</h3>
					<form method="dialog" onSubmit={handleSubmit}>
						{/* if there is a button in form, it will close the modal */}
						<label className="input my-4 flex gap-2 w-full">
							Name
							<input
								type="search"
								className="grow w-full"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</label>
						<label className="input my-4 flex gap-2 w-full">
							Email
							<input
								type="email"
								className="grow w-full"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</label>
						<label className="input my-4 flex gap-2 w-full">
							Job
							<input
								type="search"
								className="grow w-full"
								value={job}
								onChange={(e) => setJob(e.target.value)}
							/>
						</label>

						<div className="flex mb-4 justify-between my-4 gap-2">
							<label className="input">
								Rate
								<input
									type="number"
									className="grow w-full"
									value={rate}
									onChange={(e) => setRate(e.target.value)}
								/>
							</label>
							<select
								value={status ? 'Active' : 'Inactive'}
								className="select"
								onChange={handleStatusChange}
							>
								<option>Inactive</option>
								<option>Active</option>
							</select>
						</div>

						<button
							onClick={onClose}
							className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
						>
							✕
						</button>
						<button className="btn btn-success">
							{mode === 'edit' ? 'Save Changes' : 'Add Client'}
						</button>
					</form>
				</div>
			</dialog>
		</div>
	);
};

export default ModalForm;
