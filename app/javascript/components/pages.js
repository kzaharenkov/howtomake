import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removePage } from '../actions/actions.js';
import { selectCurrentPage } from '../actions/actions.js';
import Page from './page.js';
import CurrentPage from './current_page.js';
import Preview from './SortablePages.js';

const Pages = ({ pages, index, onPageClick, onKeyDeleteDown }) => {
  let selectedPage = pages[index];
  let currentPage = null;
  if (selectedPage){
    currentPage = <CurrentPage title={selectedPage.title} position={selectedPage.position} blocks={selectedPage.blocks}/>
  }
  return (
  <div className="pages">
  <Preview pages={pages} />
  {currentPage}
  </div>
  )
};

Pages.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    position: PropTypes.number,
    blocks: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.object.isRequired,   
  }).isRequired).isRequired,  
  }).isRequired).isRequired,
  index: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired,
  onKeyDeleteDown: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    pages: state.getIn(["manual", "pages"]).toJS(),
    index: state.getIn(["manual", "current_page"]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPageClick: (id) => {
      dispatch(selectCurrentPage(id));
    },
    onKeyDeleteDown: (id) => {
      dispatch(removePage(id))
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Pages);
