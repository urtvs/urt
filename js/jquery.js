  $( function() {
    $.widget( "custom.combobox", {
      _create: function() {
        this.wrapper = $( "<span>" )
          .addClass( "custom-combobox" )
          .insertAfter( this.element );

        this.element.hide();
        this._createAutocomplete();
        this._createShowAllButton();
      },

      _createAutocomplete: function() {
        var selected = this.element.children( ":selected" ),
          value = selected.val() ? selected.text() : "";

        this.input = $( "<input>" )
          .appendTo( this.wrapper )
          .val( value )
          .attr( "title", "" )
          .addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
          .autocomplete({
            delay: 0,
            minLength: 0,
            source: $.proxy( this, "_source" )
          })
          .tooltip({
            classes: {
              "ui-tooltip": "ui-state-highlight"
            }
          });

        this._on( this.input, {
          autocompleteselect: function( event, ui ) {
            ui.item.option.selected = true;
            this._trigger( "select", event, {
              item: ui.item.option
            });
          },

          autocompletechange: "_removeIfInvalid"
        });
      },

      _createShowAllButton: function() {
        var input = this.input,
          wasOpen = false;

        $( "<a>" )
          .attr( "tabIndex", -1 )
          .attr( "title", "Show All Items" )
          .tooltip()
          .appendTo( this.wrapper )
          .button({
            icons: {
              primary: "ui-icon-triangle-1-s"
            },
            text: false
          })
          .removeClass( "ui-corner-all" )
          .addClass( "custom-combobox-toggle ui-corner-right" )
          .on( "mousedown", function() {
            wasOpen = input.autocomplete( "widget" ).is( ":visible" );
          })
          .on( "click", function() {
            input.trigger( "focus" );

            // Close if already visible
            if ( wasOpen ) {
              return;
            }

            // Pass empty string as value to search for, displaying all results
            input.autocomplete( "search", "" );
          });
      },

      _source: function( request, response ) {
        var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
        response( this.element.children( "option" ).map(function() {
          var text = $( this ).text();
          if ( this.value && ( !request.term || matcher.test(text) ) )
            return {
              label: text,
              value: text,
              option: this
            };
        }) );
      },

      _removeIfInvalid: function( event, ui ) {

        // Selected an item, nothing to do
        if ( ui.item ) {
          return;
        }

        // Search for a match (case-insensitive)
        var value = this.input.val(),
          valueLowerCase = value.toLowerCase(),
          valid = false;
        this.element.children( "option" ).each(function() {
          if ( $( this ).text().toLowerCase() === valueLowerCase ) {
            this.selected = valid = true;
            return false;
          }
        });

        // Found a match, nothing to do
        if ( valid ) {
          return;
        }

        // Remove invalid value
        this.input
          .val( "" )
          .attr( "title", value + " didn't match any item" )
          .tooltip( "open" );
        this.element.val( "" );
        this._delay(function() {
          this.input.tooltip( "close" ).attr( "title", "" );
        }, 2500 );
        this.input.autocomplete( "instance" ).term = "";
      },

      _destroy: function() {
        this.wrapper.remove();
        this.element.show();
      }
    });

	$("select").not("#uSearch,.s2").combobox();
    $( "#toggle" ).on( "click", function() {
      $("select").not("#uSearch,#uList").toggle();
    });

	$(".tooltip" ).tooltip({
      show: {
        effect: "slideDown",
        delay: 150
      }
    });

	$("#show").hide();
	$("#hide").click(function(){
	  $("#filter").hide();
	  $("#hide").hide();
	  $("#show").show();
	});
	$("#show").click(function(){
	  $("#filter").show();
	  $("#hide").show();
	  $("#show").hide();
	});


	$(".copyDeal").click(function(){
		console.log($(this).attr('title'));
		console.log('value = '+$(this).attr('value'));
		$("#dealID").val($("#dealID").val()+$(this).attr('title')+" ");
	});

	$("#dealList").click(function(){
		console.log($("#dealID").val());
		var win = window.open('r.php?p=1&dealID='+$("#dealID").val(), '_blank');
		win.focus();
	});


	$(".div-show").click(function(){

	   element='#'+this.name;
	   //console.log('#'+this.name);
	   visible=$(element).css('display');

	   if(visible=='none')
	   {
		$(element).show();
	   }
	   else
	   {
		  $(element).hide();
	   }

	});

	$('[data-toggle="tooltip"]').tooltip();

	$('.mtDelayDateSkip').click(function(){
		console.log($(this).data('id'));
		$.ajax({
		  url: 'api/moveTask.php',
		  type: 'POST',
		  data: { moveTaskID: $(this).data('id'), do: "skipDelay" },
		  success: function(data) {
			//called when successful
			$('.mtDelayDate').text('ok');
		  },
		  error: function(e) {
			$('.mtDelayDate').text('error');
		  }
		});
	});

  });

$('#tblMainData').on('onPostBody', function (d) {
  console.log('ok');
});

$(document).ready(function()
{

	var checkedRows = [];



	$('#tblMainData').on('check.bs.table', function (e, row) {
		checkedRows.push({id: row._data.dbid});

    if($('#tableSelectedRows').length == 0) $('#tblMainData-div>.bootstrap-table>.fixed-table-toolbar').append('<div class="float-left search btn-group"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#mdSelRows"> Строк <span class="badge badge-light" id="tableSelectedRows">0</span></button></div>');

		$("#tableSelectedRows").text(Object.keys(checkedRows).length);
		$("#mdSelRows .modal-body").text($.map(checkedRows, function(elem){ return elem.id;}).join(','));
		//$(array.length).insertAfter('#bla')
	});

	$('#tblMainData').on('uncheck.bs.table', function (e, row) {
      $.each(checkedRows, function(index, value) {
        if (value.id === row._data.dbid) {
          checkedRows.splice(index,1);
        }
      });
	   $("#tableSelectedRows").text(Object.keys(checkedRows).length);
	   $("#mdSelRows .modal-body").text($.map(checkedRows, function(elem){ return elem.id;}).join(','));
    });


	 $("#uSearch,.s2").select2({
	  allowClear: true,
	  minimumInputLength: 0,
	  placeholder: 'Выберите',
	  ajax: {
	   url: "api/search.php",
	   type: "post",
	   dataType: 'json',
	   delay: 250,
	   data: function (params) {
		return {
		  searchSource: $(this).attr('class').split(' ')[0],
		  searchTerm: params.term // search term
		};
	   },
	   processResults: function (response) {
		 return {
			results: response.results
		 };
	   },
	   cache: false
	  }
	 });
	});

  document.addEventListener('DOMContentLoaded', function() {
    let day = new Date().getDate();

    setInterval(function () {
        var newDay = new Date().getDate();

        if( newDay !== day )
        {
            document.location.reload();
        }
    }, 60000);
});
