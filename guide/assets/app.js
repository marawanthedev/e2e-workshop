(function () {
  var body = document.body;
  function safe(fn) { try { return fn(); } catch (e) { return null; } }

  var box = document.getElementById("presenter");
  var on = safe(function () { return localStorage.getItem("presenter") === "1"; }) || location.search.indexOf("presenter") > -1;
  box.checked = on; body.classList.toggle("show-presenter", on);
  box.addEventListener("change", function () {
    body.classList.toggle("show-presenter", box.checked);
    safe(function () { localStorage.setItem("presenter", box.checked ? "1" : "0"); });
  });

  document.getElementById("menu").addEventListener("click", function () { body.classList.toggle("menu-open"); });
  document.getElementById("nav").addEventListener("click", function (e) { if (e.target.tagName === "A") body.classList.remove("menu-open"); });

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".copy");
    if (!btn) return;
    var text = document.getElementById(btn.getAttribute("data-target")).textContent;
    var done = function () { btn.textContent = "Copied"; btn.classList.add("done"); setTimeout(function () { btn.textContent = "Copy"; btn.classList.remove("done"); }, 1400); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
    function fallback() { var t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); done(); } catch (err) {} t.remove(); }
  });

  var links = [].slice.call(document.querySelectorAll("nav a"));
  var pages = links.map(function (a) { return document.querySelector(a.getAttribute("href")); });
  function spy() {
    var y = window.scrollY + 120, idx = 0;
    pages.forEach(function (p, i) { if (p && p.offsetParent !== null && p.offsetTop <= y) idx = i; });
    links.forEach(function (a, i) { a.classList.toggle("current", i === idx); });
  }
  addEventListener("scroll", spy, { passive: true }); spy();
})();
