var NotesManager = function app (){
  //..to be continued
}

NotesManager.prototype.addNote = function(note){
  this.$notes.prepend(
    $("<a href='#'></a>")
    .addClass("note")
    .text(note)
  );
}

NotesManager.prototype.addCurrentNote = function(){
  var current_note = this.$new_note.val();

  if (current_note) {
    this.notes.push(current_note);
    this.addNote(current_note);
    this.$new_note.val("");
  }
}

NotesManager.prototype.showHelp = function(){
  this.$help.show();
  document.addEventListener("click",function __handler__(evt){
    evt.preventDefault();
    evt.stopPropagation();
    evt.stopImmediatePropagation();

    document.removeEventListener("click",__handler__,true);
    hideHelp();
  },true);
}

NotesManager.prototype.hideHelp = function(){
 this.$help.hide();
}

NotesManager.prototype.handleOpenHelp(evt){
  if(!this.help.is(":visible")){
    this.evt.preventDefault();
    this.evt.stopPropagation();
    showHelp();
  }
}

NotesManager.prototype.handleAddNote(evt){
  addCurrentNote();
}

NotesManager.prototype.handleEnter(evt){
  if(this.evt.which == 13){
    addCurrentNote();
  }
}

NotesManager.prototype.handleDocumentClick(evt){
  this.$notes.removeClass("active");
  this.$notes.children(".note").removeClass("highlighted");
}

NotesManager.prototype.handleNoteClick(evt){
  this.evt.preventDefault();
  this.evt.stopPropagation();
  this.$notes.addClass("active");
  this.$notes.children(".note").removeClass("highlighted");
  $(this.evt.target).addClass("highlighted");
}

NotesManager.prototype.loadData(data){
  for (var i=0; i<data.length; i++) {
    this.notes.push(this.data[i]);
  }
}

NotesManager.prototype.init(opts){
  // cache references to the DOM elements we need to manage
  $notes = $(this.opts.notes);
  $new_note = $(this.opts.new_note);
  $add_note = $(this.opts.add_note);
  $help = $(this.opts.help);
  $open_help = $(this.opts.open_help);

  // build the initial list from the existing `notes` data
  var html = "";
  for (i=0; i<this.notes.length; i++) {
    html += "<a href='#' class='note'>" + this.notes[i] + "</a>";
  }
  $notes.html(html);

	// listen to "help" button
	$open_help.bind("click",handleOpenHelp);

  // listen to "add" button
  $add_note.bind("click",handleAddNote);

  // listen for <enter> in text box
  $new_note.bind("keypress",handleEnter);

  // listen for clicks outside the notes box
  $(document).bind("click",handleDocumentClick);

  // listen for clicks on note elements
  $notes.on("click",".note",handleNoteClick);


}

	var
		// private `notes` data
		notes = [],

		// DOM refs
		$notes,
		$new_note,
		$add_note,
		$help,
		$open_help,

		// module API
		publicAPI = {
			loadData: loadData,
			init: init
		}
	;

	return publicAPI;



// assume this data came from the database
NotesManager.loadData([
	"This is the first note I've taken!",
	"Now is the time for all good men to come to the aid of their country.",
	"The quick brown fox jumped over the moon."
]);


$(document).ready(function(){
	NotesManager.init({
		notes: "#notes",
		new_note: "#note",
		add_note: "#add_note",
		help: "#help",
		open_help: "#open_help"
	});
});
