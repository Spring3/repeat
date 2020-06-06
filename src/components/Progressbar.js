import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ProgressWrapper = styled.div`
  width: 100%;
  height: ${props => props.height}px;
`;

const Bar = styled.div`
  transition: width ease-in .5s;
  background: ${props => props.color};
  width: ${props => props.percent}%;
  height: 100%;
`;

const Progressbar = memo(({ className, percent, color, thickness }) => {
  return (
    <ProgressWrapper className={className} height={thickness}>
      <Bar percent={percent} color={color} />
    </ProgressWrapper>
  )
})

Progressbar.propTypes = {
  className: PropTypes.string,
  percent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  thickness: PropTypes.number
}

Progressbar.defaultProps = {
  className: '',
  percent: 0,
  color: 'lightgreen',
  thickness: 2
}

export {
  Progressbar
}
