import { profile } from "@/data/profile";

// Cached so the page can still be prerendered under Cache Components.
async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export function Footer() {
  const links = [
    ["GitHub", profile.socials.github],
    ["LinkedIn", profile.socials.linkedin],
    ["X", profile.socials.x],
  ].filter(([, href]) => href); // hidden until the URLs are filled in

  return (
    <footer className="site-wrap flex flex-wrap justify-between gap-2.5 border-t border-line pt-7 pb-10 label text-muted">
      <span>
        © <CopyrightYear /> {profile.name}
      </span>
      <div className="flex gap-[18px]">
        {links.map(([label, href]) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text"
          >
            {label}
          </a>
        ))}
        <a href={profile.cv} download className="hover:text-text">
          CV ↓
        </a>
      </div>
    </footer>
  );
}
