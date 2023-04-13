let headingList = [
    {
        id: 1,
        naziv: "Heading 1",
        element: "h1",
        text: "Shortcut: type /1",
        shortcut: "/1"
    },
    {
        id: 2,
        naziv: "Expandable Heading 1",
        element: "h2",
        text: "Shortcut: type /1+",
        shortcut: "/1+"
    },
    {
        id: 3,
        naziv: "Normal",
        element: "p",
        text: "Shortcut: type /+1",
        shortcut: "/+1"
    }
];

let headingTexts = [];
let headingListElement = document.getElementById("heading-list");
let headingsTextListEl = document.getElementById("heading-text-list");
let headingInputEl = document.getElementById("heading-input");
let headingTypeEl = document.getElementById("heading-type");
var selectedEl = null;
var selectedHeading = null;

headingListElement.style.display = "none";

function setElement(param) {
    selectedHeading = param;
}

function getElement() {
    return selectedHeading;
}

headingInputEl.addEventListener('keydown', (event) => {

    if (event.key === 'Escape') {
        let heading = document.getElementById("heading-type");
        let editHeadingType = document.createElement('p');
        editHeadingType.setAttribute("id", "heading-type")
        headingInputEl.value = "";
        headingInputEl.setAttribute("placeholder", "Type / for blocks, @ to link docs or people")
        heading.parentNode.replaceChild(editHeadingType, heading);
        editHeadingType.append(headingInputEl);
    }

    if(headingInputEl.getAttribute("placeholder").includes("Type / for blocks, @ to link docs or people")) {
        return false;
    }

    if(event.key === "Enter") {
        heading = document.getElementById("heading-type");
        headingTexts = [...headingTexts, { id: 1, text: headingInputEl.value, element: getElement() }]

        let headingTextItem = document.createElement(getElement());
        let editHeadingType = document.createElement("p");
        let editInput = document.createElement("input");

        editInput.setAttribute("class", "edit-heading-input");
        editInput.setAttribute("disabled", "true");

        headingTextItem.appendChild(editInput); 
        editInput.value = headingInputEl.value;

        headingsTextListEl.appendChild(headingTextItem);

        headingInputEl.value = "";
        headingInputEl.style.display = "none";
        headingInputEl.setAttribute("placeholder", "Type / for blocks, @ to link docs or people")
        heading.parentNode.replaceChild(editHeadingType, heading);

        editHeadingType.setAttribute("id","heading-type");
        editHeadingType.append(headingInputEl);

        headingTextItem.addEventListener('click', function handleClick(event) {
            selectedEl = event.target;
            selectedEl.removeAttribute("disabled");
        });

        editInput.addEventListener("keypress", function(event) {
                if(event.key === "Enter") {
                    selectedEl.setAttribute("disabled", "true");
                }
            });
    }
});

headingList.forEach((item, index) => {
  let headingListContent = document.createElement("div");
  let headingListItem = document.createElement("li");
  let headingItemText = document.createElement("li");

  headingListContent.setAttribute("class", "heading-list-content")

  headingListContent.appendChild(headingListItem);
  headingListContent.appendChild(headingItemText)

  headingListItem.setAttribute("class", "heading-item");
  headingItemText.setAttribute("class", "heading-item-text");

  headingListItem.innerText = item.naziv;
  headingItemText.innerText = item.text;

  headingListElement.appendChild(headingListContent)

  headingListContent.addEventListener('click', function handleClick(event) {

        let heading = document.createElement(item.element);

        setElement(item.element);

        heading.setAttribute("id","heading-type");
        heading.append(headingInputEl);
        
        headingTypeEl = document.getElementById("heading-type")
        headingTypeEl.parentNode.replaceChild(heading, headingTypeEl);

        headingListElement.style.display = "none";

        headingInputEl.value = "";
        headingInputEl.setAttribute("placeholder", item.naziv);
    
  });

});

function handleShowHeadingList(e) {
    if(headingInputEl.value === "/" && headingInputEl.getAttribute("placeholder").includes("Type / for blocks, @ to link docs or people")) {
        headingListElement.style.display = "block";
    }

    if(headingInputEl.value === "" || !headingInputEl.getAttribute("placeholder").includes("Type / for blocks, @ to link docs or people")) {
        headingListElement.style.display = "none";
    }

    headingList.map(item => {
        if(headingInputEl.value === item.shortcut) {
            let headingeEl = document.createElement(item.element);

            setElement(item.element);

            headingeEl.setAttribute("id","heading-type");

            headingListElement.style.display = "none";

            headingTypeEl = document.getElementById("heading-type")
            headingTypeEl.parentNode.replaceChild(headingeEl, headingTypeEl);
            headingInputEl.value = "";
            headingInputEl.setAttribute("placeholder", item.naziv);

            headingeEl.append(headingInputEl);
        }
    })
}

function handleShowInput () {
    headingInputEl.style.display = "block";
}