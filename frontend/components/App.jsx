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
                <input className="search" type="text"/>
                <input className="search" type="submit"/>
              {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = App;
