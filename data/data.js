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
let stars = `<img class="star" src="img/star.svg" alt="star"/>`;
function randomReview() {
  let random_review = review[Math.floor(Math.random() * review.length)];
  let random_stars = stars;
  for (let i = 0; i < Math.floor(Math.random() * (5 - 2) + 2); i++) {
    random_stars += stars;
  }
  let output = `${random_review} "${random_stars}"`;
  return output;
}
