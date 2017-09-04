import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

require('moment/locale/pl');
moment.locale('pl');

const Card = ({ poll, deletePoll }) => {
  const { photoURL, title, key, created_At, numberOfVotes } = poll;

  const togglePopup = key => {
    document.querySelector(`.${key}`).classList.toggle('open');
  }

  return (
    <div className="card">
      <Link to={`/polls/${key}`}>
        <div className="card__photo">
          { photoURL && <img src={photoURL} alt={title} /> }
        </div>
      </Link>
      <div className="card__content">
        <div className="card__content__title">
          <Link to={`/polls/${key}`}>
            { title }
          </Link>  
        </div>
        <div className="card__content__info">
          <div>dodano { moment(created_At).fromNow() }</div>
          <div>{ numberOfVotes } głosów</div>
        </div>
        {
          deletePoll !== undefined 
          ? <div 
              className="card__content__delete" 
              onClick={() => togglePopup(key)}
            >
              <i className="fa fa-ellipsis-v"></i>
              <div 
                className={`card__content__delete__popup ${key}`}
                onClick={() => deletePoll(poll.key, poll.title)}
              >
                Usuń to głosowanie
              </div>
            </div>
          : <div></div>
        }
      </div>
    </div>
  );
};

export default Card;
