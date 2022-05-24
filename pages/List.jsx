import {
  Grid,
  Popup,
  Dropdown,
  Segment,
  Button,
  Form,
  // Icon,
} from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const List = ({ stylist }) => {
  const [stylists, setStylists] = useState([]);
  const [semester, setSemester] = useState([]);
  const [teachId, setTeachId] = useState([]);
  const [clients, setClients] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  //For adding visits
  const [visit, setVisit] = useState({
    addVisits: "",
    hairStyle: "",
    specialTreatment: "",
  });
  const { addVisits, hairStyle, specialTreatment } = visit;
  const [clientUser, setClientUser] = useState("");

  //for delete
  const [deleteUser, setDeleteUser] = useState(false);
  const [userIds, setUserIds] = useState("");

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
      console.log(`Error at handleSubmit2: ${error}`);
    }
    setVisit("");
    setFormLoading(false);
  };
  const handleChange2 = (e) => {
    const { name, value, files } = e.target;
    setVisit((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (string) => {
    console.log(`Tester String: ${string}`, userIds);
    try {
      const res = await axios.post(`https://cosmetology.vercel.app/api/v1/List`, {
        userIds,
      });
      setDeleteUser(false);

      const results = await axios.get(`https://cosmetology.vercel.app/api/v1/stylists`);
      setStylists(results.data);
    } catch (error) {
      console.log(`Error at handleSubmit: ${error}`);
    }
  };

  //For sort function. Currently unfinished
  const [sortType, setSortType] = useState("");
  const initGetStylists = async () => {
    try {
      const results = await axios.get(`https://cosmetology.vercel.app/api/v1/stylists`);
      setStylists(results.data);
    } catch (error) {
      console.log(`Error at initGetStylists ${error}`);
    }
  };
  const getClients = async () => {
    try {
      const results = await axios.get(`https://cosmetology.vercel.app/api/v1/client`);
      setClients(results.data);
    } catch (error) {
      console.log(`Error at getClients: ${error}`);
    }
  };
  const getSemester = async () => {
    try {
      let currentDate = new Date();

      let currentMonth = currentDate.getMonth() + 1;

      if (currentMonth >= 8 && currentMonth <= 12) {
        setSemester("Semester 1");
      } else if (currentMonth >= 1 && currentMonth <= 5) {
        setSemester("Semester 2");
      }
    } catch (error) {
      console.log(`Error at getSemester: ${error}`);
    }
  };

  useEffect(() => {
    initGetStylists();
    getSemester();
    getClients();
    // getTeacher();
  }, []);

  const sortStylist = async (text) => {
    console.log(`Here is the text: ${text}`);
    try {
      const res = await axios.post(`https://cosmetology.vercel.app/api/v1/List/sort`, {
        text,
      });

      console.log(`Data for list sort: ${res.data}`);
      console.log("middle");

      //Thanks Sean for fixing the main error.
      //Now res.data needs to be shown, as it is the sorted data.

      setStylists(res.data.stylists);
      console.log("done");
    } catch (error) {
      console.log(`Error at sortStylist: ${error}`);
    }
  };

  const sortClient = async (text) => {
    console.log(`Here is the text: ${text}`);
    try {
      const res = await axios.post(
        `https://cosmetology.vercel.app/api/v1/List/sort2`,
        {
          text,
        }
      );

      console.log(`First log for list client: ${res.data}`);
      console.log("middle");

      //Thanks Sean for fixing the main error.
      //Now res.data needs to be shown, as it is the sorted data.
      console.log(`Second Log for list client: ${res.data.clients}`);

      setClients(res.data.clients);
      console.log("done");
    } catch (error) {
      console.log(`Error at sortClient: ${error}`);
    }
  };

  let decide = "";
  if (stylist.isTeacher === "true") {
    decide = true;
  } else if (stylist.isTeacher === "false") {
    decide = false;
  }

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
      key: "Year",
      text: "Year",
      value: "Year",
      onClick: () => {
        setSortType("Year"), sortStylist("Year");
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

  return (
    <>
      {decide ? (
        <>
          <div className="list">
            <Grid className="tableindex" stackable style={{ padding: "3rem" }}>
              <Grid.Row className="mini3">
                <div style={{ textAlign: "center" }}>
                  <h1>List of All Students</h1>
                  <Dropdown
                    placeholder="Sort By..."
                    fluid
                    selection
                    options={Students}
                  />
                </div>
              </Grid.Row>

              <Grid.Row
                columns={4}
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
                    <Segment>Student</Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment>Teacher</Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment>Session</Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment>Year</Segment>
                  </Grid.Column>
                </>
              </Grid.Row>

              <Grid.Row className="containeindex" columns={4}>
                <>
                  {stylists.map((stylist) => {
                    if (stylist.isTeacher === "false") {
                      return (
                        <>
                          <Grid.Column
                            className="Indexcolumn clientListColumn"
                            setStylists={stylists}
                            key={stylist._id}
                            style={{
                              textAlign: "center",
                            }}
                          >
                            <Popup
                              trigger={
                                <img
                                  className="listAvatar listLink"
                                  id="changeImg"
                                  src={
                                    deleteUser
                                      ? "https://res.cloudinary.com/product-image/image/upload/v1652387171/rcLxML7Ri_rmox1s.png"
                                      : stylist.profilePicURL
                                  }
                                  onClick={() => {
                                    setUserIds(stylist.userId);
                                  }}
                                />
                              }
                              content={
                                <>
                                  <h3>
                                    Are you sure you want to delete{" "}
                                    {stylist.firstName}? This action is
                                    irreversible!!
                                  </h3>
                                  <Button
                                    color="red"
                                    inverted
                                    content="I am sure"
                                    onClick={() => handleSubmit("testing")}
                                  />
                                </>
                              }
                              hoverable
                              pinned
                              on="click"
                              position="top left"
                            />

                            <Link href={`/${stylist.userId}`}>
                              <Segment
                                style={{
                                  width: "70%",
                                  marginTop: "0",
                                  marginBottom: "1rem",
                                }}
                                floated="right"
                              >
                                {stylist.firstName.length > 15 ||
                                stylist.lastName.length > 15 ? (
                                  <>
                                    <p className="listLink">
                                      {stylist.firstName}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p
                                      className="listLink"
                                      style={{
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      {stylist.firstName} {stylist.lastName}
                                    </p>
                                  </>
                                )}
                              </Segment>
                            </Link>
                          </Grid.Column>

                          <Grid.Column
                            className="Indexcolumn"
                            setStylists={stylists}
                            style={{ textAlign: "center" }}
                          >
                            <Segment className="indexCenter">
                              <Link
                                className="testClass"
                                onClick={console.log(
                                  `This is stylist.teachId: ${stylist.teachId}`
                                )}
                                href={`/${stylist.teachId}`}
                              >
                                <p className="listLink">{stylist.teacher}</p>
                              </Link>
                            </Segment>
                          </Grid.Column>

                          <Grid.Column
                            className="Indexcolumn"
                            setStylists={stylists}
                            style={{ textAlign: "center" }}
                          >
                            <Segment className="indexCenter">
                              <p>{stylist.session}</p>
                            </Segment>
                          </Grid.Column>

                          <Grid.Column
                            className="Indexcolumn"
                            setStylists={stylists}
                            style={{ textAlign: "center" }}
                          >
                            <Segment className="indexCenter">
                              <p>{stylist.studentYear}</p>
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
              <Grid.Column style={{ textAlign: "center" }} width={16}>
                {/* <div class="showMore">
                  <Button
                    id="loadMore"
                    style={{ backgroundColor: "orange", color: "white" }}
                  >
                    🡣 Show All 🡣
                  </Button>
                </div> */}
              </Grid.Column>
            </Grid>
            {/* <div class="Back2Top" style={{ left: "103rem" }}>
              <a href="#" className="Back2TopText">
                🠉
              </a>
            </div> */}
          </div>
        </>
      ) : (
        <>
          <div>
            <Grid className="tableindex" stackable style={{ padding: "3rem" }}>
              <Grid.Row className="mini3">
                <div style={{ textAlign: "center" }}>
                  <h1>List of All Clients</h1>
                  <Dropdown
                    placeholder="Sort By..."
                    fluid
                    selection
                    options={Options}
                  />
                </div>
              </Grid.Row>
              <Grid.Row
                columns={4}
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
                    <Segment>Client Name</Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment>Stylist</Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment>First Visited</Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment>Last Visited</Segment>
                  </Grid.Column>
                </>
              </Grid.Row>

              <Grid.Row className="containeindex" columns={4}>
                <>
                  {clients.map((client) => {
                    return (
                      <>
                        <Grid.Column
                          className="Indexcolumn clientListColumn"
                          key={client._id}
                          setClients={clients}
                          style={{
                            textAlign: "center",
                          }}
                        >
                          <Popup
                            trigger={
                              <div className="listLink">
                                <img
                                  className="listAvatar "
                                  src="https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
                                />
                                <Segment
                                  style={{
                                    width: "70%",
                                    marginTop: "0",
                                    marginBottom: "1rem",
                                  }}
                                  floated="right"
                                >
                                  {client.firstName.length > 15 ||
                                  client.lastName.length > 15 ? (
                                    <>
                                      <p>{client.firstName}</p>
                                    </>
                                  ) : (
                                    <>
                                      <p>
                                        {client.firstName} {client.lastName}
                                      </p>
                                    </>
                                  )}
                                </Segment>
                              </div>
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
                          setClients={clients}
                          style={{ textAlign: "center" }}
                        >
                          <img className="listAvatar" src={client.stylistPic} />
                          <Segment
                            style={{
                              width: "70%",
                              marginTop: "0",
                              marginBottom: "1rem",
                            }}
                            floated="right"
                          >
                            <p>{client.stylistName.split("@")[0]}</p>
                          </Segment>
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
              {/* <Grid.Column style={{ textAlign: "center" }} width={16}>
                <div class="showMore">
                  <Button
                    id="loadMore"
                    style={{ backgroundColor: "orange", color: "white" }}
                  >
                    🡣 Show All 🡣
                  </Button>
                </div>
              </Grid.Column> */}
            </Grid>
            {/* <div class="Back2Top" style={{ left: "103rem" }}>
              <a href="#" className="Back2TopText">
                🠉
              </a>
            </div> */}
          </div>
        </>
      )}
    </>
  );
};

export default List;
