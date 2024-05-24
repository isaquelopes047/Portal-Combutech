import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import InputMask from "react-input-mask";
import { BsPencil } from "react-icons/bs";
import { ButtonAccept } from './ValoresNegociados-style';
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

const produtos = [
    { produtoid: 2, produtodescricao: "OLEO DIESEL S500" },
    { produtoid: 3, produtodescricao: "ARLA 32" },
    { produtoid: 4, produtodescricao: "GASOLINA ADITIVADA" },
    { produtoid: 6, produtodescricao: "GASOLINA C ADITIVADA" },
    { produtoid: 7, produtodescricao: "ETANOL HIDRATADO COMUM" },
    { produtoid: 8, produtodescricao: "QUEROSENE" },
    { produtoid: 9, produtodescricao: "ARLA " },
    { produtoid: 10, produtodescricao: "ARLA" },
    { produtoid: 11, produtodescricao: "820101030" },
    { produtoid: 5, produtodescricao: "GASOLINA COMUM" },
    { produtoid: 1, produtodescricao: "OLEO DIESEL S10" },
    { produtoid: 12, produtodescricao: "ARLA BALDE 20LTS" }
];

const columns = [
    { id: 'produtoid', label: `Produto` },
    { id: 'produtopostopreconegociado', label: 'Valor Atual' },
    { id: 'alterar', label: 'Negociar' },
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
    const [produtoPosto, setProdutoPosto] = useState([]);
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const [currentPrecoNegociado, setCurrentPrecoNegociado] = useState(0);
    const [currentLitragemMaxima, setCurrentLitragemMaxima] = useState(0);
    const [formularioEnvio, setFormularioEnvio] = useState({
        observacao: "",
        idProduto: null,
        idProdutoPosto: null,
        precoNegociado: null,
        maximaLitragem: null,
    })
    const [alert, setAlert] = useState({
        messageAlert: '',
        typeAlert: '',
        show: false
    });

    /* Get produtos posto */
    useEffect(() => {
        const fetchProdutosPosto = async () => {
            const postoid = localStorage.getItem('postoid');

            if (postoid) {
                try {
                    const requestOptions = { method: 'GET', headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' } };
                    const response = await fetch(`https://api.combutech.com.br/api/Posto/BuscaProdutosPosto/${postoid}`, requestOptions);

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    setProdutoPosto(data.data);
                } catch (error) {
                    console.error('Fetch error:', error);
                }
            }
        };

        fetchProdutosPosto();
    }, []);

    const handleChangeForNumber = (valor) => {
        setCurrentPrecoNegociado(valor);
        setFormularioEnvio(prevFormulario => ({
            ...prevFormulario,
            precoNegociado: parseFloat(valor)
        }));
    };

    const handleOpen = (row) => {
        setFormularioEnvio({
            ...formularioEnvio,
            idProduto: row.produtoid,
            idProdutoPosto: row.produtopostoid,
            precoNegociado: parseFloat(row.produtopostopreconegociado),
        });
        setCurrentPrecoNegociado(parseFloat(row.produtopostopreconegociado));
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentPrecoNegociado('');
        setFormularioEnvio({
            observacao: "",
            idProduto: null,
            idProdutoPosto: null,
            precoNegociado: null,
            maximaLitragem: null
        });
    };

    const handleSubmit = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(formularioEnvio)
            };
            const response = await fetch('https://api.combutech.com.br/api/Posto/CriarSolicitacao', requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setAlert({
                messageAlert: "Sucesso ao criar uma nova solicitação de abastecimento, aguarde o contato da Combutech, nossa equipe irá entrar em contato com você",
                typeAlert: 'success',
                show: true
            });
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        } catch (error) {
            setAlert({
                messageAlert: "Erro ao solicitar um novo valor. Se o problema persistir, entre em contato com o suporte",
                typeAlert: 'error',
                show: true,
            });
        }
    };

    const produtoMap = produtos.reduce((acc, produto) => {
        acc[produto.produtoid] = produto.produtodescricao;
        return acc;
    }, {});

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
                        {produtoPosto.map((row) => (
                            <TableRow key={row.produtoid}>
                                <TableCell component="th" scope="row">
                                    {produtoMap[row.produtoid] || "Descrição não encontrada"}
                                </TableCell>
                                <TableCell align="left">R$ {row.produtopostopreconegociado}</TableCell>
                                <TableCell align="left" onClick={() => handleOpen(row)}>
                                    <div>
                                        <EditContainer onClick={() => handleOpen(row)} />
                                    </div>
                                </TableCell>
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
                <Box sx={style}>

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Solicitar novo valor
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Digite abaixo os valores desejado a ser renegociado
                    </Typography>

                    {/* INPUT DE ENVIO DE VALOR MEDIADO ENTRE POSTO E COMBUTECH */}
                    <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <InputMask
                            mask="9.999"
                            value={currentPrecoNegociado}
                            onChange={(e) => handleChangeForNumber(e.target.value)}
                        >
                            {(inputProps) => (
                                <TextField
                                    id="outlined-basic"
                                    label="Digite o novo valor"
                                    variant="outlined"
                                    sx={{ width: '100%' }}
                                    {...inputProps}
                                />
                            )}
                        </InputMask>
                    </Box>

                    {/* INPUT DE ENVIO DE LITRAGEM MAXIMA */}
                    <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <TextField
                            id="outlined-basic"
                            value={currentLitragemMaxima}
                            label="Litragem máxima"
                            variant="outlined"
                            sx={{ width: '90%' }}
                            onChange={(event) => {
                                const value = parseFloat(event.target.value);
                                setCurrentLitragemMaxima(isNaN(value) ? '' : value);
                                setFormularioEnvio(prevState => ({
                                    ...prevState,
                                    maximaLitragem: isNaN(value) ? null : value
                                }));
                            }}
                        />
                        <ButtonAccept onClick={handleSubmit}>
                            <IoCheckmarkCircleSharp size={25} color='#fff' />
                        </ButtonAccept>
                    </Box>

                    {alert.show ? (
                        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
                            <div>
                                <Alert severity={alert.typeAlert}>{alert.messageAlert}</Alert>
                                {!alert.messageAlert.startsWith('Erro')}
                            </div>
                        </div>
                    ) : (null)}

                    <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: '12px' }}>
                        Ao solicitar a alteração do valor, seu pedido será encaminhado para análise pela equipe da Combutech. Esta análise levará em consideração diversos fatores, como políticas internas da empresa, condições contratuais e viabilidade financeira. Após a análise, o registro poderá ser aprovado ou recusado. Caso haja dúvidas ou necessidade de mais informações, estamos à disposição para ajudar. Não hesite em entrar em contato conosco pelos canais de comunicação.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

