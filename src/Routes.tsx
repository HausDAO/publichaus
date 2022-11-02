import { Link } from '@daohaus/ui';
import {
  Routes as RoutesDom,
  Route,
  Outlet,
  useLocation,
  useParams,
  useNavigate,
  matchPath,
} from 'react-router-dom';
import { DaoContainer } from './components/DaoContainer';
import { DaoScopedPage } from './pages/DaoScopedPage';

export const Routes = () => {
  return (
    <RoutesDom>
      <Route
        path="/"
        element={
          <Link href="molochv3/0x5/0x643e8e197de8760a23c64cf78bef7047084d5408">
            DAO
          </Link>
        }
      />
      <Route path="molochv3/:daochain/:daoid" element={<DaoContainer />}>
        <Route index element={<DaoScopedPage />} />
      </Route>
    </RoutesDom>
  );
};
