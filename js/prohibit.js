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

document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.disLoginName == "") {
        localStorage.clear();
        window.location.href = "/login.html";
    }
    if(localStorage.disSuspended == "!") {
        void(0);
    } else if(localStorage.disSuspended == "$AccountPR$") {
        window.location.href = "/accrem.html";
    } else {
        console.log(localStorage.disSuspended);

        window.location.href = "/suspension.html?user=" + localStorage.disLoginName + "&reason=" + localStorage.disSuspended;
    }

    checkIfAllowed();
});

async function checkIfAllowed() {

    if(await sha256(new Date().getHours()) != localStorage.disLoginVerifyHash) {
        localStorage.clear();
        window.location.href = "/login.html";
    }

}

setTimeout(() => {
    document.getElementById("blocker").style.display = "none";
    document.querySelector("body").style.overflowY = "scroll";
}, 500);