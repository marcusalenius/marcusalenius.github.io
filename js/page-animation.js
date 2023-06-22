function expandCard(cardId) {
    const card = document.getElementById(cardId);
    const cardRect = card.getBoundingClientRect()
    const positionSize = {
        left: cardRect.left + window.scrollX,
        top: cardRect.top + window.scrollY,
        width: cardRect.width,
        height: cardRect.height
    };
    console.log(positionSize);
    const clone = card.cloneNode(true);
    // Set initial properties
    clone.style.width = `${positionSize.width}px`;
    clone.style.position = 'absolute'
    clone.style.left = `${positionSize.left}px`;
    clone.style.top = `${positionSize.top}px`;
    clone.style.transition = '300ms';
    // Add to DOM
    document.body.appendChild(clone);
    // Add expanded class and remove initial properties
    setTimeout(() => {
        clone.style.removeProperty('width');
        clone.classList.add('expanded');
        clone.style.removeProperty('left');
        // clone.style.removeProperty('top');
    }, 1);
    // Load page after transition time
    setTimeout(() => {
        window.location.href = 'kenboard.html';
    }, 500);
}

(function() {
	window.onpageshow = function(event) {
		if (event.persisted) {
			window.location.reload();
		}
	};
})();

