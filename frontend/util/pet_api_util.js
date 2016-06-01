var PetActions = require('./../actions/pet_actions');

 module.exports = {
   fetchPets: function () {
     $.ajax({
       type: "GET",
       dataType: "JSONP",
       url: "http://api.petfinder.com/pet.getRandom?key=8702fd94d045acb703444d0f1969212c&format=json&output=full",
       success: function (result) {
         debugger
       },
       error: function () {
         console.log("Error");
       }

     });
   }
 };
