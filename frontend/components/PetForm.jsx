var React = require('react');
var PetApiUtil = require('./../util/pet_api_util');
var SessionStore = require('./../stores/session_store');
var ErrorStore = require('./../stores/error_store');
var ErrorActions = require('./../actions/error_actions');

var PetForm = React.createClass({
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
      return ({name: "", animal: "", age: "", breed: "", contact_email: "",
                description: "", sex: "", imageFile: null, imageUrl: null});
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
    var newDesc = event.target.value
    this.setState({description: newDesc});
  },

  sexChange: function (event) {
    var newSex = event.target.value
    this.setState({sex: newSex});
  },

  updateFile: function (e) {
    var file = e.currentTarget.files[0]
    var fileReader = new FileReader();
    fileReader.onloadend = function () {
      this.setState({imageFile: file, imageUrl: fileReader.result})
    }.bind(this);

    if (file) {
      fileReader.readAsDataURL(file);
    }
  },

  fieldErrors: function (field) {
    var errors = ErrorStore.formErrors("new");
    var array = [1, 2, 3, 4, 5, 6]
    if (!errors[field]) {
      var messages = array.map(function (i) {
        return <li className="errors" key={i}/>
      });
    } else {
      var messages = errors[field].map(function (errorMsg, i) {
        return <li className="errors" key={ i }>{ errorMsg }</li>;
      });
    }

    return <ul>{ messages }</ul>;
    },

handleSubmit: function (event) {
    event.preventDefault();
    var formData = new FormData();
    formData.append("pet[name]", this.state.name)
    formData.append("pet[animal]", this.state.animal)
    formData.append("pet[age]", this.state.age)
    formData.append("pet[breed]", this.state.breed)
    formData.append("pet[contact_email]", SessionStore.currentUser().email)
    formData.append("pet[description]", this.state.description)
    formData.append("pet[sex]", this.state.sex)
    if (this.state.imageFile) {
      formData.append("pet[image]", this.state.imageFile)
    }
    PetApiUtil.createPet(formData);
    this.setState({name: "", animal: "", age: "", breed: "", contact_email: "",
              description: "", sex: "", imageFile: null, imageUrl: null});
  },

  handleModalClick: function () {
    ErrorActions.clearErrors();
    this.props.close();
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
              <select className="form-input">
                <option value="Cat" onChange={this.animalChange}>cat</option>
                <option value="Dog" onChange={this.animalChange}>dog</option>
                <option value="Rabbit" onChange={this.animalChange}>rabbit</option>
                <option value="Scales, Fins & Other" onChange={this.animalChange}>reptile</option>
                <option value="Small & Furry" onChange={this.animalChange}>other</option>
              </select>
              { this.fieldErrors("animal") }
          </label>
          <br/>
          <label>Age<br/>
              <select className="form-input">
                <option value="Baby" onChange={this.ageChange}>baby</option>
                <option value="Young" onChange={this.ageChange}>adult</option>
                <option value="Adult" onChange={this.ageChange}>young</option>
                <option value="Senior" onChange={this.ageChange}>senior</option>
              </select>
              { this.fieldErrors("age") }
          </label>
          <br/>
          <label>Breed<br/>
            <input className="form-input" type="text" value={this.state.breed} onChange={this.breedChange}/>
            { this.fieldErrors("breed") }
          </label>
          <br/>
          <label>Description<br/>
            <input className="form-input" type="text" value={this.state.description} onChange={this.descriptionChange}/>
            { this.fieldErrors("description") }
          </label>
          <br/>
          <label>Sex<br/>
              <select className="form-input">
              <option value="M" onChange={this.sexChange}>male</option>
              <option value="F" onChange={this.sexChange}>female</option>
              </select>
              { this.fieldErrors("sex") }
          </label>
          <br/>
            <input type="file" onChange={this.updateFile}/><br/>
          <input type="submit" value="List pet!" className="login-button"/>
          <img src={this.state.imageUrl} className="preview"/>
        </form>
        </div>
    );
  },
});

module.exports = PetForm;
