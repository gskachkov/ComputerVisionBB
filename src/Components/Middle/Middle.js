import React, { Component } from 'react';
import Image from '../Image/Image';
import './Middle.css';
import DrawingField from '../DrawingField/DrawingField';
import EntitiesField from '../EntitiesField/EntitiesField';
import BoxesField from '../BoxesField/BoxesField';

class Middle extends Component {
  render() {
    return (
      <div className="midleMain">
        <EntitiesField />
        <div className="targetImg">
          <p>Image</p>
          <DrawingField />
          <Image />
        </div>
        <BoxesField />
      </div>
    );
  }
}

export default Middle;
