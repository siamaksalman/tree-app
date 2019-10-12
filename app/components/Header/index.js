import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';

function Header() {
  return (
    <div>
      <A href="https://www.reactboilerplate.com/">
        <Img src={Banner} alt="react-boilerplate - Logo" />
      </A>
      <NavBar>
        <HeaderLink to="/update">
          <FormattedMessage {...messages.update} />
        </HeaderLink>
        <HeaderLink to="/search">
          <FormattedMessage {...messages.search} />
        </HeaderLink>
      </NavBar>
    </div>
  );
}

export default Header;
