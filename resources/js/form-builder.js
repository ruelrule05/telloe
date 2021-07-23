require('./bootstrap');
import Vue from 'vue';
window.app = new Vue({
	el: '#app',
});

// jQuery($ => {
//     const fbTemplate = document.getElementById('fb-editor');
//     $(fbTemplate).formBuilder();
// });

// jQuery(document).ready(function () {
// 	const fbTemplate = document.getElementById('fb-editor');
//     $(fbTemplate).formBuilder();
// });

// jQuery(function() {
// 	var fbEditor = $(document.getElementById('fb-editor'))
//     var formBuilder;
// 	formBuilder = fbEditor.formBuilder();
// });	

jQuery(function($) {
	var fbTemplate = document.getElementById("fb-editor");
	$(fbTemplate).formBuilder();
	// var controls = document.getElementById("frmb-0-cb-wrap");
	// document.getElementById("fb-controls").appendChild(controls);
});
  