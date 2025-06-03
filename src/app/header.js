import Link from 'next/link';
export default function Header() {
    return (
      <header className="navbar">
        <div className="navbar-left">
        <Link href="/" className="logo" title="Blooming Wiki" style={{ textDecoration: 'none' }}>Blooming Wiki</Link>
        </div>
        <div className="navbar-right">
        <a href="/login" title="로그인" style={{ textDecoration: 'none' }}>👤</a>
        </div>
      </header>
    );
  }
  