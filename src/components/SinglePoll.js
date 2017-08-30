import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getSinglePoll } from '../actions';
import { updatePoll } from '../helpers/polls';

import Vote from './Vote';

require('moment/locale/pl');
moment.locale('pl');

class SinglePoll extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      alreadyVoted: false,
      isAuthor: false
    };
  }
  componentDidMount() {
    const key = this.props.pollKey;
    this.props.getSinglePoll(key);
  }

  componentWillReceiveProps(nextProps) {
    const key = this.props.pollKey;

    if (this.props.pollKey !== nextProps.pollKey) {
      this.props.getSinglePoll(nextProps.pollKey);
    }

    // check if user is this poll's author
    const checkIfIsAuthor = (nextProps.user && nextProps.poll) && nextProps.user.uid === nextProps.poll.author.uid; 
    this.setState({ isAuthor: Boolean(checkIfIsAuthor) });
    
    // check if user has already voted
    // voted polls keys in localStorage
    const votedPolls = JSON.parse(localStorage.getItem('votedPolls')) || [];
    if (votedPolls.includes(key)) {
      this.setState({
        alreadyVoted: true
      });
    } 
    if (nextProps.user && nextProps.poll) {
      let voters = nextProps.poll.voters || [];
      this.setState({ alreadyVoted: voters.includes(nextProps.user.uid) });
    }
  }

  vote = (e, answer) => {
    e.preventDefault();

    let count = this.props.poll.answers[answer] + 1 || 1;
    let { answers, key, numberOfVotes } = this.props.poll;
    let voters = this.props.poll.voters || [];
    numberOfVotes++;
    answers = {
      ...answers,
      [answer]: count
    };
    if (this.props.user) {
      voters.push(this.props.user.uid);
      this.setState({ alreadyVoted: true });
    } else {
      let votedPolls = JSON.parse(localStorage.getItem('votedPolls')) || [];
      let votedPollsCopy =  [...votedPolls, key];
      localStorage.setItem('votedPolls', JSON.stringify(votedPollsCopy));
      this.setState({ alreadyVoted: true });
    }

    updatePoll(key, answers, numberOfVotes, voters);
  }

  render() {
    if (this.props.error) return <div>Sorry! There was an error loading the item.</div>;
    // if (this.props.loading) return <div>Loading...</div>;
    const { poll } = this.props;
    return !poll ? <div>Loading...</div> : (
      <div>
        <div>
          <h1>{ poll.title }</h1>
        </div>
        <div>
          { poll.photoURL && <img src={poll.photoURL} alt={poll.title} /> }
        </div>
        <div>
          <div>{ poll.author.displayName || poll.author.email }</div>
          <div>{/* poll.author && <img src={poll.author.photoURL} alt={poll.author.displayName || poll.author.email} /> */}</div>
        </div>
        <div>{moment(poll.created_At).format('DD MMMM YYYY')}</div>
        <div>{poll.numberOfVotes} oddanych głosów</div>
        <div>
          {
            !this.state.alreadyVoted
            ? <Vote poll={poll} user={this.props.user} vote={this.vote} />
            : <div>chart</div>
          }
        </div>
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
