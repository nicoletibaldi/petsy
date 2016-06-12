var React = require('react');
var Link = require('react-router').Link;

var PetIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return({size: ""});
  },

  showDetail: function (event) {
    var pet = event.currentTarget.value;
    this.context.router.push('/pets/'+ pet);
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
    return(
      <div value={this.props.pet.id} className="pet-index-item" onClick={this.showDetail}>
        <div className="pet-index-item-photo">
          <img className={this.state.size} onLoad={this.setRef} src={this.props.pet.image_url}/>
        </div>
        <p>Name: {this.props.pet.name}</p>
        <p>{this.props.pet.animal}</p>
        <p>Sex: {this.props.pet.sex}</p>
        <p>Age: {this.props.pet.age}</p>
      </div>
    );
  }
});

module.exports = PetIndexItem;
