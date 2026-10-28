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
  url?: string;
};

// Add a server here when its details are ready. Leave url out until a link is available.
const servers: Server[] = [
  { number: '01', game: 'MINECRAFT', name: 'Minecraft', description: 'Build something great, explore new worlds, and make yourself at home.', image: minecraftImage, category: 'SANDBOX', relationship: 'FUN FACTORY GAMES' },
  { number: '02', game: '7 DAYS TO DIE', name: '7 Days to Die', description: 'Scavenge, build, and survive. The next adventure is just around the corner.', image: sevenDaysImage, category: 'SURVIVAL', relationship: 'FUN FACTORY GAMES' },
  { number: '03', game: 'FIVEM', name: 'Project Yellow', description: 'Find your story and make your mark in the world of FiveM roleplay.', image: projectYellowImage, category: 'ROLEPLAY', relationship: 'AFFILIATE', url: 'https://projectyellowrp.com' },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>;
}

function Brand() {
  return <a className="brand" href="#top" aria-label="Fun Factory Games home"><span className="brand-mark"><span>F</span><span>F</span><i /></span><span className="brand-name">FUN FACTORY<span>GAMES</span></span></a>;
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
      <div className="card-meta"><span className={server.url ? 'status-dot active' : 'status-dot'} />{server.url ? 'EXPLORE THE SERVER' : 'SERVER DETAILS COMING SOON'}<span className="relation">{server.relationship}</span></div>
      <h3>{server.name}</h3>
      <p>{server.description}</p>
      {server.url ? <a className="card-link" href={server.url} target="_blank" rel="noopener noreferrer">Visit Project Yellow <Arrow diagonal /><span className="sr-only"> (opens in a new tab)</span></a> : <span className="card-link unavailable">Server link coming soon <span aria-hidden="true">↗</span></span>}
    </div>
  </article>;
}

export default function App() {
  return <div id="top" className="site">
    <a className="skip-link" href="#servers">Skip to servers</a>
    <header className="header"><div className="nav-inner"><Brand /><nav aria-label="Main navigation"><a className="nav-link" href="#servers">Our servers</a><a className="nav-link" href="#about">About</a><a className="nav-button" href="#servers">Find your server <Arrow diagonal /></a></nav></div></header>
    <main>
      <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-overlay" />
        <div className="hero-content wrap"><div className="eyebrow"><span className="purple-dot" /> YOUR NEXT ADVENTURE STARTS HERE</div><h1>Good games.<br />Even better <em>company.</em></h1><p>Find your next favorite place to play. Discover game servers hosted by Fun Factory Games and friends.</p><div className="hero-actions"><a className="primary-button" href="#servers">Explore servers <Arrow /></a><a className="text-button" href="#about">Get to know us <span>↓</span></a></div></div>
        <div className="hero-bottom wrap"><span><span className="tiny-square" /> A COMMUNITY FOR EVERY KIND OF PLAYER</span><span>SCROLL TO EXPLORE <span className="scroll-arrow">↓</span></span></div>
      </section>
      <section className="servers-section" id="servers"><div className="wrap"><div className="section-heading"><div><div className="eyebrow"><span className="purple-dot" /> FIND YOUR WORLD</div><h2>Pick a server.<br /><span>Make it yours.</span></h2></div><p>Different worlds, same love of the game.<br />Find your next place to play below.</p></div><div className="cards">{servers.map(server => <ServerCard key={server.name} server={server} />)}</div><div className="more-note"><span className="plus">+</span><div><strong>More worlds on the way.</strong><span>We're making room for more adventures. Check back for new additions.</span></div><span className="more-index">THE FUN IS JUST GETTING STARTED <Arrow /></span></div></div></section>
      <section className="about-section" id="about"><div className="wrap about-inner"><div><div className="eyebrow"><span className="purple-dot" /> ABOUT THE FACTORY</div><h2>Made for the<br /><span>moments in between.</span></h2></div><div className="about-copy"><p>It's not just about the game. It's about the people you meet, the stories you make, and the good times along the way.</p><p>Fun Factory Games brings together places to play and communities worth discovering. So pick a world, jump in, and make some memories.</p><a href="#servers">Find your next adventure <Arrow /></a></div></div></section>
    </main>
    <footer><div className="wrap footer-inner"><Brand /><p>GOOD GAMES. GOOD PEOPLE. GOOD TIMES.</p><a href="#top">Back to top ↑</a></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} FUN FACTORY GAMES</span><span>BUILT FOR THE LOVE OF PLAY.</span></div></footer>
  </div>;
}
