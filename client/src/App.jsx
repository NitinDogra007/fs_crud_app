import axios from 'axios';
import { useState } from 'react';
import ModalForm from './components/ModalForm';
import Navbar from './components/NavBar';
import Tablelist from './components/TableList';

function App() {
	const [isOpen, setIsOpen] = useState(false);
	const [modalMode, setModalMode] = useState('add');
	const [searchTerm, setSearchTerm] = useState('');

	const handleOpen = (mode) => {
		setModalMode(mode);
		setIsOpen(true);
	};

	const handleSubmit = () => {
		if (modalMode === 'add') {
			console.log('modal mode Add');
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
			/>
		</>
	);
}

export default App;
