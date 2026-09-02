import { Outlet } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import Header from './Header';
import ServiceBar from './ServiceBar';
import Footer from './Footer';

function MainLayout() {
  return (
    <div className="app-shell">
      <AnnouncementBar />
      <Header />
      <ServiceBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
