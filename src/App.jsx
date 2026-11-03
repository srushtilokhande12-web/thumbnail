import { useState } from "react";
import { clients } from "./data/clients.js";

const SESSION_KEY = "tdp_user";

function loadSession() {
  try {
    const u = localStorage.getItem(SESSION_KEY);
    return clients.find((c) => c.username === u) || null;
  } catch {
    return null;
  }
}

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const match = clients.find(
      (c) =>
        c.username.toLowerCase() === username.trim().toLowerCase() &&
        c.password === password
    );
    if (!match) {
      setError("Invalid username or password.");
      return;
    }
    try {
      localStorage.setItem(SESSION_KEY, match.username);
    } catch {
      /* ignore */
    }
    onLogin(match);
  };

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={submit}>
        <h1>Thumbnail Portal</h1>
        <p className="muted">Sign in to access your thumbnails.</p>
        <label>
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            autoFocus
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        {error && <div className="error">{error}</div>}
        <button className="btn primary" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function downloadImage(item) {
  const ext = (item.image.split("?")[0].match(/\.(\w+)$/) || [, "jpg"])[1];
  const filename = `${slugify(item.title)}.${ext}`;
  try {
    const res = await fetch(item.image);
    if (!res.ok) throw new Error("fetch failed");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch {
    // Fallback (e.g. cross-origin image): open in a new tab
    window.open(item.image, "_blank", "noopener");
  }
}

function Card({ item }) {
  return (
    <article className="card">
      <div className="thumb">
        <img src={item.image} alt={item.title} loading="lazy" />
        <button
          className="btn download"
          onClick={() => downloadImage(item)}
          aria-label={`Download ${item.title}`}
        >
          ⬇ Download
        </button>
      </div>
      <div className="card-body">
        <h3>{item.title}</h3>
        <a
          className="btn reel"
          href={item.reelUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          ▶ Open Instagram Reel
        </a>
        <p className="hint">Open the reel, then update its cover with the downloaded thumbnail.</p>
      </div>
    </article>
  );
}

export default function App() {
  const [user, setUser] = useState(loadSession);

  const logout = () => {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
    setUser(null);
  };

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="page">
      <header className="topbar">
        <div>
          <h1>Your Thumbnails</h1>
          <p className="muted">Welcome, {user.name}</p>
        </div>
        <button className="btn ghost" onClick={logout}>
          Log out
        </button>
      </header>

      {user.thumbnails.length === 0 ? (
        <p className="muted">No thumbnails delivered yet.</p>
      ) : (
        <main className="grid">
          {user.thumbnails.map((t) => (
            <Card key={t.id} item={t} />
          ))}
        </main>
      )}
    </div>
  );
}
