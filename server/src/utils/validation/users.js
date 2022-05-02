const validateUser = (username) => {
  if (!username) {
    return false;
  }

  return true;
};

module.exports = { validateUser };
