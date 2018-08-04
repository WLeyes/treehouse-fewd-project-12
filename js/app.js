console.log("Connected to app.js");

// Data Controller
const DataCtrl = (() => {

  // Fetch treehouse API
  function fetchTreehouseProfile(profile) {
    fetch(`https://teamtreehouse.com/${profile}.json`)
      .then(response => response.json())
      .then(data => UICtrl.doughnut(data))
      .catch(error => console.log(error));
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
    },
    getTreehouseProfile: () => {
      fetchTreehouseProfile('warrenleyes');
    }
  };
})();

// UI Controller
const UICtrl = (() => {
  messageArray = [];
  const UISelectors = {
    recentActivity: "#recent-activity",
    cards: ".cards",
    alert: ".messages",
    skills: "charts--doughnut"
  };
  return {
    alert: () => {
      setTimeout(() => {
        let output = document.querySelector(UISelectors.alert);
        output.style.display = 'block';
        output.innerHTML = `<p class="btn--error theme__colors">Status: Available for hire | freelance <i class="fal fa-times-octagon"></i></p>`;
      }, 5000);
    },
    recentActivity: data => {
      console.log(data);
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
          <video controls  preload = "none" id="player${player_id}" class="player" title="${video_title}">
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
            <a href="${repository}" target="_blank" class="btn--default theme__colors"><i class="fab fa-github"></i> View Code</a>
            <a href="${preview}" target="_blank" class="btn--info theme__colors"><i class="fal fa-browser"></i> Preview </a>
          </div>
        </div>
      </div>
        `;
        let cardElement = document.querySelector(UISelectors.cards);
        cardElement.innerHTML += card;
      }
    },
    doughnut: (data) => {
      console.log(`Name: ${data.name}`);
      console.log(`HTML: ${data.points.HTML}`);
      console.log(`CSS: ${data.points.CSS}`);
      console.log(`JavaScript: ${data.points.JavaScript}`);
      console.log(`Development Tools: ${data.points['Development Tools']}`);
      console.log(`Total Points: ${data.points.total}`);

      let ctx = document.getElementById(UISelectors.skills).getContext('2d');
      let myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ["HTML", "CSS", "JavaScript", "Development Tools"],
          datasets: [{
            label: "Treehouse Points - top categories",
            data: [data.points.HTML, data.points.CSS, data.points.JavaScript, data.points['Development Tools']],
            backgroundColor: ["rgba(129, 201, 143, 1)", "rgba(116, 177, 191, 1)", "rgba(115, 119, 191, 1)"]
          }]
        },
        options: {
          legend: { display: true, position: 'top' }
        }
      })
    },
    getSelectors: () => UISelectors
  };
})();

// App Controller
const App = ((UICtrl, DataCtrl, ChartCtrl) => {
  // Get UI selectors
  const UISelectors = UICtrl.getSelectors();

  const loadEventListeners = () => {
    document.querySelector(UISelectors.alert).addEventListener("click", () => {
      document.querySelector(UISelectors.alert).style.display = "none";
    });
  };
  return {
    init: () => {
      console.log("Initializing App ...");
      DataCtrl.getRandomUser();
      DataCtrl.getTreehouseProfile();
      UICtrl.cards();
      UICtrl.alert();
      console.log(` Number of projects: ${project.length}`);
      loadEventListeners();
    }
  };
})(UICtrl, DataCtrl);

// Initialize App
App.init();
