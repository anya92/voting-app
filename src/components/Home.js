import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPolls } from '../actions';

import Card from './Card';

class Home extends Component {
  
  componentDidMount() {
    this.props.getAllPolls();
  }

  render() {
    if (this.props.error) return <div className="not-found">Przepraszamy! Wystąpił bład.</div>;
    if (this.props.loading) return <div className="loading"></div>
    return (
      <div className="container">
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
  const { polls, loadingPolls, errorPolls } = state;
  return {
    polls,
    loading: loadingPolls,
    error: errorPolls
  }
}

export default connect(mapStateToProps, { getAllPolls })(Home);
