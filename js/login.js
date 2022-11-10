const usernameBox = document.getElementById("usernameField");
const passwordBox = document.getElementById("passwordField");
const questionBox = document.getElementById("questionField");
const errorSpan = document.getElementById("errorBox");
const question = document.getElementById("question");
const passwords = {
    infinityatom: "7666197a246dded3b8238775f3cedf8350a2858a8117e744a703987dd55aa497",
    Ronstar5623: "ae38668e13d3f9e53d4a1d2442111bbd8b72a4a7e7bdcdfb1f2d3a110d3519da",
    Hype: "c32f5de8269a9aced9a2a66afe8d228052211b0008b80b6993811ce29496bc91",
    Deathsnake: "874fe21a664915c5d35281f75435d23cfeeaa83c13e070a3c6c194945830d0eb",
    Grass: "2534e2de1dec24fedab4c00266b55ba9ba60dde03a349c5b5662189dd561ba9e",
    SUSshrek: "74f8b7d77f4884900bfbe6221f8d7d1d2436acb6919d935088c846a5f5c4314c"
};
const displayNames = {
    infinityatom: "<span class='dis-Owner'>Leonard</span>",
    Ronstar5623: "<span class='dis-Admin disC-Vip'>Ronan</span>",
    Hype: "<span class='dis-Owner'>Seb</span>",
    Deathsnake: "<span class='dis-Member'>Nayab</span>",
    Grass: "<span class='dis-Member'>Ethan</span>",
    SUSshrek: "<span class='dis-Admin'>Sam</span>"
};
const verifyQuestions = {
    infinityatom: "What is your middle name?",
    Ronstar5623: "What is your dad's middle name?",
    Hype: "What is your middle name?",
    Deathsnake: "Which city were you born in?",
    Grass: "What is your middle name?",
    SUSshrek: "What is your middle name?"
};
const verifyQuestionAnswers = {
    infinityatom: "95fb1e05dbabd20a4ea5440cdc0ea6d46cbbd26dcf54da9782f4240c68712b02",
    Ronstar5623: "b5fd03dd91df1cfbd2f19c115d24d58bbda01a23fb01924bb78b2cc14f7ff1cb",
    Hype: "5d422d0acb34b8c10ed55cc2809937c8226538ec1729f5cade99449c597b30e4",
    Deathsnake: "b36f06bee2e4f5485ff63ddc504a3f130d3bd06ec15693e8318babdc06e778ee",
    Grass: "65b16ebbfc8f65d20edb6abb3af8c3efe95c90e4a354a337c9f44ae2c9a09621",
    SUSshrek: "5bf95072052324fb12fd3eb1d75881e86c5d266ac2d59e0c84895c6469c0ae16"
};
const suspensionStatus = { // use $AccountPR$ to remove account
    infinityatom: "!",
    Ronstar5623: "!",
    Hype: "!",
    Deathsnake: "!",
    Grass: "!",
    SUSshrek: "!"
}
const dolphinPoints = {
    infinityatom: "∞",
    Ronstar5623: "14",
    Hype: "∞",
    Deathsnake: "2",
    Grass: "2",
    SUSshrek: "3"
};

async function login() {
    if(passwords[usernameBox.value] == await sha256(passwordBox.value) && verifyQuestionAnswers[usernameBox.value] == await sha256(questionBox.value)) {
        localStorage.disLoginName = usernameBox.value;
        localStorage.disLoginDisplayName = displayNames[usernameBox.value];
        localStorage.disLoginVerifyHash = await sha256(new Date().getHours());
        localStorage.disSuspended = suspensionStatus[usernameBox.value];
        localStorage.disPoints = dolphinPoints[usernameBox.value]

        window.location.href = "dashboard.html";
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
    question.textContent = verifyQuestions[usernameBox.value] == undefined ? "Type in your correct username." : verifyQuestions[usernameBox.value];
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