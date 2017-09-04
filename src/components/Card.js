import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

require('moment/locale/pl');
moment.locale('pl');

const Card = ({ poll }) => {
  const { photoURL, title, key, created_At, numberOfVotes } = poll;
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
          <div className="card__content__info__date">
            dodano { moment(created_At).fromNow() }
          </div>
          <div className="card__content__info__votes">
            { numberOfVotes } oddanych głosów
          </div>

        </div>

      </div>
    </div>
  );
};

export default Card;
