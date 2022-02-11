import { Fragment } from 'react';
import './Error.css';
import noVoice1 from '../../Assets/no-voice1.png';
import noVoice2 from '../../Assets/no-voice2.png';

const Error = ({ error }) => {
  return (
    <div className="error-container">
      <img className="error-image" src={noVoice1}
        alt="microphone with horizontal strikethrough" />
      <h3 className="error-text">We're sorry, please try again.</h3>
      <h4 className="error-text">{error}</h4>
    </div>
  )
}

export default Error;