import './globals.css';
export default function Header() {
    return (
        <header className="navbar">
        <div className="navbar-left">
          <a href="/" className="logo" title="Blooming Wiki">Blooming Wiki</a>
        </div>
        <div className="navbar-right">
          <a href="#" title="내 정보">👤</a>
        </div>
      </header>
    );
  }
  