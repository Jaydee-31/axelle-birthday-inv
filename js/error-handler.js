window.onerror = function (message, source, _line, _col, _error) {
	const file = source ? source.split('/').pop() : 'unknown';
	console.error('[Invitation Error]', message, file ? ('in ' + file) : '');
	return true;
};

window.addEventListener('unhandledrejection', function (event) {
	console.error('[Invitation Promise Error]', event.reason);
	event.preventDefault();
});
