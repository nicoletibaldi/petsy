var React = require('react');
var Link = require('react-router').Link;

var PetIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  showDetail: function () {
    // this.context.router.push(something to do with id);
  },

  render: function () {
    //onClick of div (make it a link?) do this.showDetail
    return(
      <div className="pet-index-item">
        <p>{this.props.pet.name.$t}</p>
        <p>{this.props.pet.animal.$t}</p>
        <p>{this.props.pet.sex.$t}</p>
        <p>{this.props.pet.age.$t}</p>
        <img src={this.props.pet.media.photos.photo[3].$t}/>
      </div>
    );
  }
});

module.exports = PetIndexItem;
