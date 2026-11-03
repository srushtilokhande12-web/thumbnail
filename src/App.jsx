import { thumbnails } from "./data/clients.js";

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
          ▶ Open Reel
        </a>
        <p className="hint">Open the reel, then update its cover with the downloaded thumbnail.</p>
      </div>
    </article>
  );
}

export default function App() {
  return (
    <div className="page">
      <header className="topbar">
        <h1>Your Thumbnails</h1>
      </header>

      {thumbnails.length === 0 ? (
        <p className="muted">No thumbnails delivered yet.</p>
      ) : (
        <main className="grid">
          {thumbnails.map((t) => (
            <Card key={t.id} item={t} />
          ))}
        </main>
      )}
    </div>
  );
}
