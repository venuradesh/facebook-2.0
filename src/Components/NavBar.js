import React from "react";
import SideBarItem from "./SideBarItem";
import styled from "styled-components";

function NavBar() {
  return (
    <Container>
      <SideBarItem src="/images/friends.png" openthis="open" />
      <SideBarItem src="/images/group-icon.png" openthis="open" />
      <SideBarItem src="/images/fb-watch.png" openthis="" />
      <SideBarItem src="/images/memories.png" openthis="" />
      <SideBarItem src="/images/saved.png" openthis="open" />
      <SideBarItem src="/images/event.png" openthis="" />
      <div className="last-item">
        <SideBarItem src="/images/plus.png" openthis="" />
      </div>
    </Container>
  );
}

export default NavBar;

const Container = styled.div`
  --nav-width: 60px;

  position: fixed;
  top: var(--nav-width);
  height: calc(100vh - var(--nav-width));
  width: var(--nav-width);
  background-color: var(--white);
  box-shadow: 3px 0 6px 0 lightgray;
  z-index: 9;
  padding-top: var(--nav-width);
  display: flex;
  flex-direction: column;

  .last-item {
    flex: 1;
    display: flex;
    align-items: flex-end;
  }
`;
