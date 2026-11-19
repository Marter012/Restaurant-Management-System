import styled from "styled-components";
export const Grid = styled.section`
  display:grid;grid-template-columns:repeat(5,minmax(0,1fr));align-items:stretch;gap:15px;
  @media(max-width:1120px){grid-template-columns:repeat(4,minmax(0,1fr));gap:13px}
  @media(max-width:850px){grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
  @media(max-width:560px){grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
`;
