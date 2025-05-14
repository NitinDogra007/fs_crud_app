import React from 'react';

let clients = [
	{
		id: 1,
		name: 'John Doe',
		email: 'johndoe@gmail.com',
		job: 'Developer',
		rate: '100',
		isActive: true,
	},
	{
		id: 2,
		name: 'John1 Doe',
		email: 'johndoe@gmail.com',
		job: 'Developer1',
		rate: '101',
		isActive: true,
	},
	{
		id: 3,
		name: 'John2 Doe',
		email: 'johndoe@gmail.com',
		job: 'Developer2',
		rate: '102',
		isActive: false,
	},
];

const Tablelist = ({ handleOpen }) => {
	return (
		<div className="m-4">
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
						{clients.map((client) => (
							<tr>
								<th>{client.id}</th>
								<td>{client.name}</td>
								<td>{client.email}</td>
								<td>{client.job}</td>
								<td>{client.rate}</td>
								<td>
									<button
										className={`btn rounded-full w-20 ${
											client.isActive
												? `btn-primary`
												: `btn-outline btn-primary`
										}`}
									>
										{client.isActive ? 'Active' : 'Inactive'}
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
