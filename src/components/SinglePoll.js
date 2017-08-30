import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSinglePoll } from '../actions';

class SinglePoll extends Component {
  componentDidMount() {
    const key = this.props.match.params.key;
    this.props.getSinglePoll(key);
  }

  render() {
    if (this.props.error) return <div>Sorry! There was an error loading the item.</div>;
    if (this.props.loading) return <div>Loading...</div>
    return (
      <div>
        There is a poll.
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { singlePoll, loadingSinglePoll, errorSinglePoll } = state;
  return {
    poll: singlePoll,
    loading: loadingSinglePoll,
    error: errorSinglePoll
  }
}

export default connect(mapStateToProps, { getSinglePoll })(SinglePoll);
