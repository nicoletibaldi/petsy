var React = require('react');
var Link = require('react-router').Link;

var PetIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return({size: ""});
  },

  showDetail: function () {
    this.context.router.push('/pets/'+ this.props.pet.id.$t);
  },

  setRef: function (e) {
    var image = e.currentTarget;
      if (image.width > image.height) {
         this.setState({size: "landscape"});
      } else {
        this.setState({size: "portrait"});
      }
  },

  render: function () {
    //onClick of div (make it a link?) do this.showDetail
    return(
      <div className="pet-index-item" onClick={this.showDetail}>
        <div className="pet-index-item-photo">
          <img className={this.state.size} onLoad={this.setRef} src={this.props.pet.media.photos.photo[3].$t}/>
        </div>
        <p>Name: {this.props.pet.name.$t}</p>
        <p>{this.props.pet.animal.$t}</p>
        <p>Sex: {this.props.pet.sex.$t}</p>
        <p>Age: {this.props.pet.age.$t}</p>
      </div>
    );
  }
});

module.exports = PetIndexItem;
