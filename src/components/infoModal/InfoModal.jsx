import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	display: 'flex',
	flexDirection: 'column',
	bgcolor: 'background.paper',
	border: '1px solid #272727',
	borderRadius: '5px',
	boxShadow: 24,
	p: 3,
};

const InfoModal = ({ open, setOpen, func }) => {
	const handleClose = () => setOpen(false);

	const handleYesFunc = () => {
		func();
		setOpen(false);
	};

	return (
		<div>
			<Modal
				open={open}
				// onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<div style={{ marginBottom: '20px', textAlign: 'center' }}>Are you sure you want to logout?</div>
					<div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 auto', width: '85%' }}>
						<button className="btn btn--red btn--universal" onClick={handleYesFunc}>
							Yes
						</button>
						<button className="btn btn--black btn--universal" onClick={handleClose}>
							No
						</button>
					</div>
				</Box>
			</Modal>
		</div>
	);
};

export default InfoModal;
