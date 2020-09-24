const { deleteDB } = require("./button");

function loadDataDefault() {
    fetch("/buttonscript").then((result) =>
        result.json().then(function () {
            document.getElementById("clickMe").onclick = deleteDB()
        })
    );
}
loadDataDefault();