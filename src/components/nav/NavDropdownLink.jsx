import React from 'react';
import { Link } from 'gatsby';
import { active } from './NavDropdownLink.module.css';

const NavDropdownLink = ({ to, pageNickname, currentPageName }) => {
	let className = (currentPageName === pageNickname ? active + ' dropdown-item' : 'dropdown-item');
	return (
		<Link data-rr-ui-dropdown-item className={className} to={to}>{pageNickname}</Link>
	)
}

export default NavDropdownLink;