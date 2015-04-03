(function() {

    'use strict';  // Enforces Javascript strict mode, a restricted variant of Javascript. This line should be at the top of other codes you may write

    // All the javascript code should be written inside this block. 
    // Any code written within this block wont be accessible outside. This ensures encapsulation.
    var db;

	// create a blank instance of the todp object
	var todo = [
    	{ subject: "", due:"", assignedTo:"", note:"",status:"",source:"", notified: "no" }
	];

var _this, app = {
        el: {
            // All static Element Selectors should be defined within this block
            $button1	: $("#button1"),
            $subject 	: $(“#subject”),
            $due 		: $(“#due),
            $assignedTo	: $(“#assignedTo),
            $note 		: $(“#note),
            $status 	: $(“#status),
            $source		: $(“#source)
           },
        // This function acts as the Class Constructor
        init: function() {
            _this = this;            

            // In the following line, you should include the prefixes of implementations you want to test.
		  	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
		  	// DON'T use "var indexedDB = ..." if you're not in a function.
			// Moreover, you may need references to some window.IDB* objects:
		  	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
		  	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
		  	// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
		  	// Let us open our database
		  	var DBOpenRequest = window.indexedDB.open("iToDo", 4);
		  	// these two event handlers act on the database being opened successfully, or not
  			DBOpenRequest.onerror = function(event) {
    			note.innerHTML += '<li>Error loading database.</li>';
  			};
  
		  	DBOpenRequest.onsuccess = function(event) {
    			console.log('Database initialised');
    			// store the result of opening the database in the db variable. This is used a lot below
    			db = DBOpenRequest.result;
    			// Run the displayData() function to populate the task list with all the to-do list data already in the IDB
    			displayData();
    		}

        },
        displayData: function () {
	    // first clear the content of the task list so that you don't get a huge long list of duplicate stuff each time
	    //the display is updated.
	    taskList.innerHTML = "";
	  
	    // Open our object store and then get a cursor list of all the different data items in the IDB to iterate through
	    var objectStore = db.transaction('iToDo').objectStore('iToDo');
	    objectStore.openCursor().onsuccess = function(event) {
	      var cursor = event.target.result;
	        // if there is still another cursor to go, keep runing this code
	        if(cursor) {
	          // create a list item to put each data item inside when displaying it
	          var listItem = document.createElement('li');
	          
	          // build the to-do list entry and put it into the list item via innerHTML.
	          listItem.innerHTML = cursor.value.subject + ' — ' + cursor.due ;
	          
	          if(cursor.value.notified == "yes") {
	            listItem.style.textDecoration = "line-through";
	            listItem.style.color = "rgba(255,0,0,0.5)";
	          }
	          taskList.appendChild(listItem);  
	          var deleteButton = document.createElement('button');
	          listItem.appendChild(deleteButton);
	          deleteButton.innerHTML = 'X';	          
	          deleteButton.setAttribute('data-task', cursor.value.taskTitle);
	          deleteButton.onclick = function(event) {
	            deleteItem(event);
	          }
	          
	          // continue on to the next item in the cursor
	          cursor.continue();
	        
	        // if there are no more cursor items to iterate through, say so, and exit the function 
	        } else {
	          note.innerHTML += '<li>Entries all displayed.</li>';
	        }
	      }
	    }
        buttonClickHandler: function() {

          

        },
        initEventHandlers: function() {
            var el = _this.el;
            // Registering Eventlisteners
            el.$button1.on('click', _this.buttonClickHandler);
         },
        initPlugins: function() {

            // Any Javascript/jQuery plugins can be incorporated here
            _this.textbox1.datepicker();
        }
 
    };

   // Initialize the Application once DOM is loaded 
   document.addEventListener('DOMContentLoaded', app.init.bind(app));

})();