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
              <form className="search">
                <input className="search-input" type="text"/>
                <input className="search-button" type="submit"/>
              </form>
              {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = App;
