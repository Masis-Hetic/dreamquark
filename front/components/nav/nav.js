import React    from 'react';
import Link     from 'next/link';
import NavLinks from "./nav.styles";

const links = [
  { href: '/', as: '/', label: 'List of Users' },
  { href: '/new-user', as: '/new-user', label: 'Add new user' },
  { href: '/new-organization', as: '/new-organization', label: 'Add organization' },
  { href: '/new-team', as: '/new-team', label: 'Add team' },
  { href: '/teams', as: '/teams', label: 'Teams' },
  { href: '/organizations', as: '/organizations', label: 'Organizations' }
].map( link => {
  link.key = `nav-link-${ link.href }-${ link.label }`;
  return link;
} );


const Nav = props => {
  return (
    <NavLinks>
      <NavLinks.Ul>
        { links.map( ( { key, href, label } ) => (
          <NavLinks.Li key={ key } path={props.path === href}>
            <Link href={ href }>
              <NavLinks.A>{ label }</NavLinks.A>
            </Link>
          </NavLinks.Li>
        ) ) }
      </NavLinks.Ul>
    </NavLinks>
  )
};

export default Nav;
