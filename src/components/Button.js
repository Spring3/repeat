import styled from '@emotion/styled';
import { css } from '@emotion/core';

const Button = styled.button`
  ${props => {
    let background = 'white';
    let color = 'inherit';
    if (props.success) {
      background = 'lightgreen';
    }
    return css`
      background: ${background};
      color: ${color};
    `
  }}
  padding: .5rem 1rem;
  border-radius: 3px;
  border: 1px solid #AAAAAA;

  &:hover {
    background: #EFEFEF
  }
`;

export {
  Button
}
