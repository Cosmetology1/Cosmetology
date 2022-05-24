import React from "react";
import axios from "axios";
// import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import {baseURL} from "../server/util/baseURL"


import {
  Grid,
  Divider,
  Button,
  Dropdown,
  Image,
  Header,
  Icon,
  Segment,
  Modal,
} from "semantic-ui-react";
import Link from "next/link";

//FOR MODAL, DONT DELETE
function exampleReducer(state, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return { open: true, dimmer: action.dimmer };
    case "CLOSE_MODAL":
      return { open: false };
    default:
      throw new Error();
  }
}

const Index = ({ stylist, client }) => {
  useEffect(() => {
    document.title = `Welcome, ${stylist.firstName}`;
  }, []);

  const [clients, setClients] = useState([]);
  const [clientModal, setClientModal] = useState("");
  const [option, setOption] = useState("");
  const [sortType, setSortType] = useState("");


  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  });
  const { open, dimmer } = state;

  const getClients = async () => {
    try {
      const results = await axios.get(`${baseURL}/api/v1/client`);
      setClients(results.data);
    } catch (error) {
      console.log(`Error at getClients ${error}`);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  //Ninja Coding!!! Yaaa! No but actually all the classnames are mini in order, and those are for organization with ipad css

  //( ͡° ͜ʖ ͡°)
  //(╯°□°)╯︵ ┻━┻
  let decide = "";
  if (stylist) {
    if (stylist.isTeacher === "true") {
      // setIsTeacher(true);
      decide = true;
    } else if (stylist.isTeacher === "false") {
      // setIsTeacher(false);
      decide = false;
    }
  }

  const sortClient = async (text) => {
    console.log(`Here is the text: ${text}`);
    try {
      const res = await axios.post(`${baseURL}/api/v1/index`, {
        text,
      });

      console.log(`First log for index: ${res.data}`);
      console.log("middle");

      //Thanks Sean for fixing the main error.
      //Now res.data needs to be shown, as it is the sorted data.
      console.log(`Second Log for index: ${res.data.clients}`);

      setClients(res.data.clients);
      console.log("done");
    } catch (error) {
      console.log(`Error at sortClient: ${error}`);
    }
  };

  const Options = [
    {
      id: 1,
      key: "First Name",
      text: "First Name",
      value: "First Name",
      onClick: () => {
        setSortType("First Name"), sortClient("First Name");
      },
    },
    {
      id: 2,
      key: "Last Name",
      text: "Last Name",
      value: "Last Name",
      onClick: () => {
        setSortType("Last Name"), sortClient("Last Name");
      },
    },
    {
      id: 3,
      key: "Age",
      text: "Age",
      value: "Age",
      onClick: () => {
        setSortType("Age"), sortClient("Age");
      },
    },
    {
      id: 4,
      key: "Date Created",
      text: "Date Created",
      value: "Date Created",
      onClick: () => {
        setSortType("Date Created"), sortClient("Date Created");
      },
    },
  ];

  return (
    <>
      {stylist ? (
        <>
          {" "}
          <div
            style={{ padding: "2rem", textAlign: "center" }}
            stylist={stylist.firstName}
          >
            <Grid style={{ textAlign: "center" }}>
              {stylist.isTeacher === "true" ? (
                <>
                  <Grid.Row style={{ width: "100%" }} className="mini">
                    <p>
                      {`Welcome ${stylist.firstName}. To get started, check on your students, or see all clients in the list below.`}
                    </p>
                  </Grid.Row>
                  <Divider hidden />
                  <Link href="/List">
                    <Grid.Row className="mini2">
                      <Button style={{ backgroundColor: "orange" }}>
                        See Students
                      </Button>
                    </Grid.Row>
                  </Link>
                </>
              ) : (
                <>
                  <Grid.Row style={{ width: "100%" }} className="mini">
                    <p>
                      {`Welcome ${stylist.firstName}. To get started, add a new visitor, or update a visitor from the list
              below.`}
                    </p>
                  </Grid.Row>
                  <Divider hidden />
                  <Link href="/clientCreator">
                    <Grid.Row className="mini2">
                      <Button style={{ backgroundColor: "orange" }}>
                        New Visitor
                      </Button>
                    </Grid.Row>
                  </Link>
                </>
              )}
            </Grid>
            {/* <Divider hidden /> */}
            <Grid className="tableindex" stackable style={{ padding: "3rem" }}>
              <Grid.Row className="mini3">
                <div style={{ textAlign: "center" }}>
                  <h1>Previous Clients</h1>
                  <Dropdown
                    placeholder="Sort By..."
                    fluid
                    selection
                    options={Options}
                  />
                </div>
              </Grid.Row>
              <Grid.Row
                columns={3}
                style={{
                  border: "2px solid white",
                  // height: "35rem",
                  background: "orange",
                  color: "black",
                  textAlign: "center",
                  // overflow: "scroll",
                  justifyContent: "space-evenly",
                }}
              >
                <>
                  <Divider hidden></Divider>
                  <Grid.Column>
                    <Segment>Client</Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment>First Visit</Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment>Last Visited</Segment>
                  </Grid.Column>
                </>
              </Grid.Row>

              <Grid.Row className="containeindex" columns={3}>
                <>
                  {clients.map((client) => {
                    return (
                      <>
                        <Grid.Column
                          key={client._id}
                          setClients={clients}
                          className="Indexcolumn clientListColumn"
                          style={{ textAlign: "center" }}
                          onClick={() => {
                            setClientModal(client._id);
                          }}
                        >
                          <Segment
                            className="indexCenter"
                            onClick={() =>
                              dispatch({
                                type: "OPEN_MODAL",
                                dimmer: "blurring",
                              })
                            }
                          >
                            <p className="listLink">
                              {client.firstName} {client.lastName}
                            </p>
                          </Segment>

                          {client._id === clientModal ? (
                            <Modal
                              centered={false}
                              // textAlign="center"
                              onClose={() => dispatch({ type: "CLOSE_MODAL" })}
                              open={open}
                            >
                              <>
                                <Modal.Content
                                  style={{ position: "absolute", top: "500%" }}
                                  className="indexClientInfo"
                                  scrolling
                                >
                                  <Divider
                                    clearing
                                    style={{
                                      position: "absolute",
                                      top: "500%",
                                    }}
                                  />
                                  <Segment>
                                    <h3>First Name: {client.firstName}</h3>
                                    <h3>Last Name: {client.lastName}</h3>
                                    <h3>
                                      Appointment Date:
                                      {client.appointmentDate.split("T")[0]}
                                    </h3>
                                    <h3>
                                      Service Request: {client.serviceRequest}
                                    </h3>
                                    <h3>
                                      Hair Condition: {client.hairCondition}
                                    </h3>
                                    <h3>
                                      Hair Classification:{" "}
                                      {client.hairClassification}
                                    </h3>
                                    <h3>Hair Density: {client.hairDensity}</h3>
                                    <h3>
                                      Hair Elasticity: {client.hairElasticity}
                                    </h3>
                                    <h3>
                                      Hair Porosity: {client.hairPorosity}
                                    </h3>
                                    <h3>Hair Length: {client.hairLength}</h3>
                                    <h3>Hair Texture: {client.hairTexture}</h3>
                                    <h3>
                                      Growth Patterns: {client.growthPatterns}
                                    </h3>
                                    <h3>
                                      Scalp Condition:{" "}
                                      {client.scalpClassification}
                                    </h3>
                                    <div style={{ textAlign: "center" }}>
                                      <h3>Additional Visits</h3>
                                      {client.visits.map((visit) => {
                                        return (
                                          <Segment
                                            key={visit[0]}
                                            style={{ textAlign: "left" }}
                                          >
                                            <h3>Visits: {`${visit[0]}, `}</h3>
                                            <h3>
                                              Hair Style: {`${visit[1]}, `}
                                            </h3>
                                            <h3>
                                              Special Treatments:{" "}
                                              {`${visit[2]}, `}
                                            </h3>
                                          </Segment>
                                        );
                                      })}
                                    </div>
                                  </Segment>
                                </Modal.Content>
                                {/* <div className="ui hidden"></div> */}
                                <Divider hidden />

                                {/* <Modal.Actions
                              style={{
                                position: "relative",
                                top: "1000%",
                                backgroundColor: "ffffff00",
                              }}
                            > */}
                                {/* <Button
                              // style={{ position: "absolute", top: "1000%" }}
                                content="Proceed"
                                labelPosition="right"
                                onClick={() =>
                                  dispatch({ type: "CLOSE_MODAL" })
                                }
                                warning
                              /> */}
                                {/* </Modal.Actions> */}
                              </>
                              {/* ) : (
                        <></>
                      )} */}
                              {/* <br /> */}
                            </Modal>
                          ) : (
                            <></>
                          )}
                        </Grid.Column>

                        <Grid.Column
                          className="Indexcolumn"
                          setClients={clients}
                          style={{ textAlign: "center" }}
                        >
                          <Segment className="indexCenter">
                            <p>{client.appointmentDate.split("T")[0]}</p>
                          </Segment>
                        </Grid.Column>

                        <Grid.Column
                          className="Indexcolumn"
                          setClients={clients}
                          style={{ textAlign: "center" }}
                        >
                          <Segment className="indexCenter">
                            {/*Returns the date in the most recent visit array. If no input returns first visit.*/}
                            {client.visits == "" ? (
                              <p>{client.appointmentDate.split("T")[0]}</p>
                            ) : (
                              <p>
                                {client.visits.slice(-1).map((i) => {
                                  return i[0];
                                })}
                              </p>
                            )}
                          </Segment>
                        </Grid.Column>
                      </>
                    );
                  })}
                </>
              </Grid.Row>
            </Grid>
          </div>
          {open ? <></> : <></>}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Index;
