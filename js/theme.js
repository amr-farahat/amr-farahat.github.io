/* Dark/light theme toggle — no dependencies, ~1KB.
   Persists the choice in localStorage; defaults to dark. */
(function () {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;

    function apply(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        btn.textContent = theme === 'light' ? '[dark]' : '[light]';
    }

    apply(localStorage.getItem('theme') || 'dark');

    btn.addEventListener('click', function () {
        var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', next);
        apply(next);
    });
})();
