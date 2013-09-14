/* Extend Handsontable with ProcessWire features */


/**
 * Image renderer for Image fields
 */
var imageRenderer = function (instance, td, row, col, prop, value, cellProperties) {

	$(td).empty().addClass('htImage htDimmed');
    
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
	
	$(td).empty().addClass('htFile htDimmed');
	
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


var PwHOT = {
	
	// Contains changed data per instance
	changedData : {},
	
	savePages : function(pwhot_id) {
	
		var data = {
			'pwhot_id' : pwhot_id,
			'action' : 'save',
			'data' : JSON.stringify(PwHOT.changedData[pwhot_id])	
		};
				
		$.get(PwHOT.url, data, function() {
			console.log('saved pages');
			// Reset changes
			PwHOT.changedData[pwhot_id] = [];
			$('.pwhot_save').removeClass('ui-state-active');
		}, 'json');
	
	}
	
};

$(document).ready(function(){
	
	$('.MarkupPagerNav li').click(function(){
		var pwhot_id = $(this).parent().attr('data-id');
		if (PwHOT.changedData[pwhot_id].length) {
			if (confirm('There are unsaved changes. Do you want to save them before going to the selected page?')) {
				PwHOT.savePages(pwhot_id);
			}
		}
		console.log(PwHOT.changedData[pwhot_id]);
	});
	
	$('.pwhot_save').click(function(){
		var pwhot_id = $(this).attr('data-id');
		PwHOT.savePages(pwhot_id);
		return false;
	});
	
});
