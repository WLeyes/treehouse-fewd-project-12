console.log("Connected to app.js");

// Data Controller
const DataCtrl = (() => {
  // User Constructor
  const User = (id, firstName, lastName, image, email) => {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.image = image;
  };

  // Data Fetch API
  function fetchUserJSON(url, numberOfUsers) {
    fetch(`${url}?results=${parseInt(numberOfUsers)}`)
      .then(response => response.json())
      .then(data => UICtrl.recentActivity(data))
      .catch(error => console.log(error));
  }

  // public
  return {
    getRandomUser: () => {
      fetchUserJSON("https://randomuser.me/api/", 12);
    }
  };
})();

// UI Controller
const UICtrl = (() => {
  messageArray = [];
  const UISelectors = {
    recentActivity: "#recent-activity",
    cards: ".cards"
  };
  return {
    recentActivity: data => {
      console.log(data);
      let array = [];
      for (let i = 0; i < data.results.length; i++) {
        let firstName = data.results[i].name.first;
        let lastName = data.results[i].name.last;
        let image = data.results[i].picture.medium;
        let email = data.results[i].email;
        let username = `
        <div class="reviews">
          <img src ="${image}" alt="${firstName} ${lastName}'s profile picture" class="img--profile"></img>
          <p>${firstName} ${lastName}</p>
          <p>${randomReview()}</p>
        </div>        
        `;
        let reviewer = document.querySelector(UISelectors.recentActivity);
        reviewer.innerHTML += username;

        for (let i = 1; i < 5; i++) {
          array.push(
            `${data.results[i].name.first} ${data.results[i].name.last}`
          );
        }
      }
    },
    cards: () => {
      for (let i = 0; i < project.length; i++) {
        let title = project[i].title;
        let image = project[i].image;
        let alt = project[i].alt;
        let description = project[i].description;
        let player_id = project[i].player_ID;
        let video_title = project[i].video_title;
        let video_mp4 = project[i].video_MP4;
        let video_ogg = project[i].video_OGG;
        let skills = project[i].skills;
        let repository = project[i].repository;
        let preview = project[i].preview;
        let card = `
        <div class="card grid__col--12">
        <div class="card--front">
          <h3>${title}</h3>
          <img src="${image}" alt="${alt}">
          <h3>Summary:</h3>
          <p>${description}</p>
        </div>
        <div class="card--back">
          <video controls id="player${player_id}" class="player" title="${video_title}">
            <source src="${video_mp4}" type="video/mp4">
            <source src="${video_ogg}" type="video/ogg">
            <!-- Flash fallback -->
            <object type="application/x-shockwave-flash" data="flash-player.swf?videoUrl=${video_mp4}">
              <param name="movie" value="flash-player.swf?videoUrl=${video_mp4}" />
              <param name="allowfullscreen" value="true" />
              <param name="wmode" value="transparent" />
              <param name="flashvars" value="controlbar=over&amp;image=img/Team-Treehouse-Review.jpg&amp;file=flash-player.swf?videoUrl=videoUrl=${video_mp4}"
              />
              <p>"No video playback possible, please download the video from the link below"</p>
            </object>
            <!-- Offer download -->
            <a href="${video_mp4}">Download MP4</a>
          </video>
          <div grid__row>
            <p class="skills">Skills used: ${skills}</p>
          </div>
          <div class="btn--group grid__row">
            <a href="${repository}" target="_blank" class="btn--default theme__colors">
              <img src="img/github.svg" alt="Code svg" class="icons--github">view code
            </a>
            <a href="${preview}" target="_blank" class="btn--info theme__colors">
              <img src="img/eye.svg" alt="Code svg" class="icons--preview">preview
            </a>
          </div>
        </div>
      </div>
        `;
        let cardElement = document.querySelector(UISelectors.cards);
        console.log(cardElement);
        cardElement.innerHTML += card;
      }
    },
    getSelectors: () => UISelectors
  };
})();

// App Controller
const App = ((UICtrl, DataCtrl, ChartCtrl) => {
  // Get UI selectors
  const UISelectors = UICtrl.getSelectors();

  const loadEventListeners = () => { };
  return {
    init: () => {
      console.log("Initializing App ...");
      DataCtrl.getRandomUser();
      UICtrl.cards();
      // console.log(project[0]); // Test that projects are being imported
      console.log(` Number of projects: ${project.length}`);

      loadEventListeners();
    }
  };
})(UICtrl, DataCtrl);

// Initialize App
App.init();
