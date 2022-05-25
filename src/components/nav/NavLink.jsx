import * as React from 'react';
import { Link } from 'gatsby';
import {active} from './NavLink.module.css';

const NavLink = ({ to, pageNickname, currentPageName }) => {
	let className = (currentPageName === pageNickname ? 'nav-link active ' + active : 'nav-link');
	return (
		<Link className={className} to={to}>{pageNickname}</Link>
	)
}

export default NavLink;