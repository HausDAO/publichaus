import React from 'react';
import styled from 'styled-components';
import hausBlockAnimated from '../assets/hausBlockAnimated.svg';

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20rem;
  margin-bottom: 2rem;
  .img-block {
    display: flex;
    height: 12rem;
    width: 12rem;
  }
  img {
    height: 12rem;
    width: 12rem;
  }
`;

export const HausAnimated = () => {
  return (
    <ImageContainer>
      <div className="img-block">
        <img src={hausBlockAnimated} />
      </div>
    </ImageContainer>
  );
};
