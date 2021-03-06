import React from 'react';
import { Rect } from 'react-konva';
import PropTypes from 'prop-types';
import store from '../../store';

class ColoredRect extends React.Component {
  componentDidMount() {
    this.rect.strokeScaleEnabled(false);
  }

  render() {
    const myScale = store.getState().shapes.scale;
    const {
      x, y, width, height, color, dragHandle, indexMy,
    } = this.props;
    return (
      <Rect
        ref={(node) => {
          this.rect = node;
        }}
        x={x * myScale}
        y={y * myScale}
        width={width * myScale}
        height={height * myScale}
        stroke={color}
        strokeWidth={4}
        onDragEnd={dragHandle}
        name={`Figure${indexMy}`}
        draggable
      />
    );
  }
}

ColoredRect.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default ColoredRect;
