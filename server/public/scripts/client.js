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
}
function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      gender: 'D',
      age: 7,
      readyForTransfer: false,
      notes: 'loves swimming in lava',
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: '/koalas'
    //then, when you get a response, append a table row to the DOM with the info you received
}).then(function (response) {
  $('#viewKoalas').empty();  
  for (let i = 0; i < response.length; i++) {
        let koala = response[i];
        console.log(koala.ready_for_transfer);
        $('#viewKoalas').append(`
            <tr>
                <td>${koala.name}</td>
                <td>${koala.gender}</td>
                <td>${koala.age}</td>
                <td>${koala.ready_for_transfer? 'Ready for transfer': 'Not ready for transfer'}</td>
                <td>${koala.notes}</td>
            </tr>
        `);
    }
}).catch(function  (err) {
  console.log('Error getting Koalas:', err);
});
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
}


//TODO only take the first character of gender input