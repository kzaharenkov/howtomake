import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Rnd from 'react-rnd';
import { resizeBlock } from '../actions/actions.js';
import { moveBlock } from '../actions/actions.js';

class ImageBlock extends React.Component{
  constructor(props) {
    super(props);
    this.onResize = this.onResize.bind(this);
    this.onMove = this.onMove.bind(this);
  }

  onMove(event: SyntheticMouseEvent, data: DraggableData) {
    this.props.onBlockMove(this.props.id, data.x, data.y);
  }
  
  onResize(event: MouseEvent, data: Direction, refToElement: HTMLElement, delta: NumberSize,) {
    console.log(data)
    console.log(delta)
    console.log(refToElement)
    this.props.onBlockResize(this.props.id, data, delta.width, delta.height);
  }

  render(){
    return (
      <Rnd
        default={{
          x: this.props.data.x,
          y: this.props.data.y,
          width: this.props.data.width,
          height: this.props.data.height,
        }}
        minWidth={50}
        minHeight={50}
        bounds="parent"
        lockAspectRatio="true"
        onResizeStop={this.onResize}
        onDragStop={this.onMove}
      >  
        <div className="image_block" >
          <img src={this.props.data.content} />
        </div>
      </Rnd>
    )
  }
};

ImageBlock.propTypes = {
  data: PropTypes.object.isRequired,
  onBlockMove: PropTypes.func.isRequired,
  onBlockResize: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBlockResize: (id, direction, w, h) => {
      dispatch(resizeBlock(id, direction, w, h));
    },
    onBlockMove: (id, x, y) => {
      dispatch(moveBlock(id, x, y));
    },
  };
};

export default connect(undefined, mapDispatchToProps)(ImageBlock);
