import styled from "styled-components";

export default MenuMobile = styled.div`
    display: flex;
    flex-flow: column nowrap;
    background-color: #22384F;
    width: 120px;
    align-self: flex-end;

    transition: transform ls;
    transform: translateX( ${props => props.menuMbView ? ("0%") : ("calc(100% + 15px)")});
`;