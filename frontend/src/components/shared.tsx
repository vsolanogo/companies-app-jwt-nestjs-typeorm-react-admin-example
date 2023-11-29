import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";

export const EWrapper = styled.div`
  max-width: 100em;
  display: grid;
  grid-row-gap: 0.5em;
  margin: 0 auto;
`;

export const SharedModalBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
  z-index: 1200;
  max-width: 100%;
  left: 0;
  top: 0;
`;

export const Heading = styled.h2`
  background: linear-gradient(to right, #21ceee, #0047ab);
  color: transparent;
  background-clip: text;
  font-size: 1.875rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  font-family: Arial, sans-serif;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: #3b82f6;
  color: #ffffff;

  :hover {
    background-color: #1d4ed8;
  }
`;

export const FormInputsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.5em;
`;

export const SharedButton = styled.button`
  padding: 0.5rem 1rem;
  font-weight: bold;
  font-size: 0.875rem;
  background-image: linear-gradient(to right, #22d3ee, #0d6efd);
  color: #ffffff;
  border-radius: 9999px;
  box-shadow: 0px 4px 6px rgba(50, 50, 93, 0.11),
    0px 1px 3px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.15s ease;
  border: 0;
  cursor: pointer;

  :hover {
    box-shadow: 0px 10px 20px rgba(50, 50, 93, 0.1),
      0px 6px 6px rgba(0, 0, 0, 0.08);
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(38, 139, 210, 0.5);

    &[data-isactive="true"] {
      box-shadow: 0px 4px 6px rgba(0, 128, 0, 0.11),
        0px 1px 3px rgba(0, 0, 0, 0.08);
    }
  }

  &[data-isactive="true"] {
    background-image: linear-gradient(to right, #00ff00, #00cc00);
  }
`;

export const SharedCard = styled.div`
  background-color: #f5f5f5;
  border-radius: 0.375rem;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  max-width: 400px;
  margin: 0 auto;
  font-weight: bold;
  border: 1px solid #d2d6dc;

  &[data-isloading="true"] {
    pointer-events: none;
    cursor: wait;
  }
`;

const borderErrorAnimation = keyframes`
  0% {
    border-color: #e53e3e;
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.5);
  }
  50% {
    border-color: transparent;
    box-shadow: none;
  }
  80% {
    border-color: #e53e3e;
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.5);
  }

  100% {
    border-color: transparent;
    box-shadow: none;
  }
`;

const styledRegisterComponent = css`
  position: relative;
  padding: 0.5rem;
  font-size: 0.875rem;
  color: #4b5563;
  background-color: #ffffff;
  border: 1px solid #d2d6dc;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  outline: none;
  font-weight: bold;
  :focus {
    border-color: #38b2ac;
    box-shadow: 0 0 0 3px rgba(56, 178, 172, 0.5);
  }
`;

export const SharedInput = styled.input`
  ${styledRegisterComponent};

  &[data-iserror="true"] {
    animation: ${borderErrorAnimation} 2s ease-out;

    :focus {
      border-color: #e53e3e;
      box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.5);
    }
  }

  &[data-disabled="true"] {
    cursor: not-allowed;
    color: #a0aec0;
  }

  ::placeholder {
    color: #a0aec0;
  }
`;

export const InputLabel = styled.label`
  position: absolute;
  background: #fff;
  filter: opacity(0);
  padding: 0 0.2em;
  font-family: Arial, sans-serif;
  top: 0;
  left: 0.5rem;
  transform: translateY(-40%);
  font-size: 0.75rem;
  color: #a0aec0;
  pointer-events: none;
  transition: all 0.2s linear;
  z-index: 10;
  font-weight: 500;

  &[data-display="true"] {
    filter: opacity(1);
  }
`;

export const SharedButtonLikeInput = styled.button`
  ${styledRegisterComponent};
  cursor: pointer;
  pointer-events: ${(props) => (props?.disabled ? "none" : "all")};
`;

export const EPhoneBlock = styled.div`
  display: grid;
  grid-template-columns: 60px max-content;
  grid-column-gap: 0.5em;
`;

export const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 0.7rem;
  margin: 0;
  display: none;
  font-family: Arial, sans-serif;
  &[data-iserror="true"] {
    display: block;
  }
`;

export const EFieldWrapper = styled.div`
  position: relative;
  display: grid;
`;

export const ECompaniesTable = styled.div`
  overflow-x: auto;
  margin: 20px;
  font-family: Arial, sans-serif;

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    font-size: 1rem;

    th,
    td {
      padding: 1em;
      border: 1px solid #ddd;
      text-align: left;
    }

    th {
      background: linear-gradient(to right, #3498db, #2980b9);
      color: white;

      &[data-isbutton="true"] {
        cursor: pointer;
        &:hover {
          background: linear-gradient(to right, #2980b9, #3498db);
        }
      }
    }

    tr {
      &[data-isbutton="true"] {
        cursor: pointer;
      }
    }

    tr:nth-child(even) {
      background-color: #ecf0f1;
    }

    tr:nth-child(odd) {
      background-color: #f9f9f9;
    }

    tr:hover {
      background-color: #8fb8eb;
    }
  }
`;

export const SharedDivider = styled.div`
  width: 100%;
  height: 5em;

  @media (max-width: 1300px) {
    height: 3.75em;
  }
  @media (max-width: 900px) {
    height: 2.5em;
  }

  &[data-count="2"] {
    height: 10em;
    @media (max-width: 1300px) {
      height: 7.5em;
    }
    @media (max-width: 900px) {
      height: 5em;
    }
  }

  &[data-count="3"] {
    height: 15em;
    @media (max-width: 1300px) {
      height: 11.25em;
    }
    @media (max-width: 900px) {
      height: 7.5em;
    }
  }

  &[data-count="4"] {
    height: 20em;
    @media (max-width: 1300px) {
      height: 15em;
    }
    @media (max-width: 900px) {
      height: 10em;
    }
  }

  &[data-count="5"] {
    height: 25em;
    @media (max-width: 1300px) {
      height: 18.75em;
    }
    @media (max-width: 900px) {
      height: 12.5em;
    }
  }
`;
