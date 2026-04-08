export const login = (email, password) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.email === email && user.password === password) {
    localStorage.setItem("isAuth", true);
    return true;
  }
  return false;
};

export const signup = (email, password) => {
  localStorage.setItem("user", JSON.stringify({ email, password }));
  localStorage.setItem("isAuth", true);
};
