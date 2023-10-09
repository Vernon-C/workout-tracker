import { Link } from 'react-router-dom';
import { useSignout } from '../hooks/useSignout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const {signout} = useSignout();
  const {user} = useAuthContext();

  const handleClick = () => {
    signout();
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Tracker</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Sign out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/signin">Sign in</Link>
              <Link to="/signup">Sign up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
 
export default Navbar;
