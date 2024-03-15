import styled from 'styled-components';
import bannerimg from '../../assets/img/banner-bg2.png';
import imgperfil from '../../assets/img/profile-side.png';

export const MainUser = styled.div`
    width: 100%;
    height: 150px;
    background-color: blue;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-image: url(${bannerimg});
    background-size: cover;

    & > div {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background-color: #999999;
        margin-top: 150px;
        background-image: url(${imgperfil});
        background-size: cover;
    }
`

export const InfosUser = styled.div`
    width: 100%;
    height: auto;
    margin-top: 70px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
`