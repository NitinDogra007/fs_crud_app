import axios from 'axios';
import { useState } from 'react';
import ModalForm from './components/ModalForm';
import Navbar from './components/NavBar';
import Tablelist from './components/TableList';

function App() {
	const [isOpen, setIsOpen] = useState(false);
	const [modalMode, setModalMode] = useState('add');
	const [searchTerm, setSearchTerm] = useState('');
	const [clientData, setClientData] = useState(null);

	const handleOpen = (mode) => {
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
				console.log('Client added:', response.data);  // Log the response
			} catch (error) {
				console.error('Error adding client:', error)
			}
		} else {
			console.log('Modal mode Edit');
		}
	};

	return (
		<>
			<Navbar onOpen={() => handleOpen('add')} onSearch={setSearchTerm} />
			<Tablelist handleOpen={handleOpen} searchTerm={searchTerm} />
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
