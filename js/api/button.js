document.addEventListener("DOMContentLoaded", () => {
    try {
        document.querySelector("div.disLoginApi").innerHTML = `
            <a href="https://disonline.github.io/login.html?redirect=${document.querySelector("div").getAttribute("name")}">
                <img src="https://disonline.github.io/media/api_image.png" draggable="false">
            </a>
        `
    }
    catch(err) {
        console.error("You have to have a DIV.disLoginApi with the id as the redirect URL.");
    }
});