
import { useState } from "react";

export default function User({ currentUser, setCurrentUser, setAllUsers }) {
  const [mode, setMode] = useState("none");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }

  function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  function handleSignupSubmit(e) {
    e.preventDefault();
    const users = getUsers();
    if (users.find(u => u.name === name)) {
      alert("שם המשתמש כבר קיים");
      return;
    }
    const newUser = { name, password, files: [] };
    const newUsers = [...users, newUser];
    saveUsers(newUsers);
    setAllUsers(newUsers);
    setCurrentUser(name);
    setMode("none");
    alert(`נרשמת בהצלחה, ${name}!`);
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    const users = getUsers();
    const user = users.find(u => u.name === name && u.password === password);
    if (user) {
      setCurrentUser(user.name);
      setMode("none");
      alert(`ברוך הבא, ${user.name}!`);
    } else {
      alert("שם משתמש או סיסמה שגויים");
    }
  }

  function handleLogout() {
    setCurrentUser("Unknown");
  }

  return (
    <div className="userDiv">
      {currentUser !== "Unknown" ? (
        <div>
          <h4>👤 {currentUser}</h4>
          <button onClick={handleLogout}>התנתק</button>
        </div>
      ) : (
        <>
          {mode === "none" && (
            <div>
              <button onClick={() => setMode("login")}>כניסה</button>
              <button onClick={() => setMode("signup")}>הרשמה</button>
            </div>
          )}

          {mode === "signup" && (
            <form onSubmit={handleSignupSubmit}>
              <input placeholder="שם משתמש" value={name} onChange={(e) => setName(e.target.value)} />
              <input
                type="password"
                placeholder="סיסמה"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">הרשמה</button>
              <button type="button" onClick={() => setMode("none")}>ביטול</button>
            </form>
          )}

          {mode === "login" && (
            <form onSubmit={handleLoginSubmit}>
              <input placeholder="שם משתמש" value={name} onChange={(e) => setName(e.target.value)} />
              <input
                type="password"
                placeholder="סיסמה"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">כניסה</button>
              <button type="button" onClick={() => setMode("none")}>ביטול</button>
            </form>
          )}
        </>
      )}
      </div>
    );
}