import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Tablelist = ({ handleOpen }) => {
	const [tableData, setTableData] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('http://localhost:3000/api/clients');
				setTableData(response.data);
			} catch (error) {
				setError(error.message);
			}
		};
		fetchData();
	}, []);

	return (
		<div className="m-4">
			{error && <div className="alert alert-error">{error}</div>}

			<div className="overflow-x-auto ">
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Email</th>
							<th>Job</th>
							<th>Rate</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody className="hover:bg-base-300">
						{tableData.map((client) => (
							<tr>
								<th>{client.id}</th>
								<td>{client.name}</td>
								<td>{client.email}</td>
								<td>{client.job}</td>
								<td>{client.rate}</td>
								<td>
									<button
										className={`btn rounded-full w-20 ${
											client.isactive ? `btn-primary` : `btn-neutral`
										}`}
									>
										{client.isactive ? 'Active' : 'Inactive'}
									</button>
								</td>
								<td>
									<button
										onClick={() => handleOpen('edit')}
										className="btn btn-secondary"
									>
										Update
									</button>
								</td>
								<td>
									<button className="btn btn-accent">Delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Tablelist;
