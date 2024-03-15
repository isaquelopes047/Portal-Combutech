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
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { GiHamburgerMenu } from "react-icons/gi";

const columns = [
    { id: 'Options', label: `Options`, minWidth: 100 },
    { id: 'postotipopessoa', label: 'Tipo de Pessoa', minWidth: 170 },
    { id: 'postorazaosocial', label: 'Razão Social', minWidth: 170 },
    { id: 'postonomefantasia', label: 'Nome Fantasia', minWidth: 170 },
    { id: 'postocnpj', label: 'CNPJ', minWidth: 170 },
    { id: 'postoinscricaoestadual', label: 'Inscrição Estadual', minWidth: 170 },
    { id: 'postouf', label: 'UF', minWidth: 170 },
    { id: 'postocidade', label: 'Cidade', minWidth: 170 },
    { id: 'postobairro', label: 'Bairro', minWidth: 170 },
    { id: 'postotelefone', label: 'Telefone', minWidth: 170 },
    { id: 'postocelular', label: 'Celular', minWidth: 170 },
    { id: 'postoemail', label: 'Email', minWidth: 170 },
    { id: 'postoatividade', label: 'Atividade', minWidth: 170 },
    { id: 'postoconveniado', label: 'Posto Conveniado', minWidth: 170 },
    { id: 'postosituacao', label: 'Situação', minWidth: 170 },
    { id: 'postorecebermanifestacao', label: 'Receber Menifestação', minWidth: 170 },
];

export default function MainPostos() {

    const [sortedRows, setSortedRows] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [dadosOriginais, setDadosOriginais] = useState([]);
    const [filtro, setFiltro] = useState('');
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
        const url = 'http://localhost:86/api/Posto/BuscaPostos';
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
                setDadosOriginais(data.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setDadosLoading(false);
            });
    }, []);

    useEffect(() => {
        // Filtrar os dados com base no filtro
        if (filtro.trim() === '') {
            setSortedRows(dadosOriginais);
        } else {
            const linhasFiltradas = dadosOriginais.filter(row => {
                return Object.values(row).some(value => {
                    if (value !== null && value !== undefined) {
                        return value.toString().toLowerCase().includes(filtro.toLowerCase());
                    }
                    return false;
                });
            });
            setSortedRows(linhasFiltradas);
        }
    }, [filtro, dadosOriginais]);

    const sortRows = (property) => {
        const sorted = [...sortedRows].sort((a, b) => {
            const comparison = a[property].localeCompare(b[property]);
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        setSortedRows(sorted);
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const handleRowDetalhes = (postoid) => {
        const rowData = sortedRows.find(row => row.postoid === postoid);
        navigate(`/cadastros/veiculos/edit/${postoid}`, {
            state: { dados: rowData }
        });
    };

    const handleChangeFiltro = (event) => {
        const valorFiltro = event.target.value;
        setFiltro(valorFiltro);
    };

    return <>
        {/* Menu superior de opções */}
        <UtilBar titleButton={<GiHamburgerMenu />}>
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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

                <TextField
                    helperText=" "
                    id="outlined-basic"
                    variant="outlined"
                    label="Pesquisar"
                    InputProps={{
                        startAdornment: (
                            <SearchIcon sx={{ marginRight: 1, color: 'action.active' }} />
                        ),
                    }}
                    sx={{ width: '260px' }}
                    value={filtro}
                    onChange={handleChangeFiltro}
                />
            </div>

            {dadosLoading ? (
                <DefautlLoadingTable />
            ) : (
                <PrimatyTable
                    dadosCollunas={columns}
                    dadosRows={sortedRows}
                    rowsLength={sortedRows.length}
                        idChavePrincipal='postoid'
                        idKey="postoid"
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

