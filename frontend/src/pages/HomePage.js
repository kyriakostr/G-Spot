import {Link} from 'react-router-dom';

const HomePage = () => {
    return ( 
       <div>
        <p>HomePage</p>
        <Link to="/Login">
        <button>
            Login
        </button>
        </Link>
        <Link to="/Signup">
        <button>
            Sign up
        </button>
        </Link>
       </div>
     );
}
 
export default HomePage;