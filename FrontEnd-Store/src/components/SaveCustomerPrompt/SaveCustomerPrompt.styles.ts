import styled from "styled-components";

export const Shade = styled.div`
  position: fixed; inset: 0; z-index: 145; display: grid; place-items: center;
  padding: 16px; background: #14201999; backdrop-filter: blur(4px);
`;
export const Card = styled.section`
  position: relative; width: min(100%, 390px); padding: 26px; border-radius: 22px;
  background: #fffefa; text-align: center; box-shadow: 0 25px 70px #0003; color: #26352d;
  h3 { margin: 12px 0 8px; }
  p { font-size: .88rem; line-height: 1.5; color: #727b73; }
  .actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 18px; }
  button { min-height: 44px; border-radius: 12px; font-weight: 800; border: 1px solid #deded5; background: white; color: #39443b; }
  .yes { background: #263f34; color: white; border-color: #263f34; }
  .close { position: absolute; top: 12px; right: 12px; display: grid; place-items: center; width: 34px; height: 34px; border: 0; background: transparent; }
`;
