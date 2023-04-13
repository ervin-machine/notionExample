
<a name="readme-top"></a>

<br />
<div align="center">
  <h3 align="center">Notion Example</h3>

  <p align="center">
    Simple Notion Example
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://notion-example.herokuapp.com/">View Demo</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project


Project was about to create notion example but a little simplier to use. In this project you can make a few heading blocks this is just some prototype. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* Javascript
* HTML
* CSS

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Below is explanation how you can start to use this project

1. Clone the repo
   ```sh
   git clone https://github.com/ervin-machine/notionExample
   ```
2. Open notionExample.html in browser

3. That's it enjoy in the notion example :)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage


Here is the magic happening, it used to handle creating and editing a text and also if user decide to cancel creating text just press Escape button.

```
headingInputEl.addEventListener('keydown', (event) => {

    if (event.key === 'Escape') {
        let heading = document.getElementById("heading-type");
        let editHeadingType = document.createElement('p');

        headingInputEl.value = "";
        headingInputEl.setAttribute("placeholder", "Type / for blocks, @ to link docs or people")

        heading.parentNode.replaceChild(editHeadingType, heading);

        editHeadingType.setAttribute("id", "heading-type")
        editHeadingType.append(headingInputEl);

        headingListElement.style.display = "none";
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

        headingInputEl.removeAttribute("autofocus");

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

```

This if is used to create a New Text after pressing Enter

```
    if(event.key === "Enter")
```

After new text is created it needs to get back to default input

```
headingInputEl.value = "";
headingInputEl.style.display = "none";
headingInputEl.setAttribute("placeholder", "Type / for blocks, @ to link docs or people")
heading.parentNode.replaceChild(editHeadingType, heading);
```

Also if heading type isn't selected he can't press enter and create a text until he choose a heading type:

```
if(headingInputEl.getAttribute("placeholder").includes("Type / for blocks, @ to link docs or people")) {
    return false;
}
```

Next lines of code is about to enable edit clicked specific text

```
headingTextItem.addEventListener('click', function handleClick(event) {
            selectedEl = event.target;
            selectedEl.removeAttribute("disabled");
        });
```

After you have edited your text just press Enter, here is a code example how is that done

```
editInput.addEventListener("keypress", function(event) {
            if(event.key === "Enter") {
                selectedEl.setAttribute("disabled", "true");
            }
        });
```

Below code is used to fill heading list element with types of headings and after click on specific heading item it will change a input to selected heading item.

```
headingList.forEach((item) => {
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

```

function handleShowHeadingList is used to handle showing heading list types after typing "/" and is used to, to get a specfic heading input after typing shortcut for specific heading.

```
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
            headingInputEl.setAttribute("autofocus", "true")
            headingInputEl.setAttribute("placeholder", item.naziv);

            headingeEl.append(headingInputEl);
        }
    })
}

```

This variable is defined and used to save heading text list in case that in future we want to save values to some database

```
let headingTexts = [];
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Your Name - Ervin Hodzic

Email: hodzicervin462001@gmail.com

Project Link: [https://github.com/ervin-machine/notionExample](https://github.com/ervin-machine/notionExample)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
