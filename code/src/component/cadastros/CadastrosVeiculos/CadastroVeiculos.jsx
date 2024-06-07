import { useEffect } from 'react'
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { FaRegFilePdf } from "react-icons/fa";
import { RiFileExcelLine } from "react-icons/ri";
import { FaPlusCircle } from "react-icons/fa";
import { BiSolidArrowToTop } from "react-icons/bi";
import { BiSolidArrowFromTop } from "react-icons/bi";
import { useState } from 'react';
import { FaPencil } from "react-icons/fa6";
import { TbEyeSearch } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { FaFilter } from "react-icons/fa";
import UtilBar from "../../UtilBar/UtilBar";
import OptionsButton from "../../OptionButton";
import PrimatyTable from "../../Tables/PrimatyTable";
import DefautlLoadingTable from '../../loadings/loadingsTables/defaultLoadingTables';

const columns = [
    { id: 'Options', label: `Options`, minWidth: 100 },
    { id: 'veiculomarca', label: 'Marca', minWidth: 170 },
    { id: 'veiculomodelo', label: 'Modelo', minWidth: 170 },
    { id: 'veiculotipoveiculo', label: 'Tipo de Veículo', minWidth: 170 },
    { id: 'veiculomodelocarroceria', label: 'Modelo de Carroceria', minWidth: 170 },
    { id: 'veiculotiporodado', label: 'Tipo de Rodado', minWidth: 170 },
    { id: 'veiculocapacidadetanque', label: 'Capacidade Tanque(L)', minWidth: 170 },
    { id: 'veiculoplaca', label: 'Placa', minWidth: 170 },
    { id: 'veiculorenavam', label: 'RENAVAM', minWidth: 170 },
    { id: 'veiculopropriedade', label: 'Propriedade', minWidth: 170 },
    { id: 'veiculochassi', label: 'Chassi', minWidth: 170 },
    { id: 'veiculodataaquisicao', label: 'Data Aquisição', minWidth: 170 },
    { id: 'veiculoanofabricação', label: 'Ano de Fabricação', minWidth: 170 },
    { id: 'veiculoanomodelo', label: 'Ano de Modelo', minWidth: 170 },
    { id: 'veiculocor', label: 'Cor', minWidth: 170 },
    { id: 'veiculosituacao', label: 'Situação', minWidth: 170 },
];

export default function MainCadastroVeiculo() {

    const [sortedRows, setSortedRows] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [dadosLoading, setDadosLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const iconsSize = 20;

    const handleOpen = (row) => {
        setOpen(true);
        setSelectedRow(row);
    };

    /* GET dos dados */
    useEffect(() => {
        const url = 'https://api.combutech.com.br/api/api/Veiculo/BuscaVeiculosPorTransportadora/';
        const authToken = localStorage.getItem('authToken');

        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        };

        fetch(url, {
            method: 'GET',
            headers: headers,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na requisição. Código de status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setSortedRows(data.data || []);
                console.log(data.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setDadosLoading(false);
            });
    }, []);

    const sortRows = (property) => {
        const sorted = [...sortedRows].sort((a, b) => {
            const comparison = a[property].localeCompare(b[property]);
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        setSortedRows(sorted);
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const handleRowDetalhes = (veiculoid) => {
        const rowData = sortedRows.find(row => row.veiculoid === veiculoid);
        navigate(`/auth/cadastros/veiculos/edit/${veiculoid}`, {
            state: { dados: rowData }
        });
    };

    return <>
        {/* Menu superior de opções */}
        <UtilBar titleButton="Opções">
            <MenuItem>
                <a href="#">
                    <FaPlusCircle size={iconsSize} />
                    Criar Registro
                </a>
            </MenuItem>
            <MenuItem>
                <FaRegFilePdf size={iconsSize} />
                Gerar PDF
            </MenuItem>
            <MenuItem>
                <RiFileExcelLine size={iconsSize} />
                Gerar Excell
            </MenuItem>
        </UtilBar>

        {/* Importação da tabela recebendo os dados por props */}
        <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0' }}>
            <OptionsButton titleOption={<FaFilter />}>
                <MenuItem onClick={() => sortRows('abastecimentoId')}>
                    <BiSolidArrowToTop />
                    Crescente
                </MenuItem>
                <MenuItem onClick={() => sortRows('abastecimentoId')}>
                    <BiSolidArrowFromTop />
                    Descrecente
                </MenuItem>
            </OptionsButton>

            {dadosLoading ? (
                <DefautlLoadingTable />
            ) : (
                <PrimatyTable
                    dadosCollunas={columns}
                    dadosRows={sortedRows}
                    rowsLength={sortedRows.length}
                    idChavePrincipal='veiculoid'
                    idKey="veiculoid"
                    opcoesSubMenu={(rowId) => (
                        <>
                            <MenuItem onClick={() => handleRowDetalhes(rowId)} style={{ display: 'flex', alignItems: 'center', }}>
                                <FaPencil size={15} />
                                Editar
                            </MenuItem>
                            <MenuItem onClick={() => handleOpen(sortedRows[rowId])} style={{ display: 'flex', alignItems: 'center', }}>
                                <TbEyeSearch size={20} />
                                Observações
                            </MenuItem>
                        </>
                    )}
                />
            )}
        </div>
    </>
}

const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#99CCF3',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E6',
    700: '#0059B3',
    800: '#004C99',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const MenuItem = styled(BaseMenuItem)(({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[50]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }
  `,
);

