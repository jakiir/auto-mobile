function check_number(txtMobId) {
 reg = /[^0-9.,]/g;
 txtMobId.value =  txtMobId.value.replace(reg,"");
}

function attributes_del(THIS) {
    var $thisbutton = THIS;
    var data_keys = $thisbutton.getAttribute('data-keys');
	console.log(data_keys);	
    $.ajax({
        type: 'POST',
        url: adminUrl.ajaxurl,
        data: {
            action: 'del_attributes',
            data_keys:data_keys
        },
        success: function(){
            $('.'+ data_keys).remove();
        },
        error: function(errorThrown){
            alert(errorThrown);
        }

    });
    return false;
}

function attributes_edit(THIS) {
    var $thisbutton = THIS;
    var data_keys = $thisbutton.getAttribute('data-keys');
    var make_value = $thisbutton.getAttribute('data-make_value');
	var model_value = $thisbutton.getAttribute('data-model_value');
	var year_value = $thisbutton.getAttribute('data-year_value');
	
    $('#automobile_attributes_add').hide();
    $('#automobile_attributes_edit').show();
	
    var attributes_make_edit = $('#attributes_make_edit_id');
	var attributes_model_edit = $('#attributes_model_edit_id');
	var attributes_year_edit = $('#attributes_year_edit_id');
	
    attributes_make_edit.val(make_value);
	attributes_model_edit.val(model_value);
	attributes_year_edit.val(year_value);
	
    attributes_make_edit.attr("data-keys", data_keys);
    return false;
}

/*
function year_del(THIS) {
    var $thisbutton = THIS;
    var data_keys = $thisbutton.getAttribute('data-keys');
    $.ajax({
        type: 'POST',
        url: adminUrl.ajaxurl,
        data: {
            action: 'del_automobile_year',
            data_keys:data_keys
        },
        success: function(){
            $thisbutton.parentElement.remove();
        },
        error: function(errorThrown){
            alert(errorThrown);
        }

    });
    return false;
}
function year_edit(THIS) {
    var $thisbutton = THIS;
    var data_keys = $thisbutton.getAttribute('data-keys');
    var year_value = $thisbutton.getAttribute('data-year_value');
    $('#automobile_year_add').hide();
    $('#automobile_year_edit').show();
    var editAutomobileYear = $('#edit_automobile_year');
    editAutomobileYear.val(year_value);
    editAutomobileYear.attr("data-keys", data_keys);
    return false;
}

function model_del(THIS) {
    var $thisbutton = THIS;
    var data_keys = $thisbutton.getAttribute('data-keys');
    $.ajax({
        type: 'POST',
        url: adminUrl.ajaxurl,
        data: {
            action: 'del_automobile_model',
            data_keys:data_keys
        },
        success: function(){
            $thisbutton.parentElement.remove();
        },
        error: function(errorThrown){
            alert(errorThrown);
        }

    });
    return false;
}
function model_edit(THIS) {
    var $thisbutton = THIS;
    var data_keys = $thisbutton.getAttribute('data-keys');
    var model_value = $thisbutton.getAttribute('data-model_value');
    $('#automobile_model_add').hide();
    $('#automobile_model_edit').show();
    var editAutomobileModel = $('#edit_automobile_model');
    editAutomobileModel.val(model_value);
    editAutomobileModel.attr("data-keys", data_keys);
    return false;
}

function make_del(THIS) {
    var $thisbutton = THIS;
    var data_keys = $thisbutton.getAttribute('data-keys');
    $.ajax({
        type: 'POST',
        url: adminUrl.ajaxurl,
        data: {
            action: 'del_automobile_make',
            data_keys:data_keys
        },
        success: function(){
            $thisbutton.parentElement.remove();
        },
        error: function(errorThrown){
            alert(errorThrown);
        }

    });
    return false;
}
function make_edit(THIS) {
    var $thisbutton = THIS;
    var data_keys = $thisbutton.getAttribute('data-keys');
    var make_value = $thisbutton.getAttribute('data-make_value');
    $('#automobile_make_add').hide();
    $('#automobile_make_edit').show();
    var editAutomobileMake = $('#edit_automobile_make');
    editAutomobileMake.val(make_value);
    editAutomobileMake.attr("data-keys", data_keys);
    return false;
}*/

jQuery(document).ready(function($){
	
	
	$( document ).on( 'change', '#txt_automobile_make_admin', function() {
        var $thisbutton = $( this );
        var thisText = $thisbutton.find("option:selected").text();

        var thisValue = $thisbutton.val();
        var txt_automobile_model_admin = $('#txt_automobile_model_admin');
        var txt_automobile_year_admin = $('#txt_automobile_year_admin');
		var txt_automobile_year_to_admin = $('#txt_automobile_year_to_admin');
		
		
		
        $.ajax({
          type: 'POST',
          url: adminUrl.ajaxurl,
          data: {
          action: 'admin_make_model',
            automobile_make:thisValue
          },
          success: function(data){              
            var obj = jQuery.parseJSON(data);
            if(obj['success'] == true){
                var value_dum = '';
                txt_automobile_model_admin.prop('disabled', false);
                txt_automobile_model_admin.html('');
                txt_automobile_model_admin.append('<option value="' + value_dum + '">Model</option>');
                for (var prop in obj['model']) {
                    txt_automobile_model_admin.append('<option value="'+obj['model'][prop]+'">' + obj['model'][prop] + '</option>');
                }

				txt_automobile_year_admin.prop('disabled', false);
                txt_automobile_year_admin.html('');
                txt_automobile_year_admin.append('<option value="' + value_dum + '">From year</option>');
                for (var prop in obj['year']) {
                    txt_automobile_year_admin.append('<option value="'+obj['year'][prop]+'">' + obj['year'][prop] + '</option>');
                }
				
				txt_automobile_year_to_admin.prop('disabled', false);
                txt_automobile_year_to_admin.html('');
                txt_automobile_year_to_admin.append('<option value="' + value_dum + '">Year to</option>');
                for (var prop in obj['year']) {
                    txt_automobile_year_to_admin.append('<option value="'+obj['year'][prop]+'">' + obj['year'][prop] + '</option>');
                }

            }
          },
          error: function(errorThrown){
            alert(errorThrown);
          }

          });

        return false;

    });
	

	
				// Only show the "remove image" button when needed
				if ( ! $( '#automobile_product_category_thumbnail_id' ).val() ) {
					$( '.remove_image_button' ).hide();
				}

				// Uploading files
				var file_frame;
				var image_custom_uploader;
				$( document ).on( 'click', '.upload_image_button', function( event ) {

					event.preventDefault();

					// If the media frame already exists, reopen it.
					if ( image_custom_uploader ) {
						image_custom_uploader.open();
						return;
					}

					// Create the media frame.
					image_custom_uploader = wp.media.frames.downloadable_file = wp.media({
						title: 'Choose an image',
						button: {
							text: 'Use image'
						},
						multiple: false
					});

					// When an image is selected, run a callback.
					image_custom_uploader.on( 'select', function() {
						var attachment = image_custom_uploader.state().get( 'selection' ).first().toJSON();

						$( '#automobile_product_category_thumbnail_id' ).val( attachment.id );
						$( '#automobile_product_category_thumbnail img' ).attr( 'src', attachment.sizes.thumbnail.url );
						$( '.remove_image_button' ).show();
					});

					// Finally, open the modal.
					image_custom_uploader.open();
				});

				$( document ).on( 'click', '.remove_image_button', function() {
					$( '#automobile_product_category_thumbnail img' ).attr( 'src', adminUrl.default_image );
					$( '#automobile_product_category_thumbnail_id' ).val( '' );
					$( '.remove_image_button' ).hide();
					return false;
				});



	$( '#attributes_submit' ).click( function() {
        var $thisbutton = $(this);
		$thisbutton.closest('.fields_wrap').find('.message').html('');
        $thisbutton.closest('.fields_wrap').find('.reloadIcon').css('display','inline-block');
		
        var make_val = $('#attributes_make_id');
		var model_val = $('#attributes_model_id');
		var year_val = $('#attributes_year_id');
		
		if(make_val.val() == ''){
			$thisbutton.closest('.fields_wrap').find('.message').html('<strong style="color:red">Make field is required!<strong>');
			make_val.focus();
			return false;
		} else{
			$thisbutton.closest('.fields_wrap').find('.message').html('');
		}
		
		if(model_val.val() == ''){
			$thisbutton.closest('.fields_wrap').find('.message').html('<strong style="color:red">Model field is required!<strong>');
			model_val.focus();
			return false;
		} else{
			$thisbutton.closest('.fields_wrap').find('.message').html('');
		}
		
		if(year_val.val() == ''){
			$thisbutton.closest('.fields_wrap').find('.message').html('<strong style="color:red">Year field is required!<strong>');
			year_val.focus();
			return false;
		} else{
			$thisbutton.closest('.fields_wrap').find('.message').html('');
		}
		
        $.ajax({
            type: 'POST',
            url: adminUrl.ajaxurl,
            data: {
                action: 'add_attributes',
                make_val:make_val.val(),
				model_val:model_val.val(),
				year_val:year_val.val()
            },
            success: function(data){
                var obj = jQuery.parseJSON(data);
                if(obj['success'] == true) {
                    $thisbutton.closest('.fields_wrap').find('.reloadIcon').css('display', 'none');
                    $('#attributes_make_id').val('');
					$('#attributes_model_id').val('');
					$('#attributes_year_id').val('');
                    $thisbutton.closest('.fields_wrap').find('#attributes_display_area').show().append('<li class="'+ obj['key'] +' '+ obj['class'] +'">' + obj['make'] + '</li><li class="'+ obj['key'] +' '+ obj['class'] +'">' + obj['model'] + '</li><li class="'+ obj['key'] +' '+ obj['class'] +'">' + obj['year'] + '</li><li class="'+ obj['key'] +' '+ obj['class'] +' action"><a href="javascript:void(0)" class="attributes_del delIcon" onclick="attributes_del(this)" data-keys="'+ obj['key'] +'"><i class="fa fa-times"></i></a><a href="javascript:void(0)" class="attributes_edit editIcon" onclick="attributes_edit(this)" data-keys="'+ obj['key'] +'" data-attributes_make="'+ obj['make'] +'"><i class="fa fa-pencil-square-o"></i></a></li>');
                } else {
                    $thisbutton.closest('.fields_wrap').find('.reloadIcon').css('display', 'none');                    
                    $thisbutton.closest('.fields_wrap').find('.message').html('<strong style="color:red">'+ obj['meg'] +'</strong>');
                }
            },
            error: function(errorThrown){
                alert(errorThrown);
            }

        });

        return false;
    });
	
	
	$( '#attributes_submit_edit' ).click( function() {
        var $thisbutton = $(this);
		
        var attributes_make_edit = $('#attributes_make_edit_id');
		var attributes_model_edit = $('#attributes_model_edit_id');
		var attributes_year_edit = $('#attributes_year_edit_id');
		
        var make_val = attributes_make_edit.val();
        var data_keys = attributes_make_edit.attr("data-keys");
		
		var model_val = attributes_model_edit.val();
		var year_val = attributes_year_edit.val();	
		
        $thisbutton.closest('.fields_wrap').find('.reloadIcon').css('display','inline-block');
		
		
		
        $.ajax({
            type: 'POST',
            url: adminUrl.ajaxurl,
            data: {
                action: 'edit_attributes',
                data_keys:data_keys,
                make_value:make_val,
				model_val:model_val,
				year_val:year_val
            },
            success: function(data){
                $('#automobile_attributes_add').show();
                $('#automobile_attributes_edit').hide();
				$thisbutton.closest('.fields_wrap').find('.reloadIcon').css('display', 'none');
				
				$( "li."+data_keys ).eq( 0 ).html( make_val );
				$( "li."+data_keys ).eq( 1 ).html( model_val );
				$( "li."+data_keys ).eq( 2 ).html( year_val );
				$( "li."+data_keys ).eq( 3 ).find('.attributes_edit').attr( 'data-make_value', make_val ).attr( 'data-model_value', model_val ).attr( 'data-year_value', year_val );     
            },
            error: function(errorThrown){
                alert(errorThrown);
            }

        });
        return false;
    });
	


    /*$( '#automobile_make_submit' ).click( function() {
        var $thisbutton = $(this);
        var make_val = $('#automobile_make_id').val();
        $thisbutton.closest('.fields_wrap').find('.message').html('');
        $thisbutton.closest('.fields_wrap').find('.reloadIcon').css('display','inline-block');

        $.ajax({
            type: 'POST',
            url: adminUrl.ajaxurl,
            data: {
                action: 'add_automobile_make',
                make_val:make_val
            },
            success: function(data){
                var obj = jQuery.parseJSON(data);
                if(obj['success'] == true) {
                    $thisbutton.closest('.fields_wrap').find('.reloadIcon').css('display', 'none');
                    $('#automobile_make_id').val('');
                    $thisbutton.closest('.fields_wrap').find('#make_display_area').show().append('<li class="'+ obj['key'] +'">' + obj['value'] + '<a href="javascript:void(0)" class="make_del delIcon" onclick="make_del(this)" data-keys="'+ obj['key'] +'"><i class="fa fa-times"></i></a><a href="javascript:void(0)" class="make_edit editIcon" onclick="make_edit(this)" data-keys="'+ obj['key'] +'" data-make_value="'+ obj['value'] +'"><i class="fa fa-pencil-square-o"></i></a></li>');
                } else {
                    $thisbutton.closest('.fields_wrap').find('.reloadIcon').css('display', 'none');
                    $('#automobile_make_id').focus();
                    $thisbutton.closest('.fields_wrap').find('.message').html('<strong style="color:red">'+ obj['value'] +'</strong>');
                }
            },
            error: function(errorThrown){
                alert(errorThrown);
            }

        });

        return false;
    });

    $( '#automobile_make_edit_submit' ).click( function() {
        var $thisbutton = $(this);
        var editAutomobileMake = $('#edit_automobile_make');
        var make_val = editAutomobileMake.val();
        var data_keys = editAutomobileMake.attr("data-keys");
        $thisbutton.closest('.fields_wrap').find('.reloadIcon').css('display','inline-block');
        $.ajax({
            type: 'POST',
            url: adminUrl.ajaxurl,
            data: {
                action: 'edit_automobile_make',
                data_keys:data_keys,
                make_value:make_val
            },
            success: function(data){
                $('#automobile_make_add').show();
                $('#automobile_make_edit').hide();
                $thisbutton.closest('.fields_wrap').find('.reloadIcon').css('display', 'none');
                $('.'+data_keys).html('<li class="'+ data_keys +'">' + make_val + '<a href="javascript:void(0)" class="make_del delIcon" onclick="make_del(this)" data-keys="'+ data_keys +'"><i class="fa fa-times"></i></a><a href="javascript:void(0)" class="make_edit editIcon" onclick="make_edit(this)" data-keys="'+ data_keys +'" data-make_value="'+ make_val +'"><i class="fa fa-pencil-square-o"></i></a></li>');
            },
            error: function(errorThrown){
                alert(errorThrown);
            }

        });
        return false;
    });

    $( '#automobile_model_submit' ).click( function() {
        var $thisbutton = $(this);
        var model_val = $('#automobile_model_id').val();
        $thisbutton.closest('.fields_wrap').find('.message').html('');
        $thisbutton.closest('.fields_wrap').find('.reloadIcon').css('display','inline-block');

        $.ajax({
            type: 'POST',
            url: adminUrl.ajaxurl,
            data: {
                action: 'add_automobile_model',
                model_val:model_val
            },
            success: function(data){
                var obj = jQuery.parseJSON(data);
                if(obj['success'] == true) {
                    $thisbutton.closest('.fields_wrap').find('.reloadIcon').css('display', 'none');
                    $('#automobile_model_id').val('');
                    $thisbutton.closest('.fields_wrap').find('#model_display_area').show().append('<li class="'+ obj['key'] +'">' + obj['value'] + '<a href="javascript:void(0)" class="model_del delIcon" onclick="model_del(this)" data-keys="'+ obj['key'] +'"><i class="fa fa-times"></i></a><a href="javascript:void(0)" class="model_edit editIcon" onclick="model_edit(this)" data-keys="'+ obj['key'] +'" data-model_value="'+ obj['value'] +'"><i class="fa fa-pencil-square-o"></i></a></li>');
                } else {
                    $thisbutton.closest('.fields_wrap').find('.reloadIcon').css('display', 'none');
                    $('#automobile_model_id').focus();
                    $thisbutton.closest('.fields_wrap').find('.message').html('<strong style="color:red">'+ obj['value'] +'</strong>');
                }
            },
            error: function(errorThrown){
                alert(errorThrown);
            }

        });

        return false;
    });

    $( '#automobile_model_edit_submit' ).click( function() {
        var $thisbutton = $(this);
        var editAutomobileModel = $('#edit_automobile_model');
        var model_val = editAutomobileModel.val();
        var data_keys = editAutomobileModel.attr("data-keys");
        $thisbutton.closest('.fields_wrap').find('.reloadIcon').css('display','inline-block');
        $.ajax({
            type: 'POST',
            url: adminUrl.ajaxurl,
            data: {
                action: 'edit_automobile_model',
                data_keys:data_keys,
                model_value:model_val
            },
            success: function(data){
                $('#automobile_model_add').show();
                $('#automobile_model_edit').hide();
                $thisbutton.closest('.fields_wrap').find('.reloadIcon').css('display', 'none');
                $('.'+data_keys).html('<li class="'+ data_keys +'">' + model_val + '<a href="javascript:void(0)" class="model_del delIcon" onclick="model_del(this)" data-keys="'+ data_keys +'"><i class="fa fa-times"></i></a><a href="javascript:void(0)" class="model_edit editIcon" onclick="model_edit(this)" data-keys="'+ data_keys +'" data-model_value="'+ model_val +'"><i class="fa fa-pencil-square-o"></i></a></li>');
            },
            error: function(errorThrown){
                alert(errorThrown);
            }

        });
        return false;
    });
	
	
	$( '#automobile_year_submit' ).click( function() {
        var $thisbutton = $(this);
        var year_val = $('#automobile_year_id').val();		
        $thisbutton.closest('.fields_wrap').find('.message').html('');
        $thisbutton.closest('.fields_wrap').find('.reloadIcon').css('display','inline-block');

        $.ajax({
            type: 'POST',
            url: adminUrl.ajaxurl,
            data: {
                action: 'add_automobile_year',
                year_val:year_val
            },
            success: function(data){
                var obj = jQuery.parseJSON(data);
                if(obj['success'] == true) {
                    $thisbutton.closest('.fields_wrap').find('.reloadIcon').css('display', 'none');
                    $('#automobile_year_id').val('');
                    $thisbutton.closest('.fields_wrap').find('#year_display_area').show().append('<li class="'+ obj['key'] +'">' + obj['value'] + '<a href="javascript:void(0)" class="year_del delIcon" onclick="year_del(this)" data-keys="'+ obj['key'] +'"><i class="fa fa-times"></i></a><a href="javascript:void(0)" class="year_edit editIcon" onclick="year_edit(this)" data-keys="'+ obj['key'] +'" data-year_value="'+ obj['value'] +'"><i class="fa fa-pencil-square-o"></i></a></li>');
                } else {
                    $thisbutton.closest('.fields_wrap').find('.reloadIcon').css('display', 'none');
                    $('#automobile_year_id').focus();
                    $thisbutton.closest('.fields_wrap').find('.message').html('<strong style="color:red">'+ obj['value'] +'</strong>');
                }
            },
            error: function(errorThrown){
                alert(errorThrown);
            }

        });

        return false;
    });

    $( '#automobile_year_edit_submit' ).click( function() {
        var $thisbutton = $(this);
        var editAutomobileModel = $('#edit_automobile_year');
        var year_val = editAutomobileModel.val();
        var data_keys = editAutomobileModel.attr("data-keys");
        $thisbutton.closest('.fields_wrap').find('.reloadIcon').css('display','inline-block');
        $.ajax({
            type: 'POST',
            url: adminUrl.ajaxurl,
            data: {
                action: 'edit_automobile_year',
                data_keys:data_keys,
                year_value:year_val
            },
            success: function(data){
                $('#automobile_year_add').show();
                $('#automobile_year_edit').hide();
                $thisbutton.closest('.fields_wrap').find('.reloadIcon').css('display', 'none');
                $('.'+data_keys).html('<li class="'+ data_keys +'">' + year_val + '<a href="javascript:void(0)" class="year_del delIcon" onclick="year_del(this)" data-keys="'+ data_keys +'"><i class="fa fa-times"></i></a><a href="javascript:void(0)" class="year_edit editIcon" onclick="year_edit(this)" data-keys="'+ data_keys +'" data-year_value="'+ year_val +'"><i class="fa fa-pencil-square-o"></i></a></li>');
            },
            error: function(errorThrown){
                alert(errorThrown);
            }

        });
        return false;
    });*/
	
	$( document ).on( 'click', '.orderStatus', function() {
		var $thisbutton = $( this );
        var order_id = $thisbutton.attr('data-order_id');
		var order_status = $thisbutton.attr('data-order_status');		
		$.ajax({
        type: 'POST',
        url: adminUrl.ajaxurl,
        data: {
            action: 'add_order_status',
            order_id : order_id,
			order_status : order_status
        },
        success: function(data){
            var obj = jQuery.parseJSON(data);
			console.log(obj);
			if(obj['success'] == true){
				$( $thisbutton ).closest( "td" ).find('.orderStatus').removeClass('active');
				if(order_status == 'complete'){
					$( $thisbutton ).closest( "tr" ).find('.order_status mark').removeClass('on-hold').addClass('on-complete').attr('data-tooltip', 'On Complete');
					$( $thisbutton ).closest( "tr" ).find('.order_status mark .fa').removeClass('fa-minus').addClass('fa-check');
					$( $thisbutton ).addClass('active');		
				} else {
					$( $thisbutton ).closest( "tr" ).find('.order_status mark').removeClass('on-complete').addClass('on-hold').attr('data-tooltip', 'On Hold');
					$( $thisbutton ).closest( "tr" ).find('.order_status mark .fa').removeClass('fa-check').addClass('fa-minus');
					$( $thisbutton ).addClass('active');
				}				
			} else {
				
			}
            
        },
        error: function(errorThrown){
            alert(errorThrown);
        }
		});

		return false;
	});


    $('select.styled').customSelect();

    $(".automobile_block").hide();
    $(".automobile ul li:first").addClass("active").show();
    $(".automobile_block:first").show();

    $(".automobile ul li").click(function() {
        $(".automobile ul li").removeClass("active");
        $(this).addClass("active");
        $(".automobile_block").hide();
        var activeTab = $(this).find("a").attr("href");
        $(activeTab).fadeIn(200);
        return false;
    });

    /* $('#automobile_text_color_selector').ColorPicker({
        onChange: function (hsb, hex) {
                $('#automobile_text_color_selector div').css('backgroundColor', '#' + hex);
                $('#automobile_text_color').val('#'+hex);
        }
    });
    $('#automobile_links_color_selector').ColorPicker({
        onChange: function (hsb, hex) {
                $('#automobile_links_color_selector div').css('backgroundColor', '#' + hex);
                $('#automobile_links_color').val('#'+hex);
        }
    });
    $('#automobile_links_hover_color_selector').ColorPicker({
        onChange: function (hsb, hex) {
                $('#automobile_links_hover_color_selector div').css('backgroundColor', '#' + hex);
                $('#automobile_links_hover_color').val('#'+hex);
        }
    });
    $('#automobile_background_color_selector').ColorPicker({
        onChange: function (hsb, hex) {
                $('#automobile_background_color_selector div').css('backgroundColor', '#' + hex);
                $('#automobile_background_color').val('#'+hex);
        }
    });


    $('#automobile_hover_background_color_selector').ColorPicker({
        onChange: function (hsb, hex) {
                $('#automobile_hover_background_color_selector div').css('backgroundColor', '#' + hex);
                $('#automobile_hover_background_color').val('#'+hex);
        }
    });
     */


   /* $("#sidebar-position-options input:checked").parent().addClass("selected");
    $("#sidebar-position-options .checkbox-select").click(
        function(event) {
            event.preventDefault();
            $("#sidebar-position-options li").removeClass("selected");
            $(this).parent().addClass("selected");
            $(this).parent().find(":radio").attr("checked","checked");
        }
    );*/
    var automobile_meta_post_show_review = $('#automobile_meta_post_show_review');
    if (automobile_meta_post_show_review.is(':checked')) {
        $('#wt-post-meta-review-options').css('display', 'block');
    }

    automobile_meta_post_show_review.click(function(){
        if (this.checked) {

            $('#wt-post-meta-review-options').slideDown();
        } else {
            $('#wt-post-meta-review-options').slideUp();
        }
    });

$('ul.tabs').each(function(){
    // For each set of tabs, we want to keep track of
    // which tab is active and it's associated content
    var $active, $content, $links = $(this).find('a');

    // If the location.hash matches one of the links, use that as the active tab.
    // If no match is found, use the first link as the initial active tab.
    $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
    $active.addClass('active');

    $content = $($active[0].hash);

    // Hide the remaining content
    $links.not($active).each(function () {
      $(this.hash).hide();
    });

    // Bind the click event handler
    $(this).on('click', 'a', function(e){
      // Make the old tab inactive.
      $active.removeClass('active');
      $content.hide();

      // Update the variables with the new link and content
      $active = $(this);
      $content = $(this.hash);

      // Make the tab active.
      $active.addClass('active');
      $content.show();

      // Prevent the anchor's default click action
      e.preventDefault();
    });
  });

////Select all anchor tag with rel set to tooltip
//$('a[rel=tooltip]').mouseover(function(e) {
//
////Grab the title attribute's value and assign it to a variable
//var tip = $(this).attr('title');
//
////Remove the title attribute's to avoid the native tooltip from the browser
//$(this).attr('title','');
//
////Append the tooltip template and its value
//$(this).append('<div id="tooltip"><div class="tipHeader"></div><div class="tipBody">' + tip + '</div><div class="tipFooter"></div></div>');
//
////Show the tooltip with faceIn effect
//$('#tooltip').fadeIn('500');
//$('#tooltip').fadeTo('10',0.9);
//
//}).mousemove(function(e) {
//
////Keep changing the X and Y axis for the tooltip, thus, the tooltip move along with the mouse
//$('#tooltip').css('top', e.pageY + 10 );
//$('#tooltip').css('left', e.pageX + 20 );
//
//}).mouseout(function() {
//
////Put back the title attribute's value
//$(this).attr('title',$('.tipBody').html());
//
////Remove the appended tooltip template
//$(this).children('div#tooltip').remove();
//
//});
});

jQuery(document).ready(function ($) {
    setTimeout(function () {
        $(".fade").fadeOut("slow", function () {
            $(".fade").remove();
        });
    }, 2000);	
});

/*jQuery(document).ready(function ($) {
    $("#wt-bg-default-pattern input:checked").parent().addClass("selected");
    $("#wt-bg-default-pattern .checkbox-select").click(
        function(event) {
            event.preventDefault();
            $("#wt-bg-default-pattern li").removeClass("selected");
            $(this).parent().addClass("selected");
            $(this).parent().find(":radio").attr("checked","checked");
        }
    );
});*/


 js = jQuery.noConflict();
    js(document).ready(function(){
    js('.add_more').click(function(e){
    e.preventDefault();
    js(this).before("<p><input size='50' name='txt_automobile_mpn[]' type='text' class='in_box' /> &nbsp;<span class='rem' ><a href='javascript:void(0);' ><span class='dashicons dashicons-dismiss'></span></a></span></p>");
    });
    js('.automobile_mpn').on('click', '.rem', function() {
    js(this).parent("p").remove();
    });
    });

    /*jQuery(document).ready(function() {
        jQuery('.txt_automobile_year').datepicker({
        dateFormat : 'dd-mm-yy'
    });
    });*/