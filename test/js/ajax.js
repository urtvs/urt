var items = [];

$(document).ready(function()
{
    console.log('work');

    $.getJSON( "api/json.php", function( data ) {

      items=data;

      var prep = [];

      console.log(data);
      $.each( data.results.block1, function( key, val ) {
         prep.push( "<li id='" + key + "'>" + val.name + "</li>" );
      });

      console.log(prep);
       $( "<ul/>", {
         "class": "my-new-list",
         html: prep.join( "" )
       }).appendTo( "body" );

    });

});


