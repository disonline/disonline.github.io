function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

document.addEventListener("DOMContentLoaded", () => {
    localStorage.clear();
    if (window.location.href == "http://localhost:5500/suspension.html?user=&reason=undefined") {
        window.location.href = "login.html";
    }

    document.querySelector("h2").textContent = `hello ${getParameterByName("user")},` == "hello ," ? "hello human," : `hello ${getParameterByName("user")},`;
    document.querySelector("h3").textContent += `${getParameterByName("reason")}` == "undefined" ? "nothing" : `${getParameterByName("reason")}`;
})