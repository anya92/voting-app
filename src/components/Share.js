import React from 'react';
import { ShareButtons } from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} = ShareButtons;

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
      <div className="share" onClick={() => shareButton()}>
        <i className="fa fa-share-alt"></i>
      </div>
      <FacebookShareButton quote={`Oddaj głos w moim głosowaniu! "${title}"`} url={document.URL}>
        <i className="social facebook fa fa-facebook"></i>
      </FacebookShareButton>
      <TwitterShareButton title={`Oddaj głos w moim głosowaniu! "${title}"`} url={document.URL} hashtags={["VApp"]}>
        <i className="social twitter fa fa-twitter"></i>
      </TwitterShareButton>  
      <WhatsappShareButton title={`Oddaj głos w moim głosowaniu! "${title}"`} url={document.URL}>
        <i className="social whatsapp fa fa-whatsapp"></i>
      </WhatsappShareButton> 
      <GooglePlusShareButton url={document.URL}>
        <i className="social google-plus fa fa-google-plus"></i>
      </GooglePlusShareButton>
    </div>
  );
};

export default Share;
