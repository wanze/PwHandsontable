PwHandsontable
==============

Integration of Jquery Plugin *Handsontable* in ProcessWire.  
See: http://handsontable.com/

This module renders a Handsontable table with columns from Pw fields. The module sets up the 
Handsontable column renderers and editors based on Fieldtypes. 
Some Fieldtypes are (currently) *readOnly*, which means that their cells are not editable.   
Note that this module is primarily for developers who want to render the table in another Module or Inputfield.
Configuration is done by setting properties to the PwHandsontable object, not over the UI. However, if all the functionality
is implemented and tested, there should be a Process Module which makes use of PwHandsontable.  

**Alpha version!**

Here is an example how the module can be loaded from a Process module:
```php
class ProcessHandsontable extends Process implements Module {
  
  // PwHandsontable instance
  protected $ht;
  
  public static function getModuleInfo() {
    return array(
      'title' => 'Testing the Handsontable module',          
      'version' => 100, 
      'permanent' => false, 
      'permission' => 'page-edit',
    );
  }

  public function init() {
	  parent::init();
	  // Get instance of module in init() method
	  $this->ht = $this->modules->get('PwHandsontable');	  
  }
  
  public function execute() {
	  // Set module settings - check out the class for all settings available ATM
	  // Set a selector for the pages to display
	  $this->ht->selector = "template=skyscraper, images.count>1, sort=title";
	  // Columns to display in table
	  $this->ht->columns = array('id', 'title', 'path', 'architects', 'height', 'floors', 'images', 'year');
	  // Set column widths - not necessary but prevents rendering issues
	  $this->ht->colWidths = array(40,150,200,150,40,40,200,40);
	  // Call render to output the table
	  return $this->ht->render();
  }

}
```
##Roadmap
* Paging for records (ajax loading)
* Edit mode: Data in editable cells can be changed. Changes are saved with ajax.
* New mode: Empty table which can be filled with data by the user to generate pages. First row contains field names.


