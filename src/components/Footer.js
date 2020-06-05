import React from 'react';
import styled from '@emotion/styled';


const StyledFooter = styled.footer`
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  align-self: flex-end;
`;

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <StyledFooter>
      <p>Copyrights {year} - <a target="_blank" rel="noreferrer noopener" href="https://www.dvasylenko.com">Daniyil Vasylenko</a></p>
    </StyledFooter>
  )
};

export {
  Footer
};
