import axios from 'axios';
import { useEffect, useState } from 'react';
import ModalForm from './components/ModalForm';
import Navbar from './components/NavBar';
import Tablelist from './components/TableList';

function App() {
	const [isOpen, setIsOpen] = useState(false);
	const [modalMode, setModalMode] = useState('add');
	const [searchTerm, setSearchTerm] = useState('');
	const [clientData, setClientData] = useState(null);
	const [tableData, setTableData] = useState([]);

	const fetchClients = async () => {
		try {
			const response = await axios.get('http://localhost:3000/api/clients');
			setTableData(response.data);
		} catch (error) {
			setError(error.message);
		}
	};

	useEffect(() => {
		fetchClients();
	}, []);

	const handleOpen = (mode, client) => {
		setClientData(client);
		setModalMode(mode);
		setIsOpen(true);
	};

	const handleSubmit = async (newClientData) => {
		if (modalMode === 'add') {
			try {
				const response = await axios.post(
					'http://localhost:3000/api/clients',
					newClientData
				);
				console.log('Client added:', response.data); // Log the response
				setTableData((prevData) => [...prevData, response.data]);
				// Optionally, update your state here to reflect the newly added client
			} catch (error) {
				console.error('Error adding client:', error);
			}
			console.log('modal mode Add');
		} else {
			console.log('Updating client with ID:', clientData.id); // Log ID being updated
			try {
				const response = await axios.put(
					`http://localhost:3000/api/clients/${clientData.id}`,
					newClientData
				);
				console.log('Client Updated:', response.data);
				setTableData((prevData) =>
					prevData.map((client) =>
						client.id === clientData.id ? response.data : client
					)
				);
			} catch (error) {
				console.error('Error updating client:', error);
			}
		}
	};

	return (
		<>
			<Navbar onOpen={() => handleOpen('add')} onSearch={setSearchTerm} />
			<Tablelist
				setTableData={setTableData}
				tableData={tableData}
				handleOpen={handleOpen}
				searchTerm={searchTerm}
			/>
			<ModalForm
				isOpen={isOpen}
				onSubmit={handleSubmit}
				onClose={() => setIsOpen(false)}
				mode={modalMode}
				clientData={clientData}
			/>
		</>
	);
}

export default App;
