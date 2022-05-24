import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import { parseCookies } from "nookies";
// import Cookies from "js-cookie";
import Link from "next/link";
import { baseURL } from "../server/util/baseURL";

import {
  Grid,
  Card,
  Image,
  Divider,
  Dropdown,
  Segment,
  Rating,
  Popup,
  Icon,
  Button,
  Form,
} from "semantic-ui-react";
import axios from "axios";

const ProfilePage = ({ stylist, profile }) => {
  
  const [stylists, setStylists] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [hours, setHours] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [teachName, setTeachName] = useState("");
  const [clients, setClients] = useState([]);
  const [clientUser, setClientUser] = useState("");
  const [sortType, setSortType] = useState("");

  const [visit, setVisit] = useState({
    addVisits: "",
    hairStyle: "",
    specialTreatment: "",
  });
  const { addVisits, hairStyle, specialTreatment } = visit;

  useEffect(() => {
    setTeachName(stylist.firstName);
  }, []);

  //This variable updates hours on the page so that the user doesnt have to reset to see their new hours.
  //Thats what i would say... If it actually worked! For now the user will have to reset to see the hours.
  const [actualHours, setActualHours] = useState("");
  useEffect(() => {
    setActualHours(stylist.hours);
  }, []);

  let user = stylist.userId;
  const getStylists = async () => {
    try {
      const results = await axios.get(`${baseURL}/api/v1/stylists`);
      setStylists(results.data);
    } catch (error) {
      console.log(`Error at getStylists ${error}`);
    }
  };
  useEffect(() => {
    getStylists();
  }, []);

  //Separates the teachers from the students
  let count = 0;
  stylists.map((stylist) => {
    if (stylist.isTeacher === "false" && stylist.teacher === teachName) {
      return count++;
    } else {
      count = count;
    }
    return console.log(`count: ${count}`);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    let hour = hours;

    try {
      const res = await axios.patch("/api/v1/user/UserProfile", {
        hour,
        user,
      });
      setToken(res.data);
    } catch (error) {
      console.log(`Error at handleSubmit ${error}`);
    }
    setHours("");
    setFormLoading(false);
    setHidden(false);
    setActualHours(stylist.hours);
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media" && files.length > 0) {
      setMedia(() => files[0]);
      setMediaPreview(() => URL.createObjectURL(files[0]));
      setHighlighted(true);
    } else {
      setHours(value);
    }
  };

  let decide = "";
  if (stylist.isTeacher === "true") {
    // setIsTeacher(true);
    decide = true;
  } else if (stylist.isTeacher === "false") {
    // setIsTeacher(false);
    decide = false;
  }

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

  //Visit Start
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const res = await axios.patch("/api/v1/client/clientCreator", {
        addVisits,
        hairStyle,
        specialTreatment,
        clientUser,
      });
      setToken(res.data);
    } catch (error) {
      console.log(`Error at handleSubmit ${error}`);
    }
    setVisit("");
    setFormLoading(false);
  };
  const handleChange2 = (e) => {
    const { name, value, files } = e.target;
    setVisit((prev) => ({ ...prev, [name]: value }));
  };
  //Visit End

  //Dating Start!
  //Dating End... ?

  const sortStylist = async (text) => {
    console.log(`Here is the text: ${text}`);
    try {
      const res = await axios.post(
        `${baseURL}/api/v1/UserRoute/sort`,
        {
          text,
        }
      );

      console.log(`First log for [userId]: ${res.data}`);
      console.log("middle");

      //Thanks Sean for fixing the main error.
      //Now res.data needs to be shown, as it is the sorted data.
      console.log(`Second Log for [userId]: ${res.data.stylists}`);

      setStylists(res.data.stylists);
      console.log("done");
    } catch (error) {
      console.log(`Error at sortStylist: ${error}`);
    }
  };

  const sortClient = async (text) => {
    console.log(`Here is the text: ${text}`);
    try {
      const res = await axios.post(`${baseURL}/api/v1/UserRoute/sort2`, {
        text,
      });

      console.log(`First log for [userId client]: ${res.data}`);
      console.log("middle");

      //Thanks Sean for fixing the main error.
      //Now res.data needs to be shown, as it is the sorted data.
      console.log(`Second Log for [userId client]: ${res.data.clients}`);

      setClients(res.data.clients);
      console.log("done");
    } catch (error) {
      console.log(`Error at sortClient: ${error}`);
    }
  };

  const Students = [
    {
      key: "Teacher",
      text: "Teacher",
      value: "Teacher",
      onClick: () => {
        setSortType("Teacher"), sortStylist("Teacher");
      },
    },
    {
      key: "Session",
      text: "Session",
      value: "Session",
      onClick: () => {
        setSortType("Session"), sortStylist("Session");
      },
    },
    {
      key: "Total Hours",
      text: "Total Hours",
      value: "Total Hours",
      onClick: () => {
        setSortType("Hour"), sortStylist("Hour");
      },
    },
    {
      key: "Name",
      text: "Name",
      value: "Name",
      onClick: () => {
        setSortType("Name"), sortStylist("Name");
      },
    },
  ];

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
      {decide ? (
        <>
          <Grid stackable style={{ margin: "3rem" }}>
            <Grid.Column width={8} className="roz">
              <Grid.Row
                style={{ margin: "3.8rem", textAlign: "center" }}
                className="roz3"
              >
                <Image
                  src={stylist.profilePicURL}
                  className="profileAvatar"
                  size="medium"
                  bordered
                  centered
                  circular
                />
              </Grid.Row>
              <Grid.Row style={{ marginLeft: "15rem", textAlign: "center" }}>
                <Card>
                  <Card.Content>
                    <Card.Header>
                      {profile.firstName} {profile.lastName}
                    </Card.Header>
                    <Card.Meta>
                      <span className="date">
                        Teacher: {profile.teacher} | Session: {profile.session}
                      </span>
                    </Card.Meta>
                    <Card.Description>Teacher </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column
              width={7}
              style={{ textAlign: "center", marginTop: "10rem" }}
              className="roz2"
            >
              <Grid.Row
                style={{
                  border: "1px solid white",
                  height: "5rem",
                  background: "orange",
                  color: "white",
                  textAlign: "center",
                  paddingTop: "1.2rem",
                }}
              >
                <h1>Number of Students: {count}</h1>
              </Grid.Row>
            </Grid.Column>
          </Grid>

          <Grid
            className="tableindex"
            stackable
            style={{ padding: "3rem", marginLeft: "2%" }}
          >
            <Grid.Row className="mini3">
              <div style={{ textAlign: "center", paddingLeft: "4%" }}>
                <h1>All Students</h1>
                <Dropdown
                  placeholder="Sort By..."
                  fluid
                  selection
                  options={Students}
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
                <Grid.Column>
                  {/*These categories are made as requested by Mr. Peck */}
                  <Segment>Students</Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment>Total Hours</Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment>Total Clients</Segment>
                </Grid.Column>
              </>
            </Grid.Row>
            {/*Thanks Daniel, made the styling easy */}
            <Grid.Row className="containeindex" columns={3}>
              <>
                {stylists.map((stylist) => {
                  if (
                    stylist.isTeacher === "false" &&
                    stylist.teacher === teachName
                  ) {
                    return (
                      <>
                        <Grid.Column
                          className="Indexcolumn clientListColumn"
                          key={stylist._id}
                          setStylists={stylists}
                          style={{ textAlign: "center" }}
                        >
                          <Segment className="indexCenter listLink">
                            <Link
                              className="listLink"
                              href={`/${stylist.userId}`}
                            >
                              <p>
                                {stylist.firstName} {stylist.lastName}
                              </p>
                            </Link>
                          </Segment>
                        </Grid.Column>

                        <Grid.Column
                          className="Indexcolumn"
                          setStylists={stylists}
                          style={{ textAlign: "center" }}
                        >
                          <Segment className="indexCenter">
                            <p>{stylist.hours}</p>
                          </Segment>
                        </Grid.Column>

                        <Grid.Column
                          className="Indexcolumn"
                          setStylists={stylists}
                          style={{ textAlign: "center" }}
                        >
                          <Segment className="indexCenter">
                            <p>{stylist.pastClients.length}</p>
                          </Segment>
                        </Grid.Column>
                      </>
                    );
                  } else {
                    <></>;
                  }
                })}
              </>
            </Grid.Row>
          </Grid>
        </>
      ) : (
        <>
          <Grid stackable style={{ margin: "3rem" }}>
            <Grid.Column width={8} className="roz">
              <Grid.Row
                style={{ margin: "3.8rem", textAlign: "center" }}
                className="roz3"
              >
                <Image
                  src={profile.profilePicURL}
                  className="profileAvatar"
                  size="medium"
                  bordered
                  centered
                  circular
                />
              </Grid.Row>
              <Grid.Row style={{ marginLeft: "15rem", textAlign: "center" }}>
                <Card>
                  <Card.Content>
                    <Card.Header>
                      {profile.firstName} {profile.lastName}
                    </Card.Header>
                    <Card.Meta>
                      <span className="date">
                        Teacher: {profile.teacher} | Session: {profile.session}
                      </span>
                    </Card.Meta>
                    <Card.Description>Stylist</Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column
              width={7}
              style={{ textAlign: "center", marginTop: "10rem" }}
              className="roz2"
            >
              <Grid.Row
                style={{
                  border: "1px solid white",
                  height: "5rem",
                  background: "orange",
                  color: "white",
                  textAlign: "center",
                  paddingTop: "1.2rem",
                }}
              >
                {hidden ? (
                  <Form onSubmit={handleSubmit} loading={formLoading}>
                    <h1>
                      Hours:
                      <input
                        style={{
                          borderRadius: "20px",
                          width: "30%",
                          height: "1rem",
                          marginLeft: "2%",
                        }}
                        placeholder={stylist.hours}
                        name="firstName"
                        value={hours}
                        className="hour"
                        onChange={handleChange}
                        type="number"
                      />
                      <button
                        type="submit"
                        style={{
                          color: "white",
                          backgroundColor: "orange",
                          cursor: "pointer",
                          marginLeft: "2%",
                          border: "1px solid black",
                        }}
                      >
                        Submit
                      </button>
                    </h1>
                  </Form>
                ) : (
                  <div>
                    <h1>
                      Hours: {actualHours}
                      <Icon
                        name="plus"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setHidden(true);
                        }}
                      />
                    </h1>
                  </div>
                )}
              </Grid.Row>
              <Divider hidden />
              <Grid.Row
                style={{
                  border: "1px solid white",
                  height: "5rem",
                  background: "orange",
                  color: "white",
                  textAlign: "center",
                  paddingTop: "1.2rem",
                }}
              >
                <h1>Number of Clients: {stylist.pastClients.length}</h1>
              </Grid.Row>
              <Divider hidden />
            </Grid.Column>
          </Grid>

          <Grid className="tableindex" stackable style={{ padding: "3rem" }}>
            <Grid.Row className="mini3">
              <div style={{ textAlign: "center" }}>
                <h1>All Clients of {stylist.firstName}</h1>
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
                <Grid.Column>
                  {/*These categories are made as requested by Mr. Peck */}
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
                  if (client.stylistName === stylist.email) {
                    return (
                      <>
                        <Grid.Column
                          className="Indexcolumn clientListColumn"
                          style={{ textAlign: "center" }}
                          key={client._id}
                        >
                          <Popup
                            trigger={
                              <Segment className="indexCenter ">
                                <p className="listLink">{`${client.firstName} ${client.lastName}`}</p>
                              </Segment>
                            }
                            hoverable
                            pinned
                            on="click"
                            position="top center"
                            onClick={() => {
                              setClientUser(client._id);
                            }}
                          >
                            <Form
                              loading={formLoading}
                              onSubmit={handleSubmit2}
                            >
                              <Form.Input
                                required
                                label="Add Visit"
                                placeholder="Today"
                                name="addVisits"
                                value={addVisits}
                                onChange={handleChange2}
                                icon="time"
                                iconPosition="left"
                                style={{ width: "300px", height: "42px" }}
                                type="text"
                              />
                              <Form.Input
                                required
                                label="Hair Style"
                                placeholder="Bob, Curly"
                                name="hairStyle"
                                value={hairStyle}
                                onChange={handleChange2}
                                icon="user"
                                iconPosition="left"
                                style={{ width: "300px", height: "42px" }}
                                type="text"
                              />
                              <Form.Input
                                required
                                label="Special Treatments"
                                placeholder="Additional Requirements"
                                name="specialTreatment"
                                value={specialTreatment}
                                onChange={handleChange2}
                                icon="star outline"
                                iconPosition="left"
                                style={{ width: "300px", height: "42px" }}
                                type="text"
                              />
                              <Button
                                color="orange"
                                inverted
                                content="Signup"
                                type="submit"
                              />
                            </Form>
                          </Popup>
                        </Grid.Column>

                        <Grid.Column
                          className="Indexcolumn"
                          style={{ textAlign: "center" }}
                        >
                          <Segment className="indexCenter">
                            <p>{client.appointmentDate.split("T")[0]}</p>
                          </Segment>
                        </Grid.Column>

                        <Grid.Column
                          className="Indexcolumn"
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
                  } else {
                    <></>;
                  }
                })}
              </>
            </Grid.Row>
          </Grid>
        </>
      )}
    </>
  );
};

ProfilePage.getInitialProps = async (ctx) => {
  try {
    const { userId } = ctx.query;
    console.log(`userId: ${userId}`);
    const { token } = parseCookies(ctx);
    const res = await axios.get(
      `${baseURL}/api/v1/profile/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const { profile } = res.data;
    return { profile };
  } catch (error) {
    console.log(`Error at profilePage ${error}`);
  }
};

export default ProfilePage;
