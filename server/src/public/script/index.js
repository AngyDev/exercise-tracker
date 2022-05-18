// File not used - important to remember how to set and use js file with ejs

const userId = document.getElementById("userId");
const btnExercise = document.getElementById("btnExercise");

btnExercise &&
  btnExercise.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(userId.innerHTML);
    if (userId.innerHTML !== undefined) {
      fetch(`http://localhost:3000/api/users/${userId.innerHTML}/logs`)
        .then((response) => {
          console.log("response");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
