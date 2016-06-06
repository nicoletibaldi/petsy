var React = require('react');
var PetApiUtil = require('./../util/pet_api_util');
var SessionStore = require('./../stores/session_store');

var PetForm = React.createClass({
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
    formData.append("pet[image]", this.state.imageFile)
    PetApiUtil.createPet(formData);
    this.setState({name: "", animal: "", age: "", breed: "", contact_email: "",
              description: "", sex: "", imageFile: null, imageUrl: null});
  },

  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name
          <input type="text" value={this.state.name} onChange={this.nameChange}/>
        </label><br/>
        <label>Animal
          <input type="text" value={this.state.animal} onChange={this.animalChange}/>
        </label><br/>
        <label>Age
          <input type="text" value={this.state.age} onChange={this.ageChange}/>
        </label><br/>
        <label>Breed
          <input type="text" value={this.state.breed} onChange={this.breedChange}/>
        </label><br/>
        <label>Description
          <input type="text" value={this.state.description} onChange={this.descriptionChange}/>
        </label><br/>
        <label>Sex
          <input type="text" value={this.state.sex} onChange={this.sexChange}/>
        </label><br/>
        <label>File
          <input type="file" onChange={this.updateFile}/>
        </label>
        <input type="submit" value="List pet!"/>
        <img src={this.state.imageUrl} />
      </form>
    );
  },
});

module.exports = PetForm;
