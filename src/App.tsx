import { useEffect } from 'react';
import heroImage from './assets/server-worlds.jpg';
import minecraftImage from './assets/minecraft.jpg';
import sevenDaysImage from './assets/seven-days.jpg';
import projectYellowImage from './assets/project-yellow-banner.webp';

type Server = {
  number: string;
  game: string;
  name: string;
  description: string;
  image: string;
  category: string;
  relationship: string;
  url: string;
  external?: boolean;
};

// Add more servers here as their pages or links become available.
const servers: Server[] = [
  { number: '01', game: 'MINECRAFT', name: 'Minecraft', description: 'Build something great, explore new worlds, and make yourself at home.', image: minecraftImage, category: 'SANDBOX', relationship: 'FUN FACTORY GAMES', url: './minecraft/' },
  { number: '02', game: '7 DAYS TO DIE', name: '7 Days to Die', description: 'Scavenge, build, and survive. The next adventure is just around the corner.', image: sevenDaysImage, category: 'SURVIVAL', relationship: 'FUN FACTORY GAMES', url: './seven-days-to-die/' },
  { number: '03', game: 'FIVEM', name: 'Project Yellow', description: 'Find your story and make your mark in the world of FiveM roleplay.', image: projectYellowImage, category: 'ROLEPLAY', relationship: 'AFFILIATE', url: 'https://projectyellowrp.com', external: true },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>;
}

function Brand({ home = false }: { home?: boolean }) {
  return <a className="brand" href={home ? '../' : '#top'} aria-label="Fun Factory Games home"><span className="brand-mark"><span>F</span><span>F</span><i /></span><span className="brand-name">FUN FACTORY<span>GAMES</span></span></a>;
}

function ServerCard({ server }: { server: Server }) {
  return <article className="server-card">
    <div className="card-image" style={{ backgroundImage: `url(${server.image})` }}>
      <div className="card-image-shade" />
      <span className="card-number">{server.number} / 03</span>
      <span className="game-label">{server.game}</span>
      <span className="category">{server.category}</span>
    </div>
    <div className="card-body">
      <div className="card-meta"><span className={server.external ? 'status-dot active' : 'status-dot'} />{server.external ? 'EXPLORE THE SERVER' : 'CONNECTION DETAILS COMING SOON'}<span className="relation">{server.relationship}</span></div>
      <h3>{server.name}</h3>
      <p>{server.description}</p>
      <a className="card-link" href={server.url} target={server.external ? '_blank' : undefined} rel={server.external ? 'noopener noreferrer' : undefined}>{server.external ? 'Visit Project Yellow' : 'Explore server'} <Arrow diagonal />{server.external && <span className="sr-only"> (opens in a new tab)</span>}</a>
    </div>
  </article>;
}

function LandingPage() {
  return <div id="top" className="site">
    <a className="skip-link" href="#servers">Skip to servers</a>
    <header className="header"><div className="nav-inner"><Brand /><nav aria-label="Main navigation"><a className="nav-link" href="#servers">Our servers</a><a className="nav-link" href="#about">About</a><a className="nav-link" href="https://discord.gg/tjA493DzNp" target="_blank" rel="noopener noreferrer">Discord ↗<span className="sr-only"> (opens in a new tab)</span></a><a className="nav-button" href="#servers">Find your server <Arrow diagonal /></a></nav></div></header>
    <main>
      <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-overlay" />
        <div className="hero-content wrap"><div className="eyebrow"><span className="purple-dot" /> YOUR NEXT ADVENTURE STARTS HERE</div><h1>Good games.<br />Even better <em>company.</em></h1><p>Find your next favorite place to play. Discover game servers hosted by Fun Factory Games and friends.</p><div className="hero-actions"><a className="primary-button" href="#servers">Explore servers <Arrow /></a><a className="text-button" href="https://discord.gg/tjA493DzNp" target="_blank" rel="noopener noreferrer">Join our Discord <span>↗</span><span className="sr-only"> (opens in a new tab)</span></a></div></div>
        <div className="hero-bottom wrap"><span><span className="tiny-square" /> A COMMUNITY FOR EVERY KIND OF PLAYER</span><span>SCROLL TO EXPLORE <span className="scroll-arrow">↓</span></span></div>
      </section>
      <section className="servers-section" id="servers"><div className="wrap"><div className="section-heading"><div><div className="eyebrow"><span className="purple-dot" /> FIND YOUR WORLD</div><h2>Pick a server.<br /><span>Make it yours.</span></h2></div><p>Different worlds, same love of the game.<br />Find your next place to play below.</p></div><div className="cards">{servers.map(server => <ServerCard key={server.name} server={server} />)}</div><div className="more-note"><span className="plus">+</span><div><strong>More worlds on the way.</strong><span>We're making room for more adventures. Check back for new additions.</span></div><span className="more-index">THE FUN IS JUST GETTING STARTED <Arrow /></span></div></div></section>
      <section className="about-section" id="about"><div className="wrap about-inner"><div><div className="eyebrow"><span className="purple-dot" /> ABOUT THE FACTORY</div><h2>Made for the<br /><span>moments in between.</span></h2></div><div className="about-copy"><p>It's not just about the game. It's about the people you meet, the stories you make, and the good times along the way.</p><p>Fun Factory Games brings together places to play and communities worth discovering. So pick a world, jump in, and make some memories.</p><a href="#servers">Find your next adventure <Arrow /></a></div></div></section>
    </main>
    <footer><div className="wrap footer-inner"><Brand /><p>GOOD GAMES. GOOD PEOPLE. GOOD TIMES.</p><a href="#top">Back to top ↑</a></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} FUN FACTORY GAMES</span><span>BUILT FOR THE LOVE OF PLAY.</span></div></footer>
  </div>;
}


const details = {
  minecraft: {
    title: 'Minecraft', image: minecraftImage, label: 'SANDBOX / FUN FACTORY GAMES',
    headline: 'A world of possibilities.',
    intro: 'Build, explore, and create your own adventure in Minecraft with the Fun Factory Games community.',
    description: 'Whether you love building a home, exploring the landscape, or teaming up with friends, Minecraft is a world you can make your own.',
    steps: ['Launch Minecraft and open the multiplayer menu.', 'When the connection details are available, add the server address.', 'Join the server and start exploring.'],
    note: 'The server address, supported edition, and version will be shared here when available.',
  },
  'seven-days-to-die': {
    title: '7 Days to Die', image: sevenDaysImage, label: 'SURVIVAL / FUN FACTORY GAMES',
    headline: 'Survive another day.',
    intro: 'Scavenge, build, and face the challenges of a world overrun in 7 Days to Die.',
    description: 'Gather supplies, build your defenses, and team up with fellow survivors as you prepare for whatever comes next.',
    steps: ['Launch 7 Days to Die and open the server browser.', 'When the connection details are available, find or connect to the server.', 'Join the server and get ready to survive.'],
    note: 'The server name, address, version, and any connection requirements will be shared here when available.',
  },
} as const;

function ServerPage({ game }: { game: keyof typeof details }) {
  const server = details[game];
  useEffect(() => { document.title = `${server.title} Server — Fun Factory Games`; }, [server.title]);
  return <div id="top" className="site detail-page">
    <a className="skip-link" href="#server-info">Skip to server information</a>
    <header className="header"><div className="nav-inner"><Brand home /><nav aria-label="Main navigation"><a className="nav-link" href="../#servers">Our servers</a><a className="nav-link" href="https://discord.gg/tjA493DzNp" target="_blank" rel="noopener noreferrer">Discord ↗<span className="sr-only"> (opens in a new tab)</span></a><a className="nav-button" href="../#servers">All servers <Arrow /></a></nav></div></header>
    <main>
      <section className="detail-hero" style={{ backgroundImage: `url(${server.image})` }}><div className="detail-overlay" /><div className="wrap detail-hero-content"><a className="back-link" href="../#servers">← BACK TO ALL SERVERS</a><div className="eyebrow"><span className="purple-dot" /> {server.label}</div><h1>{server.title}</h1><p>{server.intro}</p><a className="primary-button" href="#connection">Connection info <span aria-hidden="true">↓</span></a></div></section>
      <section className="detail-content wrap" id="server-info"><div className="detail-main"><div className="eyebrow"><span className="purple-dot" /> THE ADVENTURE AWAITS</div><h2>{server.headline}</h2><p>{server.description}</p><div className="detail-divider" /><h3>How to join</h3><p>Once connection details are announced, getting started will be simple:</p><ol className="join-steps">{server.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}</ol></div>
      <aside className="connection-card" id="connection"><div className="eyebrow"><span className="purple-dot" /> SERVER CONNECTION</div><h2>Ready to jump in?</h2><p>Connection information is not available yet. Check back here for updates.</p><div className="connection-placeholder"><span>SERVER ADDRESS</span><strong>Coming soon</strong></div><p className="connection-note">{server.note}</p><a className="primary-button discord-button" href="https://discord.gg/tjA493DzNp" target="_blank" rel="noopener noreferrer">Join our Discord <Arrow diagonal /><span className="sr-only"> (opens in a new tab)</span></a><small>Connect with the community while you wait.</small></aside></section>
    </main>
    <footer><div className="wrap footer-inner"><Brand home /><p>GOOD GAMES. GOOD PEOPLE. GOOD TIMES.</p><a href="#top">Back to top ↑</a></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} FUN FACTORY GAMES</span><span>BUILT FOR THE LOVE OF PLAY.</span></div></footer>
  </div>;
}

export default function App() {
  const path = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '');
  const slug = path.split('/').pop();
  if (slug === 'minecraft' || slug === 'seven-days-to-die') return <ServerPage game={slug} />;
  return <LandingPage />;
}
