var newItemInput = document.querySelector(".new-item > input");
var addItemBtn = document.querySelector(".new-item > button");
var itemsList = document.querySelector(".items");
initFromStorage(itemsList);
addItemBtn.addEventListener("click", function () {
    var value = getValidValue(newItemInput);
    if (value) {
        var item = makeNewItem(itemsList, value);
        itemsList.appendChild(item);
        updateStorage(itemsList);
        newItemInput.value = "";
    }
});
function setItemText(item, text) {
    var span = item.querySelector("span");
    span.textContent = text;
}
function setItemDelete(item, list) {
    var delBtn = item.querySelector("button");
    delBtn.addEventListener("click", function () {
        item.remove();
        updateStorage(list);
    });
}
function setItemCheck(item, isChecked, list) {
    var checkInput = item.querySelector("input");
    checkInput.checked = isChecked;
    updateItemClass(item, checkInput);
    checkInput.addEventListener("change", function () {
        updateItemClass(item, checkInput);
        updateStorage(list);
    });
}
function updateItemClass(item, checkInput) {
    if (checkInput.checked) {
        item.classList.add("done");
    }
    else {
        item.classList.remove("done");
    }
}
function makeNewItem(list, text, isChecked) {
    if (isChecked === void 0) { isChecked = false; }
    var template = list.querySelector(".template");
    var item = template.cloneNode(true);
    item.classList.remove("template");
    setItemText(item, text);
    setItemDelete(item, list);
    setItemCheck(item, isChecked, list);
    return item;
}
function getValidValue(input) {
    if (!input.value) {
        alert("ابتدا باید چیزی بنویسید");
        input.focus();
        return null;
    }
    return input.value;
}
function updateStorage(list) {
    var items = list.querySelectorAll(".item:not(.template)");
    var array = Array.from(items, function (item) {
        var span = item.querySelector("span");
        var input = item.querySelector("input");
        return {
            text: span.textContent,
            isChecked: input.checked,
        };
    });
    localStorage.setItem("todo-items", JSON.stringify(array));
}
function getStorageValues() {
    var jsonArray = localStorage.getItem("todo-items") || "[]";
    return JSON.parse(jsonArray);
}
function initFromStorage(list) {
    var values = getStorageValues();
    values.forEach(function (_a) {
        var text = _a.text, isChecked = _a.isChecked;
        var item = makeNewItem(list, text, isChecked);
        itemsList.appendChild(item);
    });
}
