import React, { useState } from "react";
import axios from "axios";
import { Form, Segment, Button, Header } from "semantic-ui-react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const body = {
      email,
    };
    axios({ 
      url: "/auth/forgot",
      data: body,
      method: "post",
    });
    setEmailSent(true);
  };

  let body;
  if (emailSent) {
    body = <span>An email with reset instructions is on its way</span>;
  } else {
    body = (
      <>
        <Form
          className="loginComponent"
          style={{
            width: "100px",
            margin: "0 auto",
            marginTop: "3rem",
          }}
          textAlign="center"
          onSubmit={submitHandler}
        >
          <Header as="h2" color="orange" textAlign="center">
            Enter Your Email
          </Header>
          <Segment>
            <Form.Group>
              <Form.Input
                required
                label="Email"
                placeholder="Email"
                name="email"
                icon="envelope"
                iconPosition="left"
                type="email"
                className="forgotPassword2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Form.Button
                content="Submit"
                className="forgotPassword3"
                type="submit"
              />
            </Form.Group>
          </Segment>
          <Button href="/login">Back To Login</Button>
        </Form>
      </>
    );
  }

  return body;
}

export default ForgotPassword;
