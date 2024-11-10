const activities = [
  {
    title: "Work",
    daily: { current: 5, previous: 7 },
    weekly: { current: 32, previous: 36 },
    monthly: { current: 103, previous: 128 },
  },
  {
    title: "Play",
    daily: { current: 1, previous: 2 },
    weekly: { current: 10, previous: 8 },
    monthly: { current: 23, previous: 29 },
  },
  {
    title: "Study",
    daily: { current: 0, previous: 1 },
    weekly: { current: 4, previous: 7 },
    monthly: { current: 13, previous: 19 },
  },
  {
    title: "Exercise",
    daily: { current: 1, previous: 1 },
    weekly: { current: 4, previous: 5 },
    monthly: { current: 11, previous: 18 },
  },
  {
    title: "Social",
    daily: { current: 1, previous: 3 },
    weekly: { current: 5, previous: 10 },
    monthly: { current: 21, previous: 23 },
  },
  {
    title: "Self Care",
    daily: { current: 0, previous: 1 },
    weekly: { current: 2, previous: 2 },
    monthly: { current: 7, previous: 11 },
  },
];

const menu = document.querySelector("#menu");
const menuItems = Array.from(menu.children);
let activeItem = 0;
const container = document.querySelector("#container");

//generates cards on page load
generateCards(activeItem);

//loop to add eventlisteners to all the menuItems
menuItems.forEach((e, i) => {
  //removes the inActive class from the active item
  if (i === activeItem) e.classList.toggle("inActive");

  //hover effects for the menu items
  const hover = () => {
    if (i !== activeItem) e.classList.toggle("inActive");
  };
  e.addEventListener("mouseenter", hover);
  e.addEventListener("mouseleave", hover);

  //click event to change active item
  e.addEventListener("click", () => {
    //returns if the menu item is the current active item
    if (i === activeItem) return;
    //adds the inActive class back to the previous active item
    menuItems[activeItem].classList.toggle("inActive");
    //updates the value of activeItem to be the menu item being clicked
    activeItem = i;
    //regenerates the cards with the new timeFrame
    generateCards(activeItem);
  });
});

function generateCards(timeFrame) {
  //removes the previous cards if there are any
  const cards = Array.from(container.children);
  cards.forEach((e, i) => {
    if (i !== 0) e.remove();
  });

  //creates a card for each activity
  activities.forEach((e) => {
    //creates the outer container of the card
    const statboxContainer = document.createElement("div");
    //gives the statboxContainer their name as an id and replaces the spaces with "-" if there are any
    statboxContainer.id = e.title.toLowerCase().replace(" ", "-");
    statboxContainer.className = "box statboxContainer";
    container.append(statboxContainer);

    //creates the div with the stats inside
    const statbox = document.createElement("div");
    statbox.className = "statBox";
    statboxContainer.append(statbox);

    //creates to divs to set up the layout of the card
    const nameContainer = document.createElement("div");
    const timeContainer = document.createElement("div");
    statbox.append(nameContainer, timeContainer);

    //name of card
    const statName = document.createElement("p");
    statName.textContent = e.title;
    statName.className = "mainFont titleFont";

    //creates the ellipsis as an inline svg so the fill colour can be changed in css
    const ellipsis = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    ellipsis.setAttribute("width", "21");
    ellipsis.setAttribute("height", "5");
    ellipsis.setAttribute("viewBox", "0 0 21 5");
    path.setAttribute(
      "d",
      "M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
    );
    ellipsis.append(path);
    nameContainer.append(statName, ellipsis);

    //creates the times paragraphs
    const currentTime = document.createElement("p");
    currentTime.className = "mainFont hourFont";
    const lastTime = document.createElement("p");

    lastTime.className = "mainFont lastFont";

    //sets the correct times based on the timeframe
    switch (timeFrame) {
      case 0:
        currentTime.textContent = `${e.daily.current}hrs`;
        lastTime.textContent = `Yesterday - ${e.daily.previous}hrs`;
        break;
      case 1:
        currentTime.textContent = `${e.weekly.current}hrs`;
        lastTime.textContent = `Last Week - ${e.weekly.previous}hrs`;
        break;
      case 2:
        currentTime.textContent = `${e.monthly.current}hrs`;
        lastTime.textContent = `Last Month - ${e.monthly.previous}hrs`;
        break;
    }

    timeContainer.append(currentTime, lastTime);
  });
}
