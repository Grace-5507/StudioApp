import React from 'react'
import Photo from '../../assets/lady.jpg';
import './Header.css';

function Header() {
  return (
    <div className='head'>
        <div>
            <h3>Breeze Studio</h3>
        </div>
        <div className='row'>
            <div className='profile-img col'>
                <img src={Photo} />
            </div>
            <div className='user col'>
                <h5>Lona Grace</h5>
                <span></span>
            </div>

        </div>

    </div>
  )
}

export default Header