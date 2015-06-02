/*Переключатель классов у nav*/
(function () {

	var hamburger = document.getElementById('nav-trigger');
	var element = document.getElementsByTagName('nav')[0];
	var x;

	if (hamburger.addEventListener) {
    hamburger.addEventListener('click', openMenu, false);
  } else {
    hamburger.attachEvent('onclick', openMenu);
  }

	function openMenu() {
		if (window.getComputedStyle) {
			x = getComputedStyle(element, null)['display'];
		} else {
			x = element.currentStyle.display;
		}

		if (x == 'block') {
			element.style.display = 'none';
		} else {
			element.style.display = 'block';
		}
	};

}());