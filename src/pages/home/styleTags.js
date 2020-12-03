import styled from "styled-components";

export const Etiquetas = styled.div `

    @media print{
        
        @page {
            size: CARTA;
            margin-top: 2.12cm;
            margin-left: 0.4cm;
            margin-right: 0.4cm;
            background-color: #3636a7;
        }

        .ul-etiqueta {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-column-gap: 0.47cm;
            list-style: none;
            margin: 0;
            padding: 0;
            outline: 0;
            box-sizing: 0;
            justify-content: space-between;
            page-break-inside: avoid;
            background-color: #3636a7;
        }

        .ul-etiqueta li{
            page-break-inside: avoid;
        }

        .card{
            width: 10.16cm;
            margin: 0;
            padding: 4mm;
            outline: 0;
            box-sizing: 0;
            page-break-inside: avoid;
        }

        #page,
        #page * {
            visibility: visible;
        }

        #page {
            background-color: rgba(255, 255, 255, 0.788);
            margin: 0;
            padding: 0;
            box-shadow: none;
            position: absolute;
            left: 0;
            top: 0;
        }

        .options-container {
            display: none;
        }

        .search-container {
            display: none;
        }

        .filterLine-container{
            display:none;
        }

        .footer-container{
            display: none;
        }
    }
`;