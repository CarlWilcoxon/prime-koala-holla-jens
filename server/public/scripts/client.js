console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function addKoala() {
  console.log('adding a new Koala');
  console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object

  let tempName = $('#nameIn').val();
  let tempGender = $('#genderIn').val().slice(0,1).toUpperCase();
  let tempAge = $('#ageIn').val();
  let tempReady = convertToBool($('#readyForTransferIn').val());
  let tempNotes = $('#notesIn').val();

  let newKoala = {
    name: tempName,
    gender: tempGender,
    age: tempAge,
    ready_for_transfer: tempReady,
    notes: tempNotes
  };

  // ajax call with the new obejct
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: newKoala
    //then, when you get a response, append a table row to the DOM with the info you received
  }).then(function (response) {
    console.log(newKoala, 'added!');
    getKoalas();
  }).catch(function  (err) {
    console.log('Error adding a Koala:', err);
  })
}

function convertToBool(input) {
  if (input.toLowerCase() == 'no' || input.toLowerCase() == 'not yet' ||
  input.toLowerCase() == 'nope' || input.toLowerCase() == 'kinda') {
    return false;
  } else {
    return !!input; //everything that is not falsy return as true
  }
}

function editKoala() {
  console.log('edit button clicked');
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: '/koalas'
    //then, when you get a response, append a table row to the DOM with the info you received
  }).then(function (response) {
    updateKoalas(response);
  }).catch(function  (err) {
    console.log('Error getting Koalas:', err);
  });
} // end getKoalas

function removeKoala() {
  console.log(this);
  let id = $(this).closest('tr').data('id');

  $.ajax({
    type: 'DELETE',
    url: '/koalas/' + id
    //then, when you get a response, append a table row to the DOM with the info you received
  }).then(function (response) { 
    getKoalas();
  }).catch(function  (err) {
    console.log('Error getting Koalas:', err);
  });
}

function setupClickListeners() {
  $( '#addButton' ).on( 'click', addKoala);
  $( '#viewKoalas' ).on('click', '.removeButton', removeKoala);
  $( '#viewKoalas' ).on('click', '.editButton', editKoala);
}

function toggleTransfer() {
  let parcel = false;
  if ($(this).is('.notReady')) {
    //do one thingy
    console.log('this is the red button');
    toggleBlock.call( $ ('.red.invisible').first());
  } else if ($(this).is('.ready')) {
    //do a thing
  }
  $.ajax({
    type: 'PUT',
    url: '/koalas' + id
    //then, when you get a response, append a table row to the DOM with the info you received
  }).then(function (response) {
    updateKoalas(response);
  }).catch(function  (err) {
    console.log('Error getting Koalas:', err);
  });
}

function updateKoalas(response) {
  $('#viewKoalas').empty();  
  for (let i = 0; i < response.length; i++) {
    let koala = response[i];
    $('#viewKoalas').append(`
      <tr data-id="${koala.id}">
        <td>${koala.name}</td>
        <td>${koala.gender}</td>
        <td>${koala.age}</td>
        <td>${koala.ready_for_transfer? 'Ready for transfer': 'Not ready for transfer'}</td>
        <td>${koala.notes}</td>
        <td><button type="button" class="removeButton">Remove</button></td>
        <td><button type="button" class="editButton">Edit</button></td>
      </tr>
    `);
  }
}
//TODO delete
//TODO update