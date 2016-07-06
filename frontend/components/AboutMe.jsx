var React = require('react');
var Link = require('react-router').Link;


var AboutMe = React.createClass({
  handleModalClick: function () {
      this.props.close();
  },

  stopProp: function (e) {
    e.stopPropagation();
  },

  render: function () {
    return (
      <div className="modal" onClick={this.handleModalClick}>
      <div className="login-form about-me"
        onClick={this.stopProp}
        >
        <img src={photoUrl} className="about-me-img"/><br/><br/>
        <p>Hi! My name is Nicole, and I am a software developer in New York.</p><br/>
        <p>As an animal lover, I have always wanted to build a pet-focused project.
        I decided to use the popular website Etsy as inspiration for this single-page app for adoptable pets.
        I utilized the Petfinder API to populate Petsy with real adoptable pets in Manhattan, and stored images
        on AWS to allow for scalability. Petsy is a RESTful API built on a Rails backend, along with React on
        the front end to provide seamless rendering of the site’s components.</p><br/>
        <p>If you would like to see more of my work, view my resume, or would like my contact information, please visit my <a href="http://www.nicole-tibaldi.me" className="about-me-link">portfolio site</a>.</p>
      </div>
      </div>
    );
  }
});

module.exports = AboutMe;
