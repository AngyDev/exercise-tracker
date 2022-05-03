const validateExercise = (exercise) => {
  let message = "";

  if (!exercise.description) {
    return message = "No description is provided";
  }

  if (!exercise.duration) {
    return message = "No duration is provided";
  }

  return message;
}

module.exports = { validateExercise };