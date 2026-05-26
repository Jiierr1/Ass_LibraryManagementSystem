import React from 'react';
import styled from 'styled-components';

const Button = ({
  width = "500px",
  color = 'custom-btn',
  name = 'button',
  onClick
}) => {
  return (
    <StyledWrapper>
      <div style={{ width: width }}>
        <button className={`btn ${color} w-100`} onClick={onClick}>
          {name}
        </button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
.custom-btn {
  background: radial-gradient(100% 100% at 100% 0%, #5bd7fa 0%, #5468FF 100%);
  color: white;
  border: 0;
  padding: 0.6rem 1.5rem;
  border-radius: 0.3rem;
  font-size: 18px;
  transition: 0.15s ease;
  box-shadow: 0px 0.3em 0.7em rgba(45, 35, 66, 0.3);
}

.custom-btn:hover {
  transform: translateY(-2px);
}

.custom-btn:active {
  transform: translateY(0);
}`;

export default Button;
