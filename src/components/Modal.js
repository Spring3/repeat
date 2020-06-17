import React from "react"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
import CloseIcon from "mdi-react/CloseIcon"

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  z-index: 1;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  min-height: 300px;
  overflow-y: scroll;
  top: 0;
  left: 0;
`

const ModalContent = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 3px;
  padding: 2rem;
`

const ModalHeader = styled.header`
  width: 100%;
  box-sizing: border-box;
  min-height: 2rem;
  display: flex;
  position: relative;

  & > svg:first-of-type {
    align-self: flex-end;
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    &:hover {
      fill: black;
    }
  }
`

const ModalBody = styled.div`
  flex-grow: 1;
  margin-top: 1rem;
`

const Modal = ({ children, header, detached, onClose }) => {
  return (
    <ModalContainer detached={detached}>
      <ModalContent>
        <ModalHeader>
          {header ? <h2>{header}</h2> : null}
          <CloseIcon size={30} color="#999999" onClick={onClose} />
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalContainer>
  )
}

Modal.propTypes = {
  header: PropTypes.string,
  detached: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
}

Modal.defaultProps = {
  detached: false,
}

export { Modal }
