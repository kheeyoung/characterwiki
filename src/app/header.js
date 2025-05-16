import './globals.css';
export default function Header() {
    return (
      <header className="navbar">
        <div className="navbar-left">
        <a href="/" className="logo" title="Blooming Wiki" style={{ textDecoration: 'none' }}>Blooming Wiki</a>
        </div>
        <div className="navbar-right">
        <a href="/login" title="로그인" style={{ textDecoration: 'none' }}>👤</a>
        </div>
      </header>
    );
  }
  