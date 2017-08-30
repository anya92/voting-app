import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPolls } from '../actions';

class Home extends Component {
  
  componentDidMount() {
    if (!this.props.polls.length) {
      this.props.getAllPolls();
    }  
  }

  render() {
    if (this.props.error) return <div>Sorry! There was an error loading the items.</div>
    if (this.props.loading) return <div>Loading...</div>
    return (
      <div>
        <pre>{ JSON.stringify(this.props.polls, null, ' ') }</pre>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { polls, loadingPolls, errorPolls } = state;
  return {
    polls,
    loading: loadingPolls,
    error: errorPolls
  }
}

export default connect(mapStateToProps, { getAllPolls })(Home);
