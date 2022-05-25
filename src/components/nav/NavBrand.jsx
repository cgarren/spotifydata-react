import * as React from 'react';
import { Link } from 'gatsby';
import { textStyle } from './NavBrand.module.css'
import "@fontsource/righteous"

const NavBrand = ({ children }) => {
	return (
		<Link className={"navbar-brand " + textStyle} to="/">{children}</Link>
	)
}

export default NavBrand;