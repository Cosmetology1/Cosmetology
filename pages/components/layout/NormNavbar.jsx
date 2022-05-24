import React from "react";
import {
  Button,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  // Input,
  // List,
  Sticky,
  Grid,
  // Ref,
} from "semantic-ui-react";
import Link from "next/link";
import { logoutUser } from "../../../server/util/auth"
// import Search from "./SearchComponent";

//whole lotta semantic and a whole lotta random stuff from me
//I also used the sidebar instead of the buttons because it looks better since there are more pages.

//Dispatch from semantic. Controls the animations of the sidebar
function exampleReducer(state, action) {
  switch (action.type) {
    case "UNSHIFT":
      return { ...state, visible: false };
    case "CHANGE_ANIMATION":
      return { ...state, animation: action.animation, visible: !state.visible };
    case "CHANGE_DIRECTION":
      return { ...state, direction: action.direction, visible: false };
    default:
      throw new Error();
  }
}
import nprogress from "nprogress";
import Router from "next/router";
function NormNavbar({ stylist }) {
  Router.onRouteChangeStart = () => nprogress.start();
  Router.onRouteChangeComplete = () => nprogress.done();
  Router.onRouteChangeError = () => nprogress.done();

  // const contextRef = createRef();
  const VerticalSidebar = ({ animation, visible }) => (
    <Sidebar
      as={Menu}
      animation={animation}
      direction="left"
      icon="labeled"
      className="vertSidebar"
      vertical
      visible={visible}
      width="thin"
      style={{
        backgroundColor: "white",
        boxShadow: "0px 0.5px 2px 1px gray",
      }}
    >
      <Link href="/index">
        <Menu.Item
          style={{
            color: "black",
            cursor: "pointer",
          }}
        >
          <Icon
            name="home"
            color="black"
            style={{
              color: "black",
            }}
          />
          Home
        </Menu.Item>
      </Link>
      <Link href={`/${stylist.userId}`}>
        <Menu.Item
          style={{
            color: "black",
          }}
        >
          <Icon name="user circle" color="black" />
          Profile
        </Menu.Item>
      </Link>

      {stylist.isTeacher === "true" ? (
        <></>
      ) : (
        <>
          <Link href="/clientCreator">
            <Menu.Item
              style={{
                color: "black",
              }}
            >
              <Icon name="add user" color="black" />
              New Visit
            </Menu.Item>
          </Link>
        </>
      )}

      <Link href="/List">
        <Menu.Item
          style={{
            color: "black",
          }}
        >
          <Icon name="list ul" color="black" />
          List
        </Menu.Item>
      </Link>

      <Menu.Item
        style={{
          color: "red",
        }}
        onClick={() => logoutUser(stylist.email)}
      >
        <Icon name="sign-out" color="red" />
        Sign Out
      </Menu.Item>
    </Sidebar>
  );

  let hamDog = false;
  const [state, dispatch] = React.useReducer(exampleReducer, {
    animation: "overlay",
    direction: "left",
    visible: false,
    email: stylist.email,
  });

  const { animation, direction, visible } = state;
  const segmentRef = React.useRef();

  return (
    <>
    <div style={{ backgroundColor: "white" }}>
      <VerticalSidebar
        animation={animation}
        direction={direction}
        visible={visible}
        target={segmentRef}
      />
      <Sidebar.Pusher
        style={{ boxShadow: "0px 0.5px 2px 1px gray" }}
        innerref={segmentRef}
        fixed="top"
      >
        <Menu
          stackable
          secondary
          style={{ maxHeight: "80px", overflow: "hidden" }}
        >
          <Menu.Item name="features">
            {hamDog ? (
              <Icon
                name="bars"
                rotated="clockwise"
                onClick={() => {
                  hamDog = !hamDog;
                  dispatch({
                    type: "CHANGE_ANIMATION",
                    animation: "push",
                  });
                }}
                size="big"
              />
            ) : (
              <Icon
                name="bars"
                onClick={() => {
                  hamDog = !hamDog;
                  dispatch({
                    type: "CHANGE_ANIMATION",
                    animation: "push",
                  });
                }}
                size="big"
              />
            )}
          </Menu.Item>
          <Menu.Item style={{ cursor: "pointer" }}>
            <Link href="/">
              <Image
              alt="description of image"
                size="small"
                src="https://i.postimg.cc/RFDtVvtb/cosmetology-Logo.png"
                onClick={() => {
                  hamDog = false;
                  dispatch({
                    type: "UNSHIFT",
                  });
                }}
              />
            </Link>
          </Menu.Item>
          <Menu.Item name="testimonials" style={{ width: "12rem" }}>
            <h3
              onClick={() => {
                hamDog = false;
                dispatch({
                  type: "UNSHIFT",
                });
              }}
            >
              {`Welcome, ${stylist.firstName}. `}
            </h3>
          </Menu.Item>

          <Menu.Item
        name="testimonials"
        // style={{ width: "30%" }}
        position="right"
        className="scrollContainer"
      >
        <Grid.Column floated="left" width={4}>
          <Sticky>
            <Segment basic>
              {/* <Search /> */}
            </Segment>
          </Sticky>
        </Grid.Column>
      </Menu.Item>

          <Menu.Item name="sign-in" position="right">
            <Button
              style={{ backgroundColor: "red", color: "white" }}
              as="a"
              href="/login"
              onClick={() => logoutUser(stylist.email)}
            >
              Sign Out
            </Button>
          </Menu.Item>
        </Menu>
      </Sidebar.Pusher>
      
     
    </div>
    
    </>
  );
}

export default NormNavbar;
