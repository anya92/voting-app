import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTopPolls } from '../actions';

class TopPolls extends Component {
  componentDidMount() {
    this.props.getTopPolls();
  }

  render() {
    if (this.props.error) return <div>Sorry! There was an error loading the items.</div>;
    if (this.props.loading) return <div>Loading...</div>;
    return (
      <div>
        <pre>{ JSON.stringify(this.props.polls, null, ' ') }</pre>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { topPolls, loadingTopPolls, errorTopPolls } = state;
  return {
    polls: topPolls,
    loading: loadingTopPolls,
    error: errorTopPolls
  }
}

export default connect(mapStateToProps, { getTopPolls })(TopPolls);
