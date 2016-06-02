var PetActions = require('./../actions/pet_actions');

 module.exports = {
   fetchRandomPets: function (offset) {
     offset = offset || 0;
     $.ajax({
       type: "GET",
       dataType: "JSONP",
       data: {count: 16, offset: offset},
       url: "http://api.petfinder.com/pet.find?key=8702fd94d045acb703444d0f1969212c&format=json&location=11570&output=full",
       success: function (result) {
         PetActions.receivePets(result);
       },
       error: function () {
         console.log("Error");
       }
     });
   }
 };
