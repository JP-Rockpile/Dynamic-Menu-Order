var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status)
        }
    };
    xhr.send();
}


function buildMenu(tableElement, menuObject, level) {
    var menuKeys = Object.keys(menuObject);

    for (var i = 0; i < menuKeys.length; i++) {
        var menuItemName = menuKeys[i];
        var menuItemObject = menuObject[menuItemName];

        console.log(menuItemName, menuItemObject);

        var menuItemRow = document.createElement("tr");
        menuItemRow.className = "level-" + level;

        if (typeof menuItemObject === "string") {
            var menuItemNameElement = document.createElement("td");
            menuItemNameElement.innerHTML = menuItemName;

            var menuItemPriceElement = document.createElement("td");
            menuItemPriceElement.innerHTML = menuItemObject;

            var menuItemCheckboxElement = document.createElement("td");

            // add an input tag created with document.createElement, set the name of the input to menuItemName
            var input = document.createElement("input");
            input.type = "number";
            input.min = 0;
            input.value = 0;
            input.name = menuItemName.replace(/ /g, "-");

            menuItemCheckboxElement.append(input);

            // Add cells to row.
            menuItemRow.append(menuItemNameElement);
            menuItemRow.append(menuItemPriceElement);
            menuItemRow.append(menuItemCheckboxElement);

            // Add row to table.
            tableElement.append(menuItemRow);
        } else {
            var menuItemNameElement = document.createElement("th");
            menuItemNameElement.colSpan = 2;
            menuItemNameElement.innerHTML = menuItemName;

            // Add header row.
            menuItemRow.append(menuItemNameElement);

            // Add row to table.
            tableElement.append(menuItemRow);

            buildMenu(tableElement, menuItemObject, level + 1);
        }
    }
}

var menuTable = document.getElementById("menu");


getJSON('https://mm214.com/menu.php', function (err, data) {
    if (err || !data) {
        alert('There has been an error!');
        return;
    }
    buildMenu(menuTable, data.menu, 1);

});

function submitOrder() {

    var form = document.getElementsByTagName("form")[0];
    var formData = new FormData(form);
    var customerData = {};
    formData.forEach(function (value, key) {
        customerData[key] = value;
    });
    console.log(JSON.stringify(customerData));
    localStorage.setItem("customerData", JSON.stringify(customerData));

}

function viewOrder() {

    var jsonString = localStorage.getItem("customerData");
    console.log(jsonString);
    console.log(JSON.parse(jsonString));
    document.write(jsonString);

}