import React from 'react';
import { ShareButtons } from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} = ShareButtons;

const FacebookIcon = require('../icons/facebook.svg');
const TwitterIcon = require('../icons/twitter.svg');
const WhatsappIcon = require('../icons/whatsapp.png');
const GooglePlusIcon = require('../icons/google-plus.svg');
const shareIcon = require('../icons/share.svg');

const shareButton = () => {
  const share = document.querySelector('.share');
  const icons = document.querySelectorAll('.social');
  share.classList.toggle('turn');
    icons.forEach(icon => {
      let { classList } = icon;
      if (classList.contains('hide-icon')) {
        classList.remove('hide-icon');
        classList.add('show-icon');
      } else if (classList.contains('show-icon')) {
        classList.remove('show-icon');
        classList.add('hide-icon');
      } else {
        classList.add('show-icon');
      }
    }); 
  }

const Share = ({ title }) => {
  return (
    <div className="share-buttons">
      <img src={shareIcon} alt="share" className="share" onClick={() => shareButton()}/>
      <FacebookShareButton quote={`Oddaj głos w moim głosowaniu! "${title}"`} url={document.URL}>
        <img src={FacebookIcon} alt="Facebook" className="social facebook"  />
      </FacebookShareButton>
      <TwitterShareButton title={`Oddaj głos w moim głosowaniu! "${title}"`} url={document.URL} hashtags={["VApp"]}>
        <img src={TwitterIcon} alt="Twitter" className="social twitter" />
      </TwitterShareButton>  
      <WhatsappShareButton title={`Oddaj głos w moim głosowaniu! "${title}"`} url={document.URL}>
        <img src={WhatsappIcon} alt="Whatsapp" className="social whatsapp" />
      </WhatsappShareButton> 
      <GooglePlusShareButton url={document.URL}>
        <img src={GooglePlusIcon} alt="GooglePlus" className="social google-plus" />
      </GooglePlusShareButton>
    </div>
  );
};

export default Share;
