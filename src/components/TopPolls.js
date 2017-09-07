import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTopPolls } from '../actions';

import Card from './Card';

class TopPolls extends Component {
  componentDidMount() {
    this.props.getTopPolls();
  }

  render() {
    if (this.props.error) return <div>Sorry! There was an error loading the items.</div>;
    if (this.props.loading) return <div className="loading"></div>;
    return (
      <div className="container">
        <h1 className="title">
          10 najpopularniejszych głosowań
        </h1>
        {
          this.props.polls.map(poll => {
            return (
              <Card 
                key={poll.key}
                poll={poll}
              />
            )
          })
        }
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
