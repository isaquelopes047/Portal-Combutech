import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { MainContainer, ShareButton } from './styled/PrevisaoRoteiro-styled';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { IoMapSharp } from "react-icons/io5";

const LIBRARIES = ['places'];

const defaultInputStyle = {
    flex: 1,
    marginTop: 1.5,
    '& input': {
        marginLeft: 0,
        backgroundColor: '#fff',
        border: 0,
        paddingLeft: 1,
    },
    '& input:focus': {
        backgroundColor: '#fff',
        border: 0,
    }
};

const defaultInputsAutoComplete = {
    '& label.Mui-focused': { paddingLeft: 0 },
    '& .css-16e8wmc-MuiAutocomplete-root, & .MuiOutlinedInput-root, & .MuiAutocomplete-input': { paddingLeft: 1, paddingTop: 0, height: '40px' },
    '& .css-1q60rmi-MuiAutocomplete-endAdornment': { top: 0 },
    '& .MuiAutocomplete-hasPopupIcon.css-6c6kjn-MuiAutocomplete-root, & .MuiOutlinedInput-root, & .MuiAutocomplete-hasClearIcon.css-6c6kjn-MuiAutocomplete-root, & .MuiOutlinedInput-root': { height: '50px' },
    '& .MuiButtonBase-root, & .MuiIconButton-root & .MuiIconButton-sizeMedium & .MuiAutocomplete-popupIndicator & .css-qzbt6i-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-popupIndicator': { display: 'none' },
    '& .label.Mui-focused': { marginTop: 50 },
    '& .css-1kbl4sy-MuiAutocomplete-root, & .MuiOutlinedInput-root, & .MuiAutocomplete-input': { paddingTop: '10.5px' }
};

const postos = [
    { id: 1, coordenadas: "-56.14447, -15.70616", nome: "Posto Platinão Cuiabá 2" },
    { id: 2, coordenadas: "-56.01883, -15.68913", nome: "POSTO ALDO CUIABÁ" },
    { id: 3, coordenadas: "-55.93356, -15.67743", nome: "POSTO ALDO MANGUEIRAS" },
    { id: 4, coordenadas: "-54.71438, -16.39895", nome: "Posto Ursão III" },
    { id: 5, coordenadas: "-54.62701, -16.50226", nome: "POSTO ALDO" },
    { id: 6, coordenadas: "-54.46689, -16.61138", nome: "Posto Locomotiva" },
    { id: 7, coordenadas: "-52.53286, -17.53137", nome: "Posto Decio Mineiros" },
    { id: 8, coordenadas: "-52.22963, -17.6649", nome: "Posto Mahle - 71 Jataí" },
    { id: 9, coordenadas: "-51.73805, -17.92017", nome: "POSTO ALDO JATAÍ INDUSTRIAL" },
    { id: 10, coordenadas: "-50.56279, -18.99765", nome: "São Roque - Posto Recanto" },
    { id: 11, coordenadas: "-49.50019, -18.96529", nome: "Posto Decio Ituiutaba" },
    { id: 12, coordenadas: "-48.41875, -18.89319", nome: "Posto Decio Parada Bonita" },
    { id: 13, coordenadas: "-48.13982, -18.89161", nome: "Posto Decio Olhos D'Água" },
    { id: 14, coordenadas: "-46.31439, -18.63247", nome: "Posto Parati Comércio e Transportes" },
    { id: 15, coordenadas: "-43.73948, -16.65852", nome: "Posto D'Angelis I" },
    { id: 16, coordenadas: "-42.34351, -16.19291", nome: "Posto Salinas" },
    { id: 17, coordenadas: "-42.26213, -16.13475", nome: "Posto Dom Pedro Salinas" },
    { id: 18, coordenadas: "-41.45763, -15.74352", nome: "Posto Faisão" },
    { id: 19, coordenadas: "-41.33973, -15.71759", nome: "Posto Dom Pedro Divisa Alegre 2" },
    { id: 20, coordenadas: "-41.01265, -15.08576", nome: "Posto Dom Pedro Vitoria da Conquista" },
    { id: 21, coordenadas: "-40.70699, -14.76598", nome: "Posto Dom Pedro São Jorge" },
    { id: 22, coordenadas: "-40.38077, -14.52754", nome: "Posto Reforço Poções" },
    { id: 23, coordenadas: "-40.09292, -13.63059", nome: "Posto Dom Pedro Jaguaquara" },
    { id: 24, coordenadas: "-40.05732, -13.51725", nome: "Posto Jaguar" },
    { id: 25, coordenadas: "-39.96105, -13.07262", nome: "Posto Shell LSL" },
    { id: 26, coordenadas: "-39.84687, -12.85352", nome: "Posto Portal da Bahia" },
    { id: 27, coordenadas: "-39.68549, -12.68827", nome: "Posto Reforço 4 - Itatim" },
    { id: 28, coordenadas: "-39.4711, -12.55981", nome: "Posto Macabuense IV" },
    { id: 29, coordenadas: "-39.11745, -12.37193", nome: "Posto São Gonçalo 2" },
    { id: 30, coordenadas: "-38.84546, -12.34016", nome: "Posto São Gonçalo 4" },
    { id: 31, coordenadas: "-38.33116, -12.70528", nome: "Posto Rio Camaçari - SÃO GONÇALO" },
    { id: 32, coordenadas: "-38.23363, -12.80865", nome: "Posto Via Atlântica - SÃO GONÇALO" },
    { id: 33, coordenadas: "-38.39028, -12.91133", nome: "Posto São Gonçalo 6" },
    { id: 34, coordenadas: "-38.49612, -12.99209", nome: "Posto São Jorge - SÃO GONÇALO" }
];

const mapContainerStyle = {
    width: '100%',
    height: '450px',
};

const center = {
    lat: -23.550520,
    lng: -46.633308,
};

export default function PrevisaoRoteiro() {
    const [postosSelecionados, setPostosSelecionados] = useState([]);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [directionsService, setDirectionsService] = useState(null);
    const [travelTime, setTravelTime] = useState(null);

    useEffect(() => {
        if (directionsService && postosSelecionados.length > 1) {
            const waypoints = postosSelecionados.slice(1, -1).map(posto => ({
                location: new google.maps.LatLng(
                    parseFloat(posto.coordenadas.split(", ")[1]),
                    parseFloat(posto.coordenadas.split(", ")[0])
                ),
                stopover: true
            }));

            directionsService.route({
                origin: new google.maps.LatLng(
                    parseFloat(postosSelecionados[0].coordenadas.split(", ")[1]),
                    parseFloat(postosSelecionados[0].coordenadas.split(", ")[0])
                ),
                destination: new google.maps.LatLng(
                    parseFloat(postosSelecionados[postosSelecionados.length - 1].coordenadas.split(", ")[1]),
                    parseFloat(postosSelecionados[postosSelecionados.length - 1].coordenadas.split(", ")[0])
                ),
                waypoints: waypoints,
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    setDirectionsResponse(result);
                    const duration = result.routes[0].legs.reduce((total, leg) => total + leg.duration.value, 0);
                    setTravelTime(Math.round(duration / 60));
                } else {
                    console.error(`Error fetching directions: ${status}`);
                    setDirectionsResponse(null);
                    setTravelTime(null);
                }
            });
        } else {
            setDirectionsResponse(null);
            setTravelTime(null);
        }
    }, [postosSelecionados, directionsService]);

    const handleAutocompleteChange = (event, newValue) => {
        if (newValue && newValue.id) {
            const isPostoSelecionado = postosSelecionados.some(posto => posto.id === newValue.id);
            if (!isPostoSelecionado) {
                setPostosSelecionados(prevPostos => [...prevPostos, newValue]);
            }
        }
    };

    const handleDelete = (postoToDelete) => {
        setPostosSelecionados(prevPostos => {
            const updatedPostos = prevPostos.filter(posto => posto.id !== postoToDelete.id);
            return updatedPostos;
        });
    };

    const generateGoogleMapsLink = () => {
        if (postosSelecionados.length < 2) return null;

        const origin = postosSelecionados[0].coordenadas.split(", ").reverse().join(",");
        const destination = postosSelecionados[postosSelecionados.length - 1].coordenadas.split(", ").reverse().join(",");

        const waypoints = postosSelecionados.slice(1, -1)
            .map(posto => posto.coordenadas.split(", ").reverse().join(","))
            .join("|");

        let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;

        if (waypoints) {
            url += `&waypoints=${waypoints}`;
        }

        return url;
    };

    return (
        <>
            <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
                <p>Selecione os postos no roteiro</p>
            </div>

            <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
                <div>
                    <Autocomplete
                        sx={{ ...defaultInputStyle, paddingX: 0, ...defaultInputsAutoComplete }}
                        options={postos}
                        getOptionLabel={(option) => option.nome || 'Nome do Posto'}
                        onChange={handleAutocompleteChange}
                        renderOption={(props, option) => (
                            <li {...props} key={option.id}>
                                {option.nome}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Pesquisar Postos"
                            />
                        )}
                    />
                </div>

                {/* Exibe os postos selecionados */}
                {postosSelecionados.length > 0 && (
                    <MainContainer>
                        <ul>
                            {postosSelecionados.map((posto) => (
                                <Chip
                                    label={posto.nome}
                                    key={posto.id}
                                    variant="outlined"
                                    onDelete={() => handleDelete(posto)}
                                />
                            ))}
                        </ul>
                    </MainContainer>
                )}
            </div>

            <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
                <LoadScript
                    googleMapsApiKey="AIzaSyA_nwha7vaP7PUTJfoxwAsVqJYiu-2rPlQ"
                    libraries={LIBRARIES}
                >
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={10}
                        options={{ gestureHandling: 'auto', draggable: true, scrollwheel: true }}
                        onLoad={(map) => setDirectionsService(new google.maps.DirectionsService())}
                    >
                        {postosSelecionados.map(posto => (
                            <Marker
                                key={posto.id}
                                position={{
                                    lat: parseFloat(posto.coordenadas.split(", ")[1]),
                                    lng: parseFloat(posto.coordenadas.split(", ")[0]),
                                }}
                                title={posto.nome}
                            />
                        ))}

                        {postosSelecionados.length > 1 && (
                            <DirectionsRenderer directions={directionsResponse} />
                        )}

                    </GoogleMap>

                    {postosSelecionados.length > 1 && (
                        <ShareButton href={generateGoogleMapsLink()} target="_blank" rel="noopener noreferrer">
                            <IoMapSharp size={20} color='#555555' />
                            <p>Abrir no maps</p>
                        </ShareButton>
                    )}

                    {travelTime !== null && (
                        <div>
                            <p>Tempo estimado de viagem: {travelTime} minutos</p>
                        </div>
                    )}
                </LoadScript>
            </div>
        </>
    );
}
