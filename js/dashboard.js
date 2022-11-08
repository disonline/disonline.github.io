const dataBaseInfo = `
<a href="ranks.html">Ranks [20/09/2022]</a>
<a href="database.html?dbfile=sethinfo_19092022">SethInfo.xlsx [19/09/2022]</a>
<a href="database.html?dbfile=sethinfo_20092022">SethInfo.xlsx [20/09/2022]</a>
<a href="database.html?dbfile=members_21092022">Members.accdb [21/09/2022]</a>
`;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("greeting").innerHTML = "Hello, " + localStorage.disLoginDisplayName;
    document.getElementById("dparea").textContent = localStorage.disPoints + " DP";
    if(getParameterByName("showDb") == "1") {
        document.getElementById("conf_DB").innerHTML = dataBaseInfo;
    }
});

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function post(path, params, method='post') {

    // The rest of this code assumes you are not using a library.
    // It can be made less verbose if you use one.
    const form = document.createElement('form');
    form.method = method;
    form.action = path;
    form.target = "_blank";
  
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = params[key];
  
        form.appendChild(hiddenField);
      }
    }
  
    document.body.appendChild(form);
    form.submit();
  }
  