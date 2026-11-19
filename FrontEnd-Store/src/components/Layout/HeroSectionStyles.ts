import styled, { css } from "styled-components";

type StepTone = "orange" | "yellow" | "pink" | "green";

export const Hero = styled.section<{ $image?: string | null }>`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  width: calc(100% - 48px);
  width: 100%;
  height: 100%;
  padding: clamp(28px, 4.2vw, 58px);
  border: 1px solid #f0dfcf;
  border-radius: 30px;
  color: #2d211b;
  background: ${({ $image }) =>
    $image
      ? `linear-gradient(105deg, rgba(255,248,239,.97) 0%, rgba(255,248,239,.94) 46%, rgba(255,248,239,.72) 100%), url("${$image}") center/cover`
      : "radial-gradient(circle at 88% 10%, #ffe0bd 0, transparent 27%), radial-gradient(circle at 8% 100%, #ffe6dc 0, transparent 30%), linear-gradient(125deg, #fffaf3 0%, #fff3e7 54%, #fff8ee 100%)"};
  box-shadow: 0 24px 70px rgba(89, 54, 30, .10);

  @media (max-width: 760px) {
    width: calc(100% - 24px);
    min-height: 0;
    margin: 12px auto 32px;
    padding: 22px 17px;
    border-radius: 23px;
  }
`;

export const HeroBackdrop = styled.div`
  position: absolute;
  z-index: -1;
  inset: 0;
  overflow: hidden;
  pointer-events: none;

  span {
    position: absolute;
    display: block;
    border-radius: 50%;
    filter: blur(1px);
  }

  span:nth-child(1) {
    top: -120px;
    right: 27%;
    width: 250px;
    height: 250px;
    background: rgba(255, 180, 119, .14);
  }
  span:nth-child(2) {
    right: -80px;
    bottom: -145px;
    width: 360px;
    height: 360px;
    border: 1px solid rgba(231, 119, 72, .17);
    box-shadow: 0 0 0 28px rgba(231, 119, 72, .035), 0 0 0 58px rgba(231, 119, 72, .025);
  }
  span:nth-child(3) {
    right: 46%;
    bottom: 35px;
    width: 12px;
    height: 12px;
    background: #f2b66d;
    box-shadow: 22px -14px 0 #f6d4a7, 42px 5px 0 #efb4a0;
  }
`;

export const HeroLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(330px, .78fr);
  align-items: center;
  gap: clamp(28px, 5vw, 76px);
  max-width: 1320px;
  margin: 0 auto;

  @media (max-width: 980px) {
    grid-template-columns: minmax(0, 1fr) minmax(280px, .8fr);
    gap: 26px;
  }
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 27px;
  }
`;

export const HeroMain = styled.div`
  min-width: 0;
`;

export const StoreStatusBadge = styled.div<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 11px;
  max-width: 100%;
  margin-bottom: 29px;
  padding: 11px 15px;
  border: 1px solid ${({ $open }) => ($open ? "#b7dfc2" : "#f0c99d")};
  border-radius: 15px;
  background: ${({ $open }) => ($open ? "#effaf1" : "#fff5e8")};
  color: ${({ $open }) => ($open ? "#176b3a" : "#965319")};
  box-shadow: 0 8px 22px rgba(83, 54, 29, .055);

  .status-indicator {
    flex: 0 0 auto;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: ${({ $open }) => ($open ? "#22a653" : "#e69a37")};
    box-shadow: 0 0 0 5px ${({ $open }) => ($open ? "#22a6531c" : "#e69a371c")};
  }
  .status-copy { display: grid; gap: 2px; }
  .status-copy strong { font-size: .88rem; font-weight: 900; line-height: 1.2; }
  .status-copy small { color: #78675a; font-size: .69rem; line-height: 1.35; }
  .status-check { margin-left: 4px; font-size: 1.12rem; }

  @media (max-width: 520px) {
    margin-bottom: 22px;
    padding: 10px 12px;
    .status-copy strong { font-size: .78rem; }
    .status-copy small { font-size: .64rem; }
  }
`;

export const HeroEyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  color: #b65a2e;
  font-size: .72rem;
  font-weight: 900;
  letter-spacing: .12em;
  line-height: 1.4;
  text-transform: uppercase;

  .eyebrow-line { width: 27px; height: 2px; border-radius: 2px; background: #ed8a4d; }
`;

export const HeroTitle = styled.h1`
  max-width: 720px;
  margin: 0;
  color: #30221b;
  font-size: clamp(2.45rem, 5vw, 4.55rem);
  font-weight: 950;
  letter-spacing: -.065em;
  line-height: .99;
  text-wrap: balance;

  @media (max-width: 520px) { font-size: clamp(2.25rem, 11vw, 3.35rem); }
`;

export const HeroDescription = styled.p`
  max-width: 590px;
  margin: 19px 0 0;
  color: #766357;
  font-size: clamp(.96rem, 1.25vw, 1.08rem);
  font-weight: 500;
  line-height: 1.72;
`;

export const HeroActions = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 27px;

  @media (max-width: 520px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;

const actionBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
  min-height: 54px;
  padding: 0 22px;
  border: 0;
  border-radius: 14px;
  font-family: inherit;
  font-size: .88rem;
  font-weight: 900;
  text-decoration: none;
  cursor: pointer;
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease;

  svg { font-size: 1.22rem; }
  &:hover { transform: translateY(-2px); }
  &:focus-visible { outline: 3px solid #2d211b; outline-offset: 3px; }
  @media (max-width: 520px) { width: 100%; }
`;

export const PrimaryAction = styled.button`
  ${actionBase}
  background: linear-gradient(135deg, #f28a42, #e65d38);
  color: #fff;
  box-shadow: 0 10px 22px rgba(225, 91, 49, .24);

  &:hover { background: linear-gradient(135deg, #f59a56, #e96c48); box-shadow: 0 13px 26px rgba(225, 91, 49, .29); }
`;

export const WhatsAppAction = styled.a<{ $disabled?: boolean }>`
  ${actionBase}
  border: 1px solid ${({ $disabled }) => ($disabled ? "#ddd2c8" : "#b9ddc3")};
  background: ${({ $disabled }) => ($disabled ? "#f3eee9" : "#eff9f1")};
  color: ${({ $disabled }) => ($disabled ? "#9a8b80" : "#187342")};
  box-shadow: ${({ $disabled }) => ($disabled ? "none" : "0 8px 18px rgba(34, 126, 72, .08)")};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};

  svg { font-size: 1.35rem; }
  &:hover { background: ${({ $disabled }) => ($disabled ? "#f3eee9" : "#e4f5e8")}; }
`;

export const HeroTrustLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 19px;
  margin-top: 25px;
  color: #806e61;
  font-size: .73rem;
  font-weight: 750;

  span { display: inline-flex; align-items: center; gap: 6px; }
  svg { color: #d87942; font-size: .98rem; }
`;

export const HowToCard = styled.aside`
  position: relative;
  padding: clamp(22px, 2.8vw, 34px);
  border: 1px solid rgba(255, 255, 255, .9);
  border-radius: 25px;
  background: rgba(255, 255, 255, .83);
  box-shadow: 0 20px 48px rgba(103, 65, 37, .12), inset 0 1px 0 #fff;
  backdrop-filter: blur(14px);

  &::before {
    content: "";
    position: absolute;
    top: -8px;
    right: 28px;
    width: 52px;
    height: 16px;
    border-radius: 999px;
    background: #f4b35e;
    transform: rotate(8deg);
  }
`;

export const HowToHeader = styled.div`
  margin-bottom: 21px;

  .howto-kicker {
    display: inline-block;
    margin-bottom: 9px;
    color: #c66b3c;
    font-size: .65rem;
    font-weight: 950;
    letter-spacing: .16em;
  }
  h2 {
    margin: 0;
    color: #33251e;
    font-size: clamp(1.25rem, 2vw, 1.65rem);
    font-weight: 950;
    letter-spacing: -.045em;
  }
  p { margin: 6px 0 0; color: #8b796c; font-size: .8rem; }
`;

export const StepsList = styled.div`
  display: grid;
  gap: 13px;
`;

export const Step = styled.div`
  display: grid;
  grid-template-columns: 25px 43px minmax(0, 1fr);
  align-items: center;
  gap: 11px;
  min-width: 0;
  padding: 10px 11px;
  border: 1px solid #f1e8df;
  border-radius: 15px;
  background: #fffdfb;
  transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;

  &:hover { transform: translateX(3px); border-color: #f0c9a9; box-shadow: 0 7px 16px rgba(87, 55, 34, .055); }
`;

export const StepIndex = styled.span`
  color: #c3a28a;
  font-size: .68rem;
  font-weight: 950;
  letter-spacing: .04em;
`;

export const StepIcon = styled.span<{ $tone: StepTone }>`
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 13px;
  font-size: 1.35rem;
  ${({ $tone }) => {
    const tones: Record<StepTone, { bg: string; color: string }> = {
      orange: { bg: "#fff0e4", color: "#d86b31" },
      yellow: { bg: "#fff6d9", color: "#b78320" },
      pink: { bg: "#ffedf0", color: "#c45b78" },
      green: { bg: "#eaf6ed", color: "#398252" },
    };
    return css`background: ${tones[$tone].bg}; color: ${tones[$tone].color};`;
  }}
`;

export const StepText = styled.div`
  display: grid;
  gap: 3px;
  min-width: 0;

  strong { color: #403027; font-size: .82rem; font-weight: 900; }
  span { color: #8b7a6f; font-size: .7rem; line-height: 1.4; }
`;

export const CardFootnote = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  padding-top: 15px;
  border-top: 1px dashed #eaded3;
  color: #7d6b5e;
  font-size: .72rem;
  font-weight: 750;

  svg { color: #239653; font-size: 1.1rem; }
`;
