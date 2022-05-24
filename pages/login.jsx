import React, { useEffect, useState } from "react";
import {
  Form,
  Segment,
  Divider,
  Button,
  Message,
  Header,
} from "semantic-ui-react";
import catchErrors from "./util/catchErrors";
import axios from "axios";
import { setToken } from "../server/util/auth";
import Cookies from "js-cookie";
import Link from "next/link";

const Login = ({ history, location }) => {
  const [stylist, setStylist] = useState({
    email: "",
    password: "",
  });

  


  const { email, password } = stylist;
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  //* Handlers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStylist((prev) => ({ ...prev, [name]: value }));
    // setEmail(e.target.value)
    // setPassword(e.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  //   const body = {
  //     email,
  //     password,
  // };
  // axios({
  //     url: "/auth/login",
  //     data: body,
  //     method: "post",
  // }).then(res => {
  //     localStorage.setItem("cwcToken", res.data.token);
  //     props.history.push("/");
  // })
    setFormLoading(true);

    try {
      const res = await axios.post("/api/v1/user/login", { email, password });
      setToken(res.data);
      console.log("User Logged In");
    } catch (error) {
      console.log(`Error at handleSubmit ${error}`);
      console.log("User Login Error");

      const errorMsg = catchErrors(error);
      setErrorMsg(errorMsg);
    }

    setFormLoading(false);
  };

  //* UseEffects ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  useEffect(() => {
    setSubmitDisabled(!(email && password));
  }, [stylist]);

  useEffect(() => {
    document.title = "Welcome Back";
    const email = Cookies.get("stylistEmail");

    if (email) setStylist((prev) => ({ ...prev, email }));
  }, []);

  const divStyle = {
    overflowY: "hidden",
  };

  return (
    <>
      <Divider hidden />

      <Form
        loading={formLoading}
        error={errorMsg !== null}
        onSubmit={handleSubmit}
        style={{ margin: "0 auto" }}
        className="loginComponent"
        textAlign="center"
      >
        <Header
          as="h2"
          color="orange"
          textAlign="center"
          style={{
            textDecoration: "underline",
            textDecorationColor: "	#B8B8B8",
          }}
        >
          Log-in to your account
        </Header>
        <Message
          error
          header="Oops!"
          content={errorMsg}
          onDismiss={() => setErrorMsg(null)}
        />
        <Segment>
    
          <Form.Input
            required
            label="Email"
            placeholder="Email"
            name="email"
            value={email}
            
            onChange={handleChange}
            icon="envelope"
            iconPosition="left"
            type="email"
          ></Form.Input>
          <Form.Input
            required
            label="Password"
            placeholder="Password"
            name="password"
           
            value={password}
            onChange={handleChange}
            icon={{
              name: showPassword ? "eye slash" : "eye",
              circular: true,
              link: true,
              onClick: () => setShowPassword(!showPassword),
            }}
            iconPosition="left"
            type={showPassword ? "text" : "password"}
          />
          <Divider hidden />
          <Button
            color="orange"
            content="Login"
            icon="signup"
            type="submit"
            disabled={submitDisabled}
            className="loginButton"
          />
        </Segment>
        {/* <Link href="/ForgotPassword" ><p className="forgotPassword"> Forgot Password ?</p></Link> */}
      </Form>
    </>
  );
};

export default Login;



// import { Button, Heading, Pane, Table, TextInputField } from "evergreen-ui"
// import React, { useEffect, useState } from "react"

// import { useMongoDB } from "./providers/mongodb"
// import { useRealmApp } from "./providers/realm"

// function LogInForm(props) {
//     return (
//         <Pane alignItems="center" justifyContent="center" display="flex" paddingTop={50}>
//             <Pane width="50%" padding={16} background="purpleTint" borderRadius={3} elevation={4}>
//                 <Heading size={800} marginTop="10" marginBottom="10">
//                     Log in
//                 </Heading>
//                 <Pane>
//                     <TextInputField
//                         label="Username"
//                         required
//                         placeholder="mongodb@example.com"
//                         onChange={(e) => props.setEmail(e.target.value)}
//                         value={props.email}
//                     />
//                 </Pane>
//                 <Pane>
//                     <TextInputField
//                         label="Password"
//                         required
//                         placeholder="**********"
//                         type="password"
//                         onChange={(e) => props.setPassword(e.target.value)}
//                         value={props.password}
//                     />
//                 </Pane>
//                 <Button appearance="primary" onClick={props.handleLogIn}>
//                     Log in
//                 </Button>
//             </Pane>
//         </Pane>
//     )
// }

// function MovieList(props) {
//     return (
//         <Pane alignItems="center" justifyContent="center" display="flex" paddingTop={50}>
//             <Pane width="50%" padding={16} background="purpleTint" borderRadius={3} elevation={4}>
//                 <Table>
//                     <Table.Head>
//                         <Table.TextHeaderCell>Title</Table.TextHeaderCell>
//                         <Table.TextHeaderCell>Plot</Table.TextHeaderCell>
//                         <Table.TextHeaderCell>Rating</Table.TextHeaderCell>
//                         <Table.TextHeaderCell>Year</Table.TextHeaderCell>
//                     </Table.Head>
//                     <Table.Body height={240}>
//                         {props.movies.map((movie) => (
//                             <Table.Row key={movie._id}>
//                                 <Table.TextCell>{movie.title}</Table.TextCell>
//                                 <Table.TextCell>{movie.plot}</Table.TextCell>
//                                 <Table.TextCell>{movie.rated}</Table.TextCell>
//                                 <Table.TextCell isNumber>{movie.year}</Table.TextCell>
//                             </Table.Row>
//                         ))}
//                     </Table.Body>
//                 </Table>

//                 <Button
//                     height={50}
//                     marginRight={16}
//                     appearance="primary"
//                     intent="danger"
//                     onClick={props.logOut}
//                 >
//                     Log Out
//                 </Button>
//             </Pane>
//         </Pane>
//     )
// }

// function App() {
//     const { logIn, logOut, user } = useRealmApp()
//     const { db } = useMongoDB()
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const [movies, setMovies] = useState([])

//     useEffect(() => {
//         async function wrapMovieQuery() {
//             if (user && db) {
//                 const authoredMovies = await db.collection("movies").find()
//                 setMovies(authoredMovies)
//             }
//         }
//         wrapMovieQuery()
//     }, [user, db])

//     async function handleLogIn() {
//         await logIn(email, password)
//     }

//     return user && db && user.state === "active" ? (
//         <MovieList movies={movies} user={user} logOut={logOut} />
//     ) : (
//         <LogInForm
//             email={email}
//             setEmail={setEmail}
//             password={password}
//             setPassword={setPassword}
//             handleLogIn={handleLogIn}
//         />
//     )
// }

// export default App
