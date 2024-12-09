import React from 'react';
import styled from 'styled-components';

const Button = ({ onClick }) => {
  return (
    <StyledWrapper>
      <button className="button" onClick={ onClick }>
        <span>
          <svg viewBox="0 0 24 24" height={16} width={16} xmlns="http://www.w3.org/2000/svg"><path d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z" /></svg>
        </span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    position: relative;
    border: none;
    background-color: white;
    color: #212121;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    gap: 5px;
    border-radius: 5px;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    overflow: hidden;
  }

  .button span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .button::before {
    content: "";
    position: absolute;
    background-color: #ff4037; /* Cor atualizada */
    width: 100%;
    height: 100%;
    left: 0%;
    bottom: 0%;
    transform: translate(-100%, 100%);
    border-radius: inherit;
  }

  .button svg {
    fill: #ff4037; /* Cor atualizada */
    transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
    width: 16px;
    height: 16px;
  }

  .button:hover::before {
    animation: shakeBack 0.6s forwards;
  }

  .button:hover svg {
    fill: white;
    scale: 1.2;
  }

  .button:active {
    box-shadow: none;
  }

  @keyframes shakeBack {
    0% {
      transform: translate(-100%, 100%);
    }

    50% {
      transform: translate(20%, -20%);
    }

    100% {
      transform: translate(0%, 0%);
    }
  }
`;

export default Button;
