import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layer, Stage } from 'react-konva';
import Konva from 'konva';
import { addShape } from '../../actions/shapesActions';
import ColoredRect from '../ColoredRect/ColoredRect';
import './DrawingField.css';

class DrawingField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shapes: [],
      isDrawing: false,
      width: this.calculateWidth(),
      height: this.calculateHeight(),
    };
  }

  componentDidUpdate() {
    this.layer.batchDraw();
  }

  // componentDidMount = () => {
  //   window.addEventListener('resize', this.updateDimensions);
  // };

  // componentWillUnmount = () => {
  //   window.removeEventListener('resize', this.updateDimensions);
  // };

  // updateDimensions = () => {
  //   console.log('updating dimensions');
  //   this.setState({
  //     width: this.calculateWidth(),
  //     height: this.calculateHeight(),
  //   });
  // };

  calculateHeight = () => document.documentElement.clientHeight * 0.7;

  calculateWidth = () => document.documentElement.clientWidth * 0.555;

  handleClick = (e) => {
    const { isDrawing, shapes } = this.state;
    const { currEntity } = this.props;

    if (currEntity.index === -1) return;

    if (isDrawing) {
      this.props.addShape(shapes[shapes.length - 1], currEntity.label);
      this.setState({
        isDrawing: !isDrawing,
      });
      return;
    }

    const newShapes = shapes.slice();
    newShapes.push({
      x: e.evt.layerX,
      y: e.evt.layerY,
      width: 0,
      height: 0,
      color: currEntity.color,
    });

    this.setState({
      isDrawing: true,
      shapes: newShapes,
    });
  };

  handleMouseMove = (e) => {
    const { isDrawing, shapes } = this.state;
    const { currEntity } = this.props;

    if (currEntity.index === -1) return;

    const mouseX = e.evt.layerX;
    const mouseY = e.evt.layerY;

    if (isDrawing) {
      const currShapeIndex = shapes.length - 1;
      const currShape = shapes[currShapeIndex];
      const newWidth = mouseX - currShape.x;
      const newHeight = mouseY - currShape.y;

      const newShapesList = shapes.slice();
      newShapesList[currShapeIndex] = {
        x: currShape.x, // keep starting position the same
        y: currShape.y,
        width: newWidth, // new width and height
        height: newHeight,
        color: currShape.color,
      };

      this.setState({
        shapes: newShapesList,
      });
    }
  };

  render() {
    const { shapes, width, height } = this.state;
    return (
      <div>
        <Stage
          className="drawingField"
          width={width}
          height={height}
          onClick={this.handleClick}
          onContentMouseMove={this.handleMouseMove}
        >
          <Layer
            ref={(ref) => {
              this.layer = ref;
            }}
          >
            {shapes.map(shape => (
              <ColoredRect
                key={`${shape.color}${shape.x}${shape.y}`}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                color={shape.color}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    );
  }
}

DrawingField.propTypes = {
  currEntity: PropTypes.shape({
    index: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  currEntity: state.entities.currEntity,
});

export default connect(
  mapStateToProps,
  { addShape },
)(DrawingField);
