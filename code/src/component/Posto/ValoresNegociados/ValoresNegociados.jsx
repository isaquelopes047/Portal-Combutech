import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { BsPencil } from "react-icons/bs";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { formatNumberForValorUnitario } from '../../../component/Abastecimentos/Integrados/formatters';
import { ButtonAccept, ModalMain } from './ValoresNegociados-style';
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const EditContainer = () => {
    const style = {
        width: 40,
        height: 40,
        backgroundColor: '#0a82fd',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    }

    return (
        <div style={{ ...style }}>
            <BsPencil color='#fff' size={18} />
        </div>
    )
};

const columns = [
    { id: 'produto', label: `Produto` },
    { id: 'valorAtual', label: 'Valor Atual' },
    { id: 'alterar', label: 'Negociar' },
];

const data = [
    { produto: 'OLEO DIESEL S10', valorAtual: 'R$ 5.49', alterar: <EditContainer /> },
    { produto: 'OLEO DIESEL S500', valorAtual: 'R$ 5.30', alterar: <EditContainer /> },
    { produto: 'ARLA 32 - L', valorAtual: 'R$ 2.99', alterar: <EditContainer /> },
];

const defaultInputsAutoComplete = {
    '& .css-16e8wmc-MuiAutocomplete-root, & .MuiOutlinedInput-root, & .MuiAutocomplete-input': { paddingLeft: 1, paddingTop: 0, height: '40px' },
    '& .MuiAutocomplete-hasPopupIcon.css-6c6kjn-MuiAutocomplete-root, & .MuiOutlinedInput-root, & .MuiAutocomplete-hasClearIcon.css-6c6kjn-MuiAutocomplete-root, & .MuiOutlinedInput-root': { height: '50px' },
};

const defaultInputStyle = {
    border: 'none',
    '& input': {
        backgroundColor: '#fff',
        border: 'none',
    },
    '& input:focus': {
        backgroundColor: '#fff',
        border: 'none',
    }
};

export default function ValoresNegociados() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [fieldClicked, setFieldClicked] = useState(false);
    const [dadosFormulario, setDadosFormulario] = React.useState({
        valorUnitario: '5,49',
    });

    const handleChangeForNumber = (campo, valor, formatter) => {
        setFieldClicked(prevFieldClicked => ({
            ...prevFieldClicked,
            [campo]: true
        }));

        const formattedValue = formatter(valor);

        setDadosFormulario(prevDadosFormulario => ({
            ...prevDadosFormulario,
            [campo]: formattedValue
        }));
    };

    return (
        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <caption>Valores individuais dos produtos negociados</caption>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.produto}
                                </TableCell>
                                <TableCell align="left">{row.valorAtual}</TableCell>
                                <TableCell align="left" onClick={handleOpen}>{row.alterar}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography sx={{ marginLeft: '-12px', marginTop: '15px' }}>Você pode solicitar a mudança do valor negociado a qualquer momento. Esse processo abrirá um chamado à Combutech sobre a negociação do valor solicitado, e estará em aberto para aprovação.</Typography>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ ...defaultInputsAutoComplete, ...defaultInputStyle }}
            >
                <ModalMain>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Solicitar novo valor
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Digite a baixo o valor desejado  a ser renegociado
                    </Typography>
                    <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', }}>
                        <TextField
                            id="outlined-basic"
                            value={`R$ ${dadosFormulario.valorUnitario}`}
                            label="Valor" variant="outlined"
                            sx={{ width: '88%' }}
                            onChange={(event) => handleChangeForNumber('valorUnitario', event.target.value, formatNumberForValorUnitario)}
                        />
                        <ButtonAccept>
                            <IoCheckmarkCircleSharp size={25} color='#fff' />
                        </ButtonAccept>
                    </Box>
                    <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: '12px', }}>
                        Ao solicitar a alteração do valor, seu pedido será encaminhado para análise pela equipe da Combutech. Esta análise levará em consideração diversos fatores, como políticas internas da empresa, condições contratuais e viabilidade financeira. Após a análise, o registro poderá ser aprovado ou recusado. Caso haja dúvidas ou necessidade de mais informações, estamos à disposição para ajudar. Não hesite em entrar em contato conosco pelos canais de comunicação.
                    </Typography>
                </ModalMain>
            </Modal>
        </div>
    );
}

