import styled from '@emotion/styled';

const StyledInput = styled.input`
  padding: .5rem 0.2rem;
  border: none;
  font-size: 1.2rem;
  border-bottom: 2px solid #dedede;

  &:focus,
  &:active {
    outline: none;
    border-bottom: 2px solid black;
    &::placeholder {
      color: transparent;
    }
  }

  &::placeholder {
    color: #BBBBBB;
    font-size: 1rem;
  }
`;

export {
  StyledInput as Input
}
