import Header from './header';
import Footer from './footer';
import './style/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';




export const metadata = {
  title: 'Blooming Wiki',
  description: '블루밍 위키',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
