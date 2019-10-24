import React from 'react';
import { Link } from 'react-router-dom';
import logo from "./logo_beige.png";

const HomePage = () => (
        <section className="home">
            <img src={logo} />
            <div className="home-nav">
                <Link to='/login'><button>Login</button></Link>
                <Link to='/signup'><button>Signup</button></Link>
            </div>
        </section>
);

export default HomePage;
