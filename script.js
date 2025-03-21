 <script>
      let container = document.querySelector(".game-container");
      let boxes = document.querySelectorAll(".box");
      let game = document.querySelector(".game");
      let msg = document.querySelector(".msg");
      let newGameBtn = document.querySelector(".newGame");
      let resetGameBtn = document.querySelector(".resetgame");
      let turnO = true;
      const loadingMessages = [
        "Initializing game...",
        "Loading assets...",
        "Setting up environment...",
        "Finalizing setup...",
        "Ready to play!",
      ];
      let progressBar = document.getElementById("progressBar");
      let loadingMessage = document.getElementById("loadingMessage");
      let loaderContainer = document.getElementById("gameLoader");
      let progress = 0;
      let index = 0;

      function updateLoader() {
        if (index < loadingMessages.length) {
          progress += 100 / loadingMessages.length;
          progressBar.style.width = progress + "%";
          loadingMessage.innerText = loadingMessages[index];
          index++;

          setTimeout(updateLoader, 800);
        } else {
          setTimeout(() => {
            loaderContainer.classList.add("hide-loader"); // Fade out animation
            setTimeout(() => (loaderContainer.style.display = "none"), 500); // Remove from view
          }, 1000);
        }
      }

      function startGameLoader() {
        loaderContainer.classList.remove("hide-loader");
        loaderContainer.style.display = "flex"; // Show loader
        progress = 0;
        index = 0;
        progressBar.style.width = "0%";
        updateLoader();
      }

      startGameLoader();

      let winpatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      const reset = () => {
        turnO = true;
        enableboxes();
        msg.classList.add("hide");
        msg.innerText = "";
      };

      function reloadPage() {
        location.reload();
      }

      boxes.forEach((box) => {
        box.addEventListener("click", () => {
          if (turnO) {
            box.innerText = "X";
            box.style.color = "#fff";
            turnO = false;
          } else {
            box.innerText = "O";
            box.style.color = "#F00";
            turnO = true;
          }

          box.disabled = true;

          checkWinner();
        });
      });

      const checkWinner = () => {
        for (let pattern of winpatterns) {
          let pos1Val = boxes[pattern[0]].innerText;
          let pos2Val = boxes[pattern[1]].innerText;
          let pos3Val = boxes[pattern[2]].innerText;

          if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return; // Stop further checking if a winner is found
          }
        }
        checkDraw(); // Check for a draw if no winner is found
      };

      const checkDraw = () => {
        let isDraw = [...boxes].every((box) => box.innerText !== "");
        if (isDraw) {
          msg.innerText = "It's a Draw!";
          msg.classList.remove("hide");
        }
      };

      const showWinner = (winner) => {
        msg.innerText = "Congratulations! The Winner is " + winner;
        msg.classList.remove("hide");
        disableboxes();
      };

      const disableboxes = () => {
        boxes.forEach((box) => (box.disabled = true));
      };

      const enableboxes = () => {
        boxes.forEach((box) => {
          box.disabled = false;
          box.innerText = "";
        });
      };

      resetGameBtn.addEventListener("click", reset);

      

      if ("WebSocket" in window) {
        (function () {
          function refreshCSS() {
            var sheets = [].slice.call(document.getElementsByTagName("link"));
            var head = document.getElementsByTagName("head")[0];
            for (var i = 0; i < sheets.length; ++i) {
              var elem = sheets[i];
              var parent = elem.parentElement || head;
              parent.removeChild(elem);
              var rel = elem.rel;
              if (
                (elem.href && typeof rel != "string") ||
                rel.length == 0 ||
                rel.toLowerCase() == "stylesheet"
              ) {
                var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, "");
                elem.href =
                  url +
                  (url.indexOf("?") >= 0 ? "&" : "?") +
                  "_cacheOverride=" +
                  new Date().valueOf();
              }
              parent.appendChild(elem);
            }
          }
          var protocol =
            window.location.protocol === "http:" ? "ws://" : "wss://";
          var address =
            protocol + window.location.host + window.location.pathname + "/ws";
          var socket = new WebSocket(address);
          socket.onmessage = function (msg) {
            if (msg.data == "reload") window.location.reload();
            else if (msg.data == "refreshcss") refreshCSS();
          };
          if (
            sessionStorage &&
            !sessionStorage.getItem("IsThisFirstTime_Log_From_LiveServer")
          ) {
            console.log("Live reload enabled.");
            sessionStorage.setItem("IsThisFirstTime_Log_From_LiveServer", true);
          }
        })();
      } else {
        console.error(
          "Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading."
        );
      }

      function toggleDropdown() {
        document.getElementById("dropdownContent").style.display =
          document.getElementById("dropdownContent").style.display === "block"
            ? "none"
            : "block";
      }

      function showInstructions() {
        alert(
          "click on an empty cell in the grid to place your marker (X or O), aiming to get three of your markers in a row—horizontally, vertically, or diagonally—before your opponent does!"
        );
      }

      function showAboutGame() {
        alert(
          "Tic-Tac-Toe is a classic two-player game where players take turns marking a 3x3 grid with their respective symbols (X or O). The goal is to be the first to form a line of three markers—either horizontally, vertically, or diagonally—while blocking your opponent from doing the same. It's simple to learn, making it a great game for all ages!"
        );
      }

      function showAboutDevelopers() {
        alert(
          "Hi, I'm Saurab Singh Rawat, an intermediate Frontend Web Developer with experience in HTML, CSS, and JavaScript. Passionate about learning new technologies, I thrive on solving problems, adapting to challenges, and continuously improving my skills. Excited to contribute to innovative projects and collaborate with like-minded professionals."
        );
      }
    </script>