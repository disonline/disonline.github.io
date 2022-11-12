const usernameBox = document.getElementById("usernameField");
const passwordBox = document.getElementById("passwordField");
const questionBox = document.getElementById("questionField");
const errorSpan = document.getElementById("errorBox");
const question = document.getElementById("question");
const credentials = JSON.parse(httpGet("/credentials.json"));

document.addEventListener("DOMContentLoaded", () => {
    if(getParameterByName("api_redirect") != null) {
        document.getElementById("loginInfo").innerHTML = "External Login";
    }
});

async function login() {
    if(credentials.passwords[usernameBox.value] == await sha256(passwordBox.value) && credentials.questionanswers[usernameBox.value] == await sha256(questionBox.value)) {
        localStorage.disLoginName = usernameBox.value;
        localStorage.disLoginDisplayName = credentials.displaynames[usernameBox.value];
        localStorage.disLoginVerifyHash = await sha256(new Date().getHours());
        localStorage.disSuspended = credentials.suspension[usernameBox.value];
        localStorage.disPoints = credentials.points[usernameBox.value];

        if(getParameterByName("api_redirect") == null) {
            window.location.href = "dashboard.html";
        } else {
            window.location.href = `${getParameterByName("api_redirect")}?username=${localStorage.disLoginName}&verify=${await sha256(new Date().getHours() + new Date().getFullYear())}`;
        }
        
    } else {
        if(usernameBox.value = "#Portal2") {
            window.location.href = "https://portal2web.github.io";
        } else {
            errorSpan.textContent = "Your username, password or answer is incorrect.";

            setTimeout(() => {
                errorSpan.textContent = "";
            }, 2000);
        }
        
    }
}

usernameBox.addEventListener("keyup", function() {
    question.textContent = credentials.question[usernameBox.value] == undefined ? "Type in your correct username." : credentials.question[usernameBox.value];
});


function sha256(plain) {
    const utf8 = new TextEncoder().encode(plain);
    return crypto.subtle.digest("SHA-256", utf8).then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((bytes) => bytes.toString(16).padStart(2, "0"))
            .join("");
        return hashHex;
    });
    // await result
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}