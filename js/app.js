console.log("Connected to app.js");

// Data Controller
const DataCtrl = (() => {
  // User Constructor
  const User = (id, firstName, lastName, image, email) => {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.image = image;
    this.email = email;
  };

  // Data Fetch API
  let users = [];
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
    recentActivity: "#recent-activity"
  };

  return {
    recentActivity: data => {
      let array = [];
      for (let i = 1; i < data.results.length; i++) {
        let firstName = data.results[i].name.first;
        let lastName = data.results[i].name.last;
        let image = data.results[i].picture.medium;
        let email = data.results[i].email;
        let username = `
        <div class="reviews grid__row">
          <div>
            <img src ="${image}" alt="${firstName} ${lastName}'s profile picture" class="img--profile"></img>
            <p>${firstName} ${lastName}</p>
            <p>${randomReview()}</p>
          </div>
        </div>        
        
        `;
        let reviewer = document.querySelector(UISelectors.recentActivity);
        let output = document.createElement("div");
        output.innerHTML = username;
        reviewer.appendChild(output);
        reviewer.className = "grid__col--6";

        for (let i = 1; i < 5; i++) {
          array.push(
            `${data.results[i].name.first} ${data.results[i].name.last}`
          );
        }
      }
    },
    getSelectors: () => UISelectors
  };
})();

// App Controller
const App = ((UICtrl, DataCtrl, ChartCtrl) => {
  // Get UI selectors
  const UISelectors = UICtrl.getSelectors();

  const loadEventListeners = () => {};
  return {
    init: () => {
      console.log("Initializing App ...");
      DataCtrl.getRandomUser();
      loadEventListeners();
    }
  };
})(UICtrl, DataCtrl);

// Initialize App
App.init();
