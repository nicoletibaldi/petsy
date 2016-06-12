var PetActions = require('./../actions/pet_actions');
var ErrorActions = require('./../actions/error_actions');


 module.exports = {
   fetchAllPets: function () {
     $.ajax({
       type: "GET",
       dataType: "JSON",
       url: "/api/pets",
       success: function (result) {
         PetActions.receivePets(result);
       },
       error: function () {
         console.log("Error");
       }
     });
   },

   fetchFilteredPets: function (petType) {
        $.ajax({
          type: "GET",
          dataType: "JSON",
          data: {animal: petType},
          url: "/api/pets",
          success: function (result) {
            PetActions.receivePets(result);
          },
          error: function () {
            console.log("Error");
          }
        });
      },

    fetchCreatedPets: function (userId) {
      $.ajax({
        type: "GET",
        dataType: "JSON",
        data: {user_id: userId},
        url: "/api/pets",
        success: function (result) {
          PetActions.receivePets(result);
        }
      });
    },

   fetchSinglePet: function (id) {
     $.ajax({
       type: "GET",
       dataType: "JSON",
       url: "/api/pets/" + id,
       success: function (result) {
         PetActions.receiveSinglePet(result);
       },
       error: function () {
         console.log("Error");
       }
     });
   },

   createPet: function (data, callback) {
     $.ajax({
       type: "POST",
       url:"/api/pets",
       dataType: "JSON",
       contentType: false,
       processData: false,
       data: data,
       success: function(result) {
         PetActions.receiveSinglePet(result);
         callback && callback();
       },
       error: function (xhr) {
         var errors = xhr.responseJSON;
         ErrorActions.setErrors("new", errors);
       }
     });
   },

   updatePet: function (data, id, callback) {
     $.ajax({
       type: "PATCH",
       url:"/api/pets/" + id,
       dataType: "JSON",
       contentType: false,
       processData: false,
       data: data,
       success: function (result) {
         PetActions.receiveSinglePet(result);
         callback && callback();
       },
       error: function (xhr) {
         var errors = xhr.responseJSON;
         ErrorActions.setErrors("update", errors);
       }
     });
   },

   deletePet: function (id) {
     $.ajax({
       type: "DELETE",
       url:"/api/pets/" + id,
       success: function () {

       }
     });
   }
 };
