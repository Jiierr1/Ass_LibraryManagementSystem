import React, { useState } from "react";
import styled from "styled-components";

const Input = (
  {
    width = "500px",
    icon = 'bi bi-lock',
    label = '',
    type = 'password',
    placeholder = 'Enter ...',
    error = '',
    value,
    onChange,
    name,
  }
) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <StyledWrapper>
      {label && <label className="label fs-5">{label}</label>}
      <div className="group" style={{ maxWidth: width }}>
        <i className={`${icon} icon`}></i>

        <input
          className="input"
          type={isPassword ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        />

        {
          isPassword && (
            <i
            className={`toggle bi ${show ? "bi-eye" : "bi-eye-slash"}`}
            onClick={() => setShow(!show)}
            ></i>
          )
        }
      </div>
      {error && <div className="error">{error}</div>}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .label {
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
    font-size: 14px;
    color: #212529;
  }

  .group {
    position: relative;
    width: 100%;
  }

  .input {
    width: 100%;
    height: 46px;
    padding-left: 42px;
    padding-right: 42px; /* IMPORTANT for eye icon */
    border-radius: 10px;
    border: 1px solid #dee2e6;
    background: #f8f9fa;
    outline: none;
    transition: 0.2s ease;
  }

  .input:focus {
    border-color: #0d6efd;
    background: #fff;
    box-shadow: 0 0 0 0.15rem rgba(13, 110, 253, 0.15);
  }

  .icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #6c757d;
    pointer-events: none;
    font-size: 1rem;
  }

  .toggle {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #6c757d;
    font-size: 1.1rem;
    transition: 0.2s;
  }

  .toggle:hover {
    color: #0d6efd;
  }

  .error {
    margin-top: 5px;
    font-size: 13px;
    color: #dc3545;
  }

  .input-error {
    border-color: #dc3545;
    background: #fff;
  }

  .input-error:focus {
    box-shadow: 0 0 0 0.15rem rgba(220, 53, 69, 0.15);
  }
`;

export default Input;