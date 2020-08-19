import React from "react";
import { useSelector } from "react-redux";
import UnAuthenticatedNavigation from "../../components/Navigation/unAuthenticatedNavigation";
import AuthenticatedNavigation from "../../components/Navigation/authenticatedNavigation";

const Header = () => {
  const { authenticated } = useSelector(state => state);
  return (
    <header>
      <h1>Health tracker</h1>
      {authenticated ? (
        <AuthenticatedNavigation />
      ) : (
        <UnAuthenticatedNavigation />
      )}
    </header>
  );
};

export default Header;
