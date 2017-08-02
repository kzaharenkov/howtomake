import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextBlock from './blocks/text_block.js'
import ImageBlock from './blocks/image_block.js'
import VideoBlock from './blocks/video_block.js'
import ContentEditable from 'react-contenteditable';
import InlineEdit from 'react-edit-inline';
import { updateTitle, removeBlock } from '../actions/actions.js';

class CurrentPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(data){
    if (this.titleTimer) { clearTimeout(this.titleTimer) }
    this.setState({data: this.newTitle = data.title});
    this.titleTimer = setTimeout(() => { 
      this.props.sendUpdatedTitle(this.newTitle);
    }, 2000 );
  }

  render(){
    let pagesBlocks = this.props.blocks.map((block) => {  
      switch (block.type){
        case 'Text':
          return <TextBlock key={block.id} {...block} onKeyPress={() => this.props.onKeyDeleteDown(block.id)} />;
        case 'Image':
          return <ImageBlock key={block.id} {...block} onKeyPress={() => this.props.onKeyDeleteDown(block.id)} />;
        case 'Video':
          return <VideoBlock key={block.id} {...block} onKeyPress={() => this.props.onKeyDeleteDown(block.id)} />;
        default:
          return null;  
      };
    });
    if (!this.props.editMode) { 
      return (
        <div className="currentPage col-7" >
          <div className="page_header" >{this.props.title}</div>
          {pagesBlocks}
          <div className="page_footer">{this.props.position}</div>
        </div>
      );
    }
    return (
      <div className="currentPage col-7" >
        <InlineEdit className="page_header" activeClassName="header" paramName="title" text={this.props.title} change={this.handleChange}></InlineEdit>
        {pagesBlocks}
        <div className="page_footer">{this.props.position}</div>
      </div>
    );
  }
};

CurrentPage.propTypes = {
  title: PropTypes.string.isRequired,
  position: PropTypes.number,
  blocks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    page_id: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,   
  }).isRequired).isRequired,
};

const mapStateToProps = (state) => {
  return {
    editMode: state.getIn(["manual", "edit_mode"]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendUpdatedTitle: (title) => {
      dispatch(updateTitle(title));
    },
    onKeyDeleteDown: (id) => {
      dispatch(removeBlock(id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPage);
