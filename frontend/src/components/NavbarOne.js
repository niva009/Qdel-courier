import React, { useState, startTransition } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useSelector } from 'react-redux';
import { SetSearchPopUp } from '../redux/stateSlice/clickActionSlice';
import store from '../redux/store/store';

const NavbarOne = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showList, setShowList] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    startTransition(() => {
      navigate('/');
    });
    window.location.reload();
  };

  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  const toggleList = () => {
    setShowList(!showList);
  };

  const searchPopUp = useSelector((state) => state.clickAction.searchPopUp);
  const actionSearch = () => {
    store.dispatch(SetSearchPopUp(!searchPopUp));
  };

  return (
    <>
      <header className="navbar-area">
        <nav className="navbar navbar-area-1 navbar-area navbar-expand-lg sticky-active">
          <div className="container nav-container">
            <div className="responsive-mobile-menu">
              <button
                onClick={() => setOpen(!open)}
                className={
                  open
                    ? 'menu toggle-btn d-block d-lg-none open'
                    : 'menu toggle-btn d-block d-lg-none '
                }
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon-left" />
                <span className="icon-right" />
              </button>
            </div>
            <div className="logo">
              <Link to="/">
                <img src="assets/img/logo-2.png" alt="Transpro" />
              </Link>
            </div>
            <div className="nav-left-part"></div>
            <div className="nav-right-part nav-right-part-mobile">
              <span
                className="search-bar-btn cursor-pointer ps-5"
                onClick={actionSearch}
              >
                {/* Search SVG here */}
              </span>
              <Link className="btn btn-base" to="/contact">
                Get A Quote
              </Link>
            </div>
            <div
              className={
                open
                  ? 'collapse navbar-collapse sopen'
                  : 'collapse navbar-collapse'
              }
              id="transpro_main_menu"
            >
              <ul className="navbar-nav menu-open">
                <li className="menu-item-has-children current-menu-item">
                  <Link to="#">Tracking</Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/">Home 01</Link>
                    </li>
                    <li>
                      <Link to="/home-2">Home 02</Link>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <Link to="#">Shipping</Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/shipnow">Ship Now</Link>
                    </li>
                    <li>
                      <Link to="/rate-calculator">Rate Calculator</Link>
                    </li>
                    <li>
                      <Link to="/business-courier">Business Courier</Link>
                    </li>
                    <li>
                      <Link to="/schedulepickup">Schedule & Manage Pickup</Link>
                    </li>
                    <li>
                      <Link to="/service-details">Packing Instructions</Link>
                    </li>
                    <li>
                      <Link to="/service-details">Oneday Shipping</Link>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <Link to="#">Support</Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/service">Customer Center</Link>
                    </li>
                    <li>
                      <Link to="/service-details">Delivery Issue</Link>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <Link to="#">Account</Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/deliveryregister">Join as a Delivery Partner</Link>
                    </li>
                    <li>
                      <Link to="/businessregister">Join as a business Partner</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className="nav-right-part nav-right-part-desktop">
              <div>
                <div
                  onClick={toggleList}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <span
                    style={{
                      marginLeft: '20px',
                      cursor: 'pointer',
                      color: 'black',
                    }}
                  >
                    Sign in/Login
                  </span>
                  <AccountCircleOutlinedIcon
                    sx={{
                      color: 'orange',
                      fontSize: '32px',
                      cursor: 'pointer',
                    }}
                  />
                </div>
                {showList && (
                  <div style={{ marginLeft: '20px' }}>
                    <ul
                      className="sub-menu"
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        position: 'absolute',
                        top: '100%',
                        right: '150px',
                        minWidth: '150px',
                        background: 'white',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        display: 'block',
                        borderRadius: '4px',
                        zIndex: '1000',
                      }}
                    >
                      {token == null ? (
                        <>
                          <li style={{ color: 'orange' }}>
                            <Link to="/login">Login</Link>
                          </li>
                          <li style={{ color: 'orange' }}>
                            <Link to="/register">Register</Link>
                          </li>
                        </>
                      ) : (
                        <>
                          <li
                            style={{ color: 'orange', cursor: 'pointer' }}
                            onClick={logout}
                          >
                            Log out
                          </li>
                          <li style={{ color: 'orange', cursor: 'pointer' }}>
                            <Link to="/orderhistory">Orderhistory</Link>
                          </li>
                        </>
                      )}
                      {/* Add more list items as needed */}
                    </ul>
                  </div>
                )}
              </div>

              <span
                className="search-bar-btn cursor-pointer ps-5"
                onClick={actionSearch}
              >
                {/* Search SVG here */}
              </span>
            </div>
          </div>
        </nav>
      </header>
      {/* navbar end */}
    </>
  );
};

export default NavbarOne;
