import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(props){
  return <React.Fragment>
    <div
      className='NavHeader'
    >
      {
        props.items.map(item => 
          <Link
            className="NavTab"
            key={item.link}
            id={
              props.tab === item.link
              // item.link==="amigos"
              ? "selected" : ""
            }
            to={`../${item.link}`}
          >
            {item.text}
          </Link>
        )
      }
    </div>
  </React.Fragment>
}