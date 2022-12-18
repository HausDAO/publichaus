import { DHLayout } from '@daohaus/connect';
import { Routes as Router, Route, useLocation } from 'react-router-dom';
import { Delegates } from './pages/Delegates';
import { Application } from './pages/Application';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';

export const Routes = () => {
  const { pathname } = useLocation();
  return (
    <DHLayout
      pathname={pathname}
      navLinks={[
        { label: 'Home', href: '/' },
        { label: 'Apply', href: '/apply' },
        { label: 'Delegates', href: '/delegates' },
      ]}
    >
      <Router>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<Application />} />
        <Route path="/delegates" element={<Delegates />} />
        <Route path="/profile/:memberAddress" element={<Profile />} />
      </Router>
    </DHLayout>
  );
};
