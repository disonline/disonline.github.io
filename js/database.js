document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("blocker").style.display = "none";
    document.getElementById("page1").src = "media/db/" + getParameterByName("dbfile") + "_1.png";
    document.getElementById("page2").src = "media/db/" + getParameterByName("dbfile") + "_2.png";
});

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}