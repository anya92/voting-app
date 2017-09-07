import React from 'react';

const About = () => {
  return (
    <div className="container about">
      <div className="title">O projekcie</div>
      <div className="about__text">
        Free Code Camp's Back End Project: <br/>
        <a href="https://www.freecodecamp.org/challenges/build-a-voting-app" target="_blank" rel="noopener noreferrer">https://www.freecodecamp.org/challenges/build-a-voting-app</a>
      </div>
      <div className="about__text">
        Git Repository: <br/>
        <a href="https://github.com/anya92/voting-app" target="_blank" rel="noopener noreferrer">https://github.com/anya92/voting-app</a>
      </div>
      <div className="about__text">Built with:</div>
      <div className="about__icons">
      <div>
        <img src="https://www.shareicon.net/download/2016/07/08/117367_logo.ico" alt="React"/>
        React
      </div>
      <div>
        <img src="https://seeklogo.com/images/R/redux-logo-9CA6836C12-seeklogo.com.png" alt="Redux"/>
        Redux
      </div>
      <div>
        <img src="https://seeklogo.com/images/F/firebase-logo-402F407EE0-seeklogo.com.png" alt="Firebase"/>
        Firebase
      </div>
      <div>
        <img src="http://www.chartjs.org/img/chartjs-logo.svg" alt="ChartJs"/>
        Chart.js
      </div>
      <div>
        <img src="http://sass-lang.com/assets/img/logos/logo-b6e1ef6e.svg" alt="Sass"/>
        Sass
      </div>
      <div>
        <img src="https://www.seeklogo.net/wp-content/uploads/2016/06/bootstrap-logo-vector-download.jpg" alt="Bootstrap"/>
        Bootstrap
      </div>
      </div>
    </div>
  );
};

export default About;
