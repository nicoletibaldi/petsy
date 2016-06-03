var React = require('react');
var NavBar = require('./NavBar');
var PetIndex = require('./PetIndex');
var PetStore = require('./../stores/pet_store');

var App = React.createClass({

  render: function () {
    return (
      <div>
        <div>
          <img src={ursaUrl} className="scaling-image"/>
          <form className="search">
            <input className="search-input" type="text"/>
            <input className="search-button" value="Search" type="submit"/>
          </form>
          <PetIndex />
        </div>
      </div>
    );
  }
});

module.exports = App;
