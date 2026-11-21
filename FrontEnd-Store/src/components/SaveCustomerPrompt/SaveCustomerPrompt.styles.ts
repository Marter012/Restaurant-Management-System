import styled from "styled-components";

export const Shade = styled.div`
  position: fixed;
  inset: 0;
  z-index: 145;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(25, 28, 23, .62);
  backdrop-filter: blur(7px);
`;

export const Card = styled.section`
  position: relative;
  width: min(100%, 430px);
  padding: 34px 30px 28px;
  border: 1px solid rgba(183, 131, 78, .24);
  border-radius: 24px;
  background: linear-gradient(155deg, #fffdf8 0%, #f7eddd 100%);
  text-align: center;
  box-shadow: 0 28px 80px rgba(25, 20, 14, .28);
  color: #4a2818;

  > svg {
    display: block;
    margin: 0 auto 14px;
    color: #a66b37;
  }

  h3 { margin: 0 28px 10px; font-size: 1.35rem; line-height: 1.2; }
  p { margin: 0; font-size: .94rem; line-height: 1.65; color: #756354; }

  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 11px;
    margin-top: 25px;
  }

  button {
    min-height: 48px;
    padding: 10px 14px;
    border: 1px solid #ddcdb9;
    border-radius: 13px;
    background: rgba(255,255,255,.78);
    color: #604735;
    font: inherit;
    font-size: .88rem;
    font-weight: 800;
    cursor: pointer;
    transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
  }

  button:hover { transform: translateY(-1px); box-shadow: 0 7px 18px rgba(74,40,24,.12); }
  button:disabled { opacity: .6; cursor: wait; transform: none; }
  .yes { background: #4a2818; color: #fff8ef; border-color: #4a2818; }
  .close {
    position: absolute; top: 12px; right: 12px;
    display: grid; place-items: center; width: 36px; height: 36px;
    padding: 0; border: 0; border-radius: 50%; background: transparent;
    color: #806b59;
  }

  @media (max-width: 420px) {
    padding: 30px 20px 22px;
    .actions { grid-template-columns: 1fr; }
  }
`;
