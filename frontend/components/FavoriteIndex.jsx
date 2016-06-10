var React = require('react');
var FavoriteStore = require('./../stores/favorite_store');
var FavoriteApiUtil = require('./../util/favorite_api_util');
var PetIndexItem = require('./PetIndexItem');

var FavoriteIndex = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({
      favorites: FavoriteStore.all()
    });
  },

  componentDidMount: function () {
      FavoriteApiUtil.fetchAllFavorites();
      this.favoriteListener = FavoriteStore.addListener(this._onChange);
  },

  componentWillReceiveProps: function (newProps) {
      FavoriteApiUtil.fetchAllFavorites();
      this.favoriteListener = FavoriteStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.favoriteListener.remove();
  },

  _onChange: function () {
    this.setState({
      favorites: FavoriteStore.all()
    });
  },

  render: function () {
    if (!this.state.favorites) {
      return(<div></div>);
    }
    if (this.state.favorites.length < 1) {
      return (
        <div className="blank-page">
          <img src={nofavoritesUrl}/>
        </div>
      );
    } else {
      return(
        <ul className="pet-index">
          {this.state.favorites.map(function (pet) {
            return(
              <PetIndexItem key={pet.id} pet={pet}/>
            );
          })}
        </ul>
      );
    }

  }
});



module.exports = FavoriteIndex;
