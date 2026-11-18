import styled from "styled-components";
export const Grid = styled.section`display:grid;grid-template-columns:repeat(3,minmax(0,1fr));align-items:stretch;gap:22px;@media(max-width:1080px){grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}@media(max-width:620px){grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}@media(max-width:390px){grid-template-columns:1fr}`;
