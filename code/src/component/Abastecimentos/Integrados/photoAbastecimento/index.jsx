import styled from 'styled-components';
import React, { useState } from 'react'
import { IoMdPhotos } from "react-icons/io";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const MainContainer = styled.div`
    width: 50px;
    height: 50px;
    background-color: #0e5bc0;
    margin-top: 11px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.3s;
    margin-right: 8px;

    &:hover {
        background-color: #497ab9;
        transition: 0.3s;
    }
`

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function PhotoAbastecimento({ imagemUrl }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return <>
        <MainContainer>
            <IoMdPhotos color='#fff' size={20} onClick={handleOpen} />
        </MainContainer>

        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Imagem do painel do veiculo
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div>
                            {imagemUrl ? (
                                <img src={imagemUrl} alt="Imagem do abastecimento" style={{ width: '100%', height: 'auto' }} />
                            ) : (
                                <p>Imagem não disponível</p>
                            )}
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    </>
}