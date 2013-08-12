/* Extend Handsontable with ProcessWire features */


/**
 * Image renderer for Image fields
 */
var imageRenderer = function (instance, td, row, col, prop, value, cellProperties) {

	$(td).empty().addClass('htImage');
    
    // Multiple images
    if (typeof value === 'object') {
	    for (var k in value) {
		    var imgSrc = Handsontable.helper.stringify(value[k]);
		    $img = $('<img>').attr('src', imgSrc);
		    $(td).append($img);
	    }
    } else {
	    if (value) {
	    	value = Handsontable.helper.stringify(value);
	    	$img = $('<img>').attr('src', value);
		    $(td).append($img);
	    }
    }
	return td;
};

Handsontable.cellLookup.renderer.image = imageRenderer;

/**
 * File renderer for File fields
 */
var fileRenderer = function (instance, td, row, col, prop, value, cellProperties) {
	
	$(td).empty().addClass('htFile');
	
    // Multiple files
    if (typeof value === 'object') {
	    for (var k in value) {
		    $file = $('<a>').attr('href', value[k]).attr('target', '_blank');
		    $(td).append($file);
	    }
    } else {
	    if (value) {
	    	$file = $('<a>').attr('src', value).attr('target', '_blank');
		    $(td).append($file);
	    }
    }
	return td;

};

Handsontable.cellLookup.renderer.file = fileRenderer;

/**
 * HTML renderer
 */
var htmlRenderer = function (instance, td, row, col, prop, value, cellProperties) {
  var escaped = Handsontable.helper.stringify(value);
  td.innerHTML = escaped;
  return td;
};

Handsontable.cellLookup.renderer.html = htmlRenderer;

$(document).ready(function(){
	
	/**
	 * Filter table
	 */	
	$(".pwhot_filter").keyup(function() {
		var rows = $(this).parent().next('.pwhot_table').find('tr').not(':first').hide();
		var data = $(this).val().split(" ");
		if (data == '') rows.show();
		$.each(data, function(i, v) {
			rows.filter(":contains('" + v + "')").show();
		});
	});

	/**
	 * Setup fancybox for page edits
	 */
	/*
	$('.pwhot_table').on('click', '.pwhot_fancybox', function(e) {
		
		e.preventDefault();
		
		var h = $(window).height()-65;
		var w = $(window).width() > 1150 ? 1150 : $(window).width()-100;
		
		$(this).fancybox({
			type : 'iframe',
			frameWidth : w,
			frameHeight : h
		}).trigger('click');

	});
	*/
});
