import React , {  useState,useEffect }from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import '../css/Navbar.css'; 
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Navbar({ currentUser, userId, userRole, handlePageRender, handleLogout }) {
  console.log('[username: ',currentUser,typeof currentUser,']', '[user id: ', userId,typeof userId,']', '[userrole: ', userRole,typeof userRole,']' );
  const { jobId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [postlimit, setPostlimit] = useState(false);
  const [postlimitError, setPostlimitError] = useState('');



  const handlePostLimit = async () => {

    try {
      const response = await axios.get(`http://localhost:8080/job/getPostEligibility/${userId}`);
      console.log(typeof response.data, response.data);
      setPostlimit(response.data);
      if (response.data) {
        
        navigate(`/${userId}/job-post-form`);
        setPostlimitError('');
      } else {

        toast.error('Upgrade your plan to make a new post', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
        console.log('else')
        setPostlimitError('Upgrade your plan to make a new job post');
      }

    } catch (error) {
      console.error('Error fetching post limit:', error);
    }
  };



  return (
    <nav className="navbar">
      
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Job Portal
        </Link>
        <ul className="nav-menu">

          <li className="nav-item">
            <Link to={`/${userId}`} className="nav-links" onClick={() => handlePageRender('home')}>
             
              Home
            </Link>
          </li>

          {userRole === 'employer' && userId && (
            <>
            <li className="nav-item">
              <Link
                to={`/posted-jobs/${userId}`}
                className="nav-links"
                onClick={() => handlePageRender('posted')}>
                Posted Jobs
              </Link>
            </li>
            <li className="nav-item">
                
                  <Link to={location.pathname} className="nav-links" onClick={handlePostLimit}>
                    Post Job
                  </Link>
                
              </li>
          </>
          )}

          {userRole === 'job seeker' && userId && (
            <li className="nav-item">
              <Link
                to={`/${userId}/appliedjobs`}
                className="nav-links"
                onClick={() => handlePageRender('applied')}>
                
                Applied Jobs
              </Link>
            </li>
          )}

          {userRole === 'admin' && userId && (
            <>
              <li className="nav-item">
                <Link to="/onboard-employers" className="nav-links" >
                  Onboard Employers
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/subscription-plans" className="nav-links" >
                  Set Subscription Plan
                </Link>
              </li>
            </>
          )}

          {userId &&  (
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          )}

          {!userId &&  (
            <li className="nav-item">
              <Link to="/login" className="nav-links">
                Login
              </Link>
            </li>
          )}

          
        </ul>
        
      </div>
      <ToastContainer/>
    </nav>
  );
}


