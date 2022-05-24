import { useRouter } from "next/router";
import Link from "next/link";
import {
  Menu,
  // Container,
  // Icon,
  Image,
  Button,
  // Sidebar,
  // Segment,
  // Input,
  Message,
} from "semantic-ui-react";
import { useState } from "react";

const SignupLoginNav = () => {
  const router = useRouter();
  const isActive = (route) => router.pathname === route;
  const [visible, setVisible] = useState(false);

  //thanks peck
  const signupRoute = router.pathname === "/signup";

  return (
    <Menu
      fluid
      borderless
      pointing
      secondary
      
      // className="nav-bar navBar"
      size="large"
      style={{ backgroundColor: "white" }}
    >
      <Menu.Item style={{ cursor: "pointer" }}>
        <Link href="/">
          <Image
            size="small"
            src="https://i.postimg.cc/RFDtVvtb/cosmetology-Logo.png"
            alt="description of image"
          />
        </Link>
      </Menu.Item>
      {/*Please ask before editing other's work, three signup/login buttons are a bit excessive*/}
      {/*<Menu.Item className="navButtons">
          <Button
            href="/login"
            active={isActive("/login")}
            style={{ fontSize: "1.3rem", width: "12rem", margin:"0 auto"}}
            // inverted
            color={isActive("/login") ? "orange" : "grey"}
          >
            <Icon name="sign in" size="large" />
            Log in
          </Button>
          <Button
            href="/signup"
            active={isActive("/signup")}
            style={{
              fontSize: "1.3rem",
              marginLeft: "0.5em",
              width: "12rem",
            }}
            // inverted
            color={isActive("/signup") ? "orange" : "grey"}
          >
            <Icon name="signup" size="large" />
            Sign Up
          </Button>
        </Menu.Item>*/}
      <Menu.Item position="right" style={{textAlign: "center"}}>
        <Message
          style={{
            backgroundColor: "red",
            borderRadius: "1px solid black",
            color: "white",
            padding: "0.5rem",
            textAlign: "center",
          }}
          header={signupRoute ? "Already a user?" : "Not a user?"}
          content={
            <Button
              style={{ backgroundColor: "white", padding: "0.5rem" }}
              href={signupRoute ? "/login" : "/signup"}
              active={isActive("/login")}
              className="menuItem"
            >
              {signupRoute ? " Log in here" : " Get started here"}
            </Button>
          }
        />
      </Menu.Item>
    </Menu>
  );
};

//I didnt want to delete everything from the old navbar, so i included it here if you needed it
{
  /*import { useRouter } from "next/router";
import Link from "next/link";
import {
  Menu,
  Container,
  Icon,
  Image,
  Button,
  Sidebar,
  Segment,
  Input,
} from "semantic-ui-react";

const Temp = () => {
  const router = useRouter();
  const isActive = (route) => router.pathname === route;

  return (
    <Menu
      fluid
      borderless
      pointing
      secondary
      className="nav-bar navBar"
      size="large"
    >
      <Container>
        <Menu.Item style={{ cursor: "pointer" }}>
          <Link href="/">
            <Image
              size="small"
              src="https://i.postimg.cc/RFDtVvtb/cosmetology-Logo.png"
            />
          </Link>
        </Menu.Item>
        <Menu.Item position="left">
          <Button
            href="/login"
            active={isActive("/login")}
            style={{ fontSize: "1.3rem", width: "12rem" }}
            className="menuItem"
            inverted
            color={isActive("/login") ? "blue" : "grey"}
          >
            <Icon name="sign in" size="large" />
            Log in
          </Button>
          <Button
            href="/signup"
            active={isActive("/signup")}
            style={{
              fontSize: "1.3rem",
              marginLeft: "0.5em",
              width: "12rem",
            }}
            className="menuItem"
            inverted
            color={isActive("/signup") ? "blue" : "grey"}
          >
            <Icon name="signup" size="large" />
            Sign Up
          </Button>
        </Menu.Item>
        <Menu.Item style={{ fontSize: "1.75rem" }}>
          <p className="welcomeItem">
            Welcome student/teacher, please make an account or sign in to begin!
          </p>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Temp;
*/
}

export default SignupLoginNav;
