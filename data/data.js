let review = [
  "Warren always pushes to exceed expectations!",
  "Warren enjoys trying to find inovative solutions",
  "Warren has completed many 5 star peer reviews",
  "Warren has a great habit of validating his markup",
  "Warren enjoys helping others find solutions to their problems",
  "Warren's passion shows through his work",
  "Warren is very methodical in his work",
  "Did you know Warren is going to start the Fullstack javascript Techdegree?",
  "Warren takes great pride in his work",
  "Did I leave the stove on?"
];
let stars = `
<svg class="stars" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>
`;

// Helper functions
function randomReview() {
  let random_review = review[Math.floor(Math.random() * review.length)];
  let random_stars = stars;
  for (let i = 0; i < Math.floor(Math.random() * (5 - 2) + 2); i++) {
    random_stars += stars;
  }
  let output = `
    ${random_review}<br>
    Stars: <span class="stars"> ${random_stars} </span>`;
  return output;
}

function sendForm() {
  alert("On my live site this sends me an email.");
}