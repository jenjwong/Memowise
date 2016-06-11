import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="container">
        <h1 className="center-align">Scoreboard</h1>
        <ul className="collection score-collection">
          <li className="collection-item avatar">
            <img className="user-icon" src="https://cdn0.iconfinder.com/data/icons/avatars-8/128/avatar-12-3-128.png"/>
            <p className="user-stats">1. Cathy<br/>
              Score: 5,000,000
            </p>
          </li>
          <li className="collection-item avatar">
            <img className="user-icon" src="https://cdn0.iconfinder.com/data/icons/avatars-8/128/avatar-33-2-128.png"/>
            <p className="user-stats">2. Jen<br/>
              Score: 3,000,000
            </p>
          </li>
          <li className="collection-item avatar">
            <img className="user-icon" src="https://cdn0.iconfinder.com/data/icons/avatars-8/128/avatar-52-2-128.png"/>
            <p className="user-stats">3. Ash<br/> 
                Score: 1,000,000
            </p>
          </li>
          <li className="collection-item avatar">
            <img className="user-icon" src="https://cdn0.iconfinder.com/data/icons/avatars-8/128/avatar-01-2-128.png"/>
            <p className="user-stats">4. David<br/>
              Score: 0
            </p>
          </li>
        </ul>
      </div>
    );
  }
}

export default Scoreboard;