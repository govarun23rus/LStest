(function($){

$('[data-modal]').on('click', function(e) {
	e.preventDefault();
	var $this = $(this);
	var modalClass = $this.data('modal');
	$(modalClass).bPopup();
});

}(jQuery));