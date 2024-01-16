/* Scroll animation */

const animateOnScroll = (elementSelector, offsetPercent) => {
    const element = document.querySelector(elementSelector);
	const windowBottom = window.innerHeight + window.scrollY;
	const scrollOffset = element.offsetTop + (element.offsetHeight / 100 * offsetPercent);
    const modifier = elementSelector.slice(1) + '--animation';

	if (windowBottom >= scrollOffset) {
	    element.classList.add(modifier);
	} else {
	    element.classList.remove(modifier);
	}
};

window.addEventListener('scroll', () => {
    animateOnScroll('.pricing__container', 25);
	animateOnScroll('.footer__button', 5);
});