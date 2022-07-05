// عناصر استفاده شده
const newItemInput = document.querySelector(
  ".new-item > input"
) as HTMLInputElement;
const addItemBtn = document.querySelector(
  ".new-item > button"
) as HTMLButtonElement;
const itemsList = document.querySelector(".items") as HTMLDivElement;

// اجرای مقدار دهی اولیه
initFromStorage(itemsList);

// افزودن آیتم جدید
addItemBtn.addEventListener("click", () => {
  const value = getValidValue(newItemInput);
  if (value) {
    const item = makeNewItem(itemsList, value);
    itemsList.appendChild(item);
    updateStorage(itemsList);
    newItemInput.value = "";
  }
});

// تعریف توابع

// متن آیتم
function setItemText(item: HTMLDivElement, text: string) {
  const span = item.querySelector("span") as HTMLSpanElement;
  span.textContent = text;
}

// قابلیت حذف آیتم
function setItemDelete(item: HTMLDivElement, list: HTMLDivElement) {
  const delBtn = item.querySelector("button") as HTMLButtonElement;
  delBtn.addEventListener("click", () => {
    item.remove();
    updateStorage(list);
  });
}

// قابلیت تیک زدن آیتم
function setItemCheck(
  item: HTMLDivElement,
  isChecked: boolean,
  list: HTMLDivElement
) {
  const checkInput = item.querySelector("input") as HTMLInputElement;
  checkInput.checked = isChecked;
  updateItemClass(item, checkInput);
  checkInput.addEventListener("change", () => {
    updateItemClass(item, checkInput);
    updateStorage(list);
  });
}
function updateItemClass(item: HTMLDivElement, checkInput: HTMLInputElement) {
  if (checkInput.checked) {
    item.classList.add("done");
  } else {
    item.classList.remove("done");
  }
}

// ایجاد آیتم جدید
function makeNewItem(list: HTMLDivElement, text: string, isChecked = false) {
  const template = list.querySelector(".template") as HTMLDivElement;
  const item = template.cloneNode(true) as HTMLDivElement;
  item.classList.remove("template");
  setItemText(item, text);
  setItemDelete(item, list);
  setItemCheck(item, isChecked, list);
  return item;
}

// گرفتن مقدار صحیح از ورودی
function getValidValue(input: HTMLInputElement) {
  if (!input.value) {
    alert("ابتدا باید چیزی بنویسید");
    input.focus();
    return null;
  }
  return input.value;
}

// ذخیره لیست آیتم ها
function updateStorage(list: HTMLDivElement) {
  const items = list.querySelectorAll(".item:not(.template)");
  const array = Array.from(items, (item) => {
    const span = item.querySelector("span") as HTMLSpanElement;
    const input = item.querySelector("input") as HTMLInputElement;
    return {
      text: span.textContent,
      isChecked: input.checked,
    };
  });
  localStorage.setItem("todo-items", JSON.stringify(array));
}

interface TodoItemData {
  text: string;
  isChecked: boolean;
}
// گرفتن مقادر ذخیره شده
function getStorageValues(): TodoItemData[] {
  const jsonArray = localStorage.getItem("todo-items") || "[]";
  return JSON.parse(jsonArray);
}

// مقدار دهی اولیه از ایتم های ذخیره شده
function initFromStorage(list: HTMLDivElement) {
  const values = getStorageValues();
  values.forEach(({ text, isChecked }) => {
    const item = makeNewItem(list, text, isChecked);
    itemsList.appendChild(item);
  });
}
