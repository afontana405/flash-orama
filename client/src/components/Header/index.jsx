import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className=" navbar text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">Flash-orama</h1>
          </Link>
          <p className="m-0">Pass in a Flash</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn-background-link m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn-background m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn-background-link  m-2" to="/login">
                Login
              </Link>
              <Link className="btn-background-link  m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
