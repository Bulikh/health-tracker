import React from "react";
import styled from "styled-components";

const Footers = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  background: #1976d2;
  color: #fff;
  /* position: fixed;
  bottom: 0;
  left: 0;
  width: 100%; */
  box-shadow: 0px -5px 5px -4px rgba(0, 0, 0, 0.75);
  h2 {
    font-size: 16px;
  }
`;

const Footer = () => {
  return (
    <Footers>
      <h2>Designed By Buli</h2>
    </Footers>
  );
};

export default Footer;
