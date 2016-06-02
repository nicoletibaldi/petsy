var React = require('react');
var NavBar = require('./NavBar');
var PetIndexItem = require('./PetIndexItem');
var PetStore = require('./../stores/pet_store');

var App = React.createClass({

  render: function () {
    return (
        <div class="outer">
        <NavBar />
          <div class="inner">
              <img src={ursaUrl} className="scaling-image"/>
              <p className="search">Whoever you are, find your best friend</p>
              <form className="search">
                <input className="search-input" type="text"/>
                <input className="search-button" value="Search" type="submit"/>
              </form>
              {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = App;
