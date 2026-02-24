1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Ans: The difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll are given below

getElementById: It select  a single element using its unique ID.It is the fastest method but it only works with IDs.Its return the element directly.

getElementsByClassName: It select multiple element that share the same class name.It returns a live HTMLCollection (array-like-object).so if the DOM changes the collection updates automatically.


querySelector: It select the first element that matches a specific CSS selector like .class,#id or div > p and it return null if no match is found.


querySelectorAll: It select all the element that match a specific CSS selector.It returns a static NodeList which doesn't auto-update when the DOM chnages.It is more flexible because it accept any valid CSS selector.

2. How do you create and insert a new element into the DOM?

Ans: To create and insert a new element, we follow these steps:

1.Create: Use document.createElement('tag-name') to create the new HTML element in memory.

2.Modify: Add content or attribute to it like (element.innnerText - 'Hello',element.classList.add('my-class')).

3.Insert: Select a parent element already in the DOM and use parentElement.appendChild(newElement) to attach the new element to the page.

3. What is Event Bubbling? And how does it work?

Ans: Event Bubbling is a mechanism in JavaScript where an event triggered on a child element propagates (bubbles) up to its parent elements, all the way to the document or window.

The way it work is if we click a button inside a div, the click event first fires on the botton,then on the div, and finally on the body.So this allows the parents to listen for evenets happening on their children without attaching listeners to every single child.

4. What is Event Delegation in JavaScript? Why is it useful?

Ans: Event Delegation is a technique where instead of adding an event listener to every individual child element we add a single event listener to a common parent so then we use event.target to identify which specific child was clicked.

Event Delegation in JavaScript is useful in following ways-
1.Performance: It reduces memory usage because fewer event listeners are created.
2.Dynamic Content: It automatically works for elements added to the DOM later dynamically. In my project, I used event delegation on the main container so that delete buttons in newly created cards still work without needing new listeners.

5. What is the difference between preventDefault() and stopPropagation() methods?

Ans: The difference between preventDefault() and stopPropagation() methods are given below-

preventDefault(): It stops the default behaviour of an element.for example it prevents a form form submitting when the submit button is clicked, or stops a link from navigating to a new page. It does not stop the event from bubbling up. 

stopPropagation(): It Stops the event bubbling process.It prevents the event from traveling up to parent elements. However, it does not stop the element's default behavior like a form submission.