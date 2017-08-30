import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPolls } from '../actions';

class Home extends Component {
  
  componentDidMount() {
    this.props.getAllPolls();
  }

  render() {
    if (this.props.errorPolls) return <div>Sorry! There was an error loading the items.</div>
    if (this.props.loadingPolls) return <div>Loading...</div>
    return (
      <div>
        <pre>{ JSON.stringify(this.props.polls, null, ' ') }</pre>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { errorPolls, loadingPolls, polls } = state;
  return {
    errorPolls,
    loadingPolls,
    polls
  }
}

export default connect(mapStateToProps, { getAllPolls })(Home);
