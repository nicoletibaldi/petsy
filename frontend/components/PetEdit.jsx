var React = require('react');
var PetApiUtil = require('./../util/pet_api_util');
var SessionStore = require('./../stores/session_store');
var ErrorStore = require('./../stores/error_store');
var ErrorActions = require('./../actions/error_actions');
var PetStore = require('./../stores/pet_store');

var PetEdit = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount: function () {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
  },

  componentWillUnmount: function () {
    this.errorListener.remove();
  },

  getInitialState: function () {
    var potentialPet = PetStore.find(this.props.id);
    var pet = potentialPet ? potentialPet : {};
    return ({user_id: pet.user_id, name: pet.name, animal: pet.animal,
      age: pet.age, breed: pet.breed, contact_email: pet.contact_email,
      description: pet.description, sex: pet.sex, imageFile: null,
      imageUrl: null});
  },

  nameChange: function (event) {
    var newName = event.target.value;
    this.setState({name: newName});
  },

  animalChange: function (event) {
    var newAnimal = event.target.value;
    this.setState({animal: newAnimal});
  },

  ageChange: function (event) {
    var newAge = event.target.value;
    this.setState({age: newAge});
  },

  breedChange: function (event) {
    var newBreed = event.target.value;
    this.setState({breed: newBreed});
  },

  descriptionChange: function (event) {
    var newDesc = event.target.value;
    this.setState({description: newDesc});
  },

  sexChange: function (event) {
    var newSex = event.target.value;
    this.setState({sex: newSex});
  },

  updateFile: function (e) {
    var file = e.currentTarget.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = function () {
      this.setState({imageFile: file, imageUrl: fileReader.result});
    }.bind(this);

    if (file) {
      fileReader.readAsDataURL(file);
    }
  },

  fieldErrors: function (field) {
    var errors = ErrorStore.formErrors("update");
    var array = [1, 2, 3, 4, 5, 6];
    var messages;
    if (!errors[field]) {
      messages = array.map(function (i) {
        return <li className="errors" key={i}/>;
      });
    } else {
      messages = errors[field].map(function (errorMsg, i) {
        return <li className="errors" key={ i }>{ errorMsg }</li>;
      });
    }

    return <ul>{ messages }</ul>;
    },

handleSubmit: function (event) {
    event.preventDefault();
    var id = this.props.id;
    var formData = new FormData();
    formData.append("pet[name]", this.state.name);
    formData.append("pet[animal]", this.state.animal);
    formData.append("pet[age]", this.state.age);
    formData.append("pet[breed]", this.state.breed);
    formData.append("pet[contact_email]", SessionStore.currentUser().email);
    formData.append("pet[description]", this.state.description);
    formData.append("pet[sex]", this.state.sex);
    formData.append("pet[user_id]", SessionStore.currentUser().id);
    if (this.state.imageFile) {
      formData.append("pet[image]", this.state.imageFile);
    }
    PetApiUtil.updatePet(formData, id, this.handleModalClick);
  },

  handleModalClick: function () {
    ErrorActions.clearErrors();
    this.props.close();
    this.setState({user_id: "", name: "", animal: "", age: "", breed: "", contact_email: "",
              description: "", sex: "", imageFile: null, imageUrl: null});
  },

  stopProp: function (e) {
    e.stopPropagation();
  },

  render: function () {
    return (
      <div className="modal" onClick={this.handleModalClick}>
        <form onSubmit={this.handleSubmit} onEnter={this.handleSubmit} onClick={this.stopProp} className="create group">
          <br/>
          <label>Name<br/>
            <input className="form-input" type="text" value={this.state.name} onChange={this.nameChange}/>
            { this.fieldErrors("name") }
          </label>
          <br/>
          <label>Animal<br/>
              <select className="form-input" value={this.state.animal} onChange={this.animalChange}>
                <option value=""/>
                <option value="Cat" >cat</option>
                <option value="Dog" >dog</option>
                <option value="Rabbit" >rabbit</option>
                <option value="Scales, Fins & Other" >reptile</option>
                <option value="Small & Furry" >other</option>
              </select>
              { this.fieldErrors("animal") }
          </label>
          <br/>
          <label>Age<br/>
              <select className="form-input" value={this.state.age} onChange={this.ageChange}>
              <option value=""/>
                <option value="Baby">baby</option>
                <option value="Young">young</option>
                <option value="Adult">adult</option>
                <option value="Senior">senior</option>
              </select>
              { this.fieldErrors("age") }
          </label>
          <br/>
          <label>Breed<br/>
            <input className="form-input" type="text" value={this.state.breed} onChange={this.breedChange}/>
            { this.fieldErrors("breed") }
          </label>
          <br/>
          <label>Sex<br/>
              <select className="form-input" value={this.state.sex} onChange={this.sexChange}>
              <option value=""/>
              <option value="M" >male</option>
              <option value="F" >female</option>
              </select>
              { this.fieldErrors("sex") }
          </label>
          <br/>
          <label>Description<br/>
          <textarea className="form-input" value={this.state.description} onChange={this.descriptionChange}/>
          { this.fieldErrors("description") }
          </label>
          <br/><br/>
          <img src={this.state.imageUrl} className="preview"/>
            <input type="file" onChange={this.updateFile}/><br/>
          <input type="submit" value="Edit listing" className="login-button"/>
        </form>
        </div>
    );
  },
});

module.exports = PetEdit;
