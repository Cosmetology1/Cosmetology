import {
  Button,
  Divider,
  Form,
  Message,
  Segment,
  // Dropdown,
  // Checkbox,
} from "semantic-ui-react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import catchErrors from "./util/catchErrors";
// import { setToken } from "./util/auth";

import Router from "next/router";

const ClientCreator = ({ stylist }) => {
  const [client, setClient] = useState({
    //Dont change stylist.email to stylist.firstName.
    //Despite the naming (my bad), it is better to match based on email because email is unique, wereas name is not.
    stylistName: stylist.email,
    stylistPic: stylist.profilePicURL,
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    appointmentDate: "",
    serviceRequest: "",
    medicalIssues: "",
    address: "",
    city: "",
    state: "",
    phoneNumber: "",
    zipCode: "",
    hairCondition: "",
    hairClassification: "",
    scalpClassification: "",
    hairTexture: "",
    growthPatterns: "",
    hairDensity: "",
    hairElasticity: "",
    hairPorosity: "",
    hairLength: "",
  });
  const {
    stylistName,
    stylistPic,
    firstName,
    lastName,
    email,
    age,
    appointmentDate,
    serviceRequest,
    medicalIssues,
    address,
    city,
    state,
    phoneNumber,
    zipCode,
    hairClassification,
    hairCondition,
    scalpClassification,
    hairDensity,
    hairTexture,
    growthPatterns,
    hairElasticity,
    hairPorosity,
    hairLength,
  } = client;

  //* Form States */
  const [formLoading, setFormLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const inputRef = useRef(null);
  const [highlighted, setHighlighted] = useState(false);
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [hidden, setHidden] = useState(false);

  //* Functions */

  // Sets form loading to true while form is being submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    let profilePicURL;

    if (media !== null) {
      const formData = new FormData();
      formData.append("image", media, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const res = await axios.post("/api/v1/uploads", formData);
      profilePicURL = res.data.src;
    }
 
    if (media !== null && !profilePicURL) {
      setFormLoading(false);
      return res.status(500).send("Image Upload Failure");
    }

    try {
      const res = await axios.post("/api/v1/client/clientCreator", {
        client,
      });
          Router.push("/");
    } catch (error) {
      const errorMsg = catchErrors(error);
      setErrorMsg(errorMsg);
    }
    setFormLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
 
    if (name === "media" && files.length > 0) {
      setMedia(() => files[0]);
      setMediaPreview(() => URL.createObjectURL(files[0]));
      setHighlighted(true);
    } else {
      setClient((prev) => ({ ...prev, [name]: value }));
    }
  };

  //* USE EFFECTS */
  useEffect(() => {
    setSubmitDisabled(
      !(
        stylistName &&
        stylistPic &&
        firstName &&
        lastName &&
        email &&
        age &&
        appointmentDate &&
        serviceRequest &&
        medicalIssues &&
        address &&
        city &&
        state &&
        phoneNumber &&
        zipCode &&
        hairClassification &&
        hairCondition &&
        scalpClassification &&
        hairDensity &&
        hairTexture &&
        growthPatterns &&
        hairElasticity &&
        hairPorosity &&
        hairLength
      )
    );
    
  }, []);

  return (
    <>
      <Form
        style={{
          width: "90vw",
          margin: "0 auto",
          marginTop: "3rem",
          textAlign: "center",
        }}
        loading={formLoading}
        error={errorMsg !== null}
        onSubmit={handleSubmit}
      >
        <h1 style={{ textAlign: "center" }}>Fill out the form below.</h1>
        <Segment 
        style={{overflow:"auto"}} 
        className="clientCreatorHandheld"
        >
          <Message
            error
            content={errorMsg}
            header="There was an Error!"
            icon="meh"
          />
          {/*FirstName, LastName, Age */}
          <Form.Group
            unstackable
            style={{ justifyContent: "space-between", textAlign: "left",}}
            className="inputClient"
          >
            <Form.Input
              required
              label="First Name"
              placeholder="John"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              icon="user"
              iconPosition="left"
              style={{ width: "435px", height: "42px" }}
              type="text"
            />
            <Form.Input
              required
              label="Last Name"
              placeholder="Doe"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              icon="user"
              iconPosition="left"
              style={{ width: "435px", height: "42px" }}
              type="text"
            />
            <Form.Input
              required
              label="Age"
              placeholder="age"
              name="age"
              value={age}
              onChange={handleChange}
              icon="birthday cake"
              iconPosition="left"
              type="number"
              style={{ width: "435px", height: "42px" }}
            />
          </Form.Group>
          <Divider hidden className="clientCreatorDivider" />
          {/*Appointment Date, ServiceRequest, Medical */}
          <Form.Group
            unstackable
            style={{ justifyContent: "space-between", textAlign: "left" }}
            className="inputClient"
          >
            <Form.Input
              required
              label="Appointment Date"
              placeholder="Today"
              name="appointmentDate"
              value={appointmentDate}
              onChange={handleChange}
              icon="time"
              iconPosition="left"
              style={{ width: "435px", height: "42px" }}
              type="date"
            />
            <Form.Input
              label="Service Request"
              required
              placeholder="serviceRequest"
              name="serviceRequest"
              value={serviceRequest}
              onChange={handleChange}
              icon="user"
              iconPosition="left"
              style={{ width: "435px", height: "42px" }}
              type="text"
            />
            <Form.Input
              label="Medical Issues"
              required
              placeholder="Allergies"
              name="medicalIssues"
              value={medicalIssues}
              onChange={handleChange}
              icon="medkit"
              iconPosition="left"
              style={{ width: "435px", height: "42px" }}
              type="text"
            />
          </Form.Group>
          <Divider hidden className="clientCreatorDivider"/>
          {/*Address, City, State*/}
          <Form.Group
            unstackable
            style={{ justifyContent: "space-between", textAlign: "left" }}
            className="inputClient"
          >
            <Form.Input
              label="Address"
              required
              placeholder="Address"
              name="address"
              value={address}
              onChange={handleChange}
              icon="home"
              iconPosition="left"
              style={{ width: "435px", height: "42px" }}
              type="text"
            />
            <Form.Input
              label="City"
              required
              placeholder="City"
              name="city"
              value={city}
              onChange={handleChange}
              icon="road"
              iconPosition="left"
              style={{ width: "435px", height: "42px" }}
              type="text"
            />
            <Form.Input
              label="State"
              required
              placeholder="State"
              name="state"
              value={state}
              onChange={handleChange}
              icon="tree"
              iconPosition="left"
              style={{ width: "435px", height: "42px" }}
              type="text"
            />
          </Form.Group>
          <Divider hidden className="clientCreatorDivider"/>
          {/*Zip Code, Phone, Email */}
          <Form.Group
            unstackable
            style={{ justifyContent: "space-between", textAlign: "left" }}
            className="inputClient"
          >
            <Form.Input
              required
              label="Zip Code"
              placeholder="Zip Code"
              name="zipCode"
              value={zipCode}
              onChange={handleChange}
              icon="home"
              iconPosition="left"
              type="number"
              style={{ width: "435px", height: "42px" }}
            />

            <Form.Input
              required
              label="Phone Number"
              placeholder="Phone Number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              icon="phone"
              iconPosition="left"
              style={{ width: "435px", height: "42px" }}
              type="text"
            />

            <Form.Input
              required
              label="Email"
              placeholder="johndoe@example.com"
              name="email"
              value={email}
              onChange={handleChange}
              icon="envelope"
              iconPosition="left"
              type="email"
              style={{ width: "435px", height: "42px" }}
            />
          </Form.Group>
          <Divider hidden className="clientCreatorDivider"/>
          {/*Hair Menu */}
          <Divider hidden className="clientCreatorDivider"/>
          <Button
            onClick={() => setHidden(!hidden)}
            type="button"
            color="orange"
            style={{ textAlign: "center" }}
          >
            Show Hair Menu
          </Button>
          <Divider hidden className="clientCreatorDivider"/>
          <Form.Group>
            {hidden ? (
              <div
                className="grouping"
                style={{ padding: "2rem", marginLeft: "2.5%" }}
              >
                {/*Hair condition, Hair classification, scalp classification */}
                <Form.Group
                  unstackable
                  style={{
                    textAlign: "left",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Input
                    label="Hair Condition"
                    placeholder="Hair Condition"
                    name="hairCondition"
                    value={hairCondition}
                    onChange={handleChange}
                    style={{
                      width: "400px",
                      height: "38px",
                    }}
                    type="text"
                  />

                  <Form.Input
                    label="Hair Classification"
                    placeholder="Hair Classification"
                    name="hairClassification"
                    value={hairClassification}
                    onChange={handleChange}
                    style={{
                      width: "400px",
                      height: "38px",
                    }}
                    type="text"
                  />

                  <Form.Input
                    label="Scalp Condition"
                    placeholder="Scalp Condition"
                    name="scalpClassification"
                    value={scalpClassification}
                    onChange={handleChange}
                    style={{
                      width: "400px",
                      height: "38px",
                    }}
                    type="text"
                  />
                </Form.Group>
                <Divider hidden className="clientCreatorDivider"/>
                {/*Hair texture, growth patterns, hair density */}
                <Form.Group
                  unstackable
                  style={{
                    textAlign: "left",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Input
                    label="Hair Texture"
                    placeholder="Hair Texture"
                    name="hairTexture"
                    value={hairTexture}
                    onChange={handleChange}
                    style={{
                      width: "400px",
                      height: "38px",
                    }}
                    type="text"
                  />
                  <Form.Input
                    label="Growth Patterns"
                    placeholder="Growth Patterns"
                    name="growthPatterns"
                    value={growthPatterns}
                    onChange={handleChange}
                    style={{
                      width: "400px",
                      height: "38px",
                    }}
                    type="text"
                  />
                  <Form.Input
                    label="Hair Density"
                    placeholder="Hair Density"
                    name="hairDensity"
                    value={hairDensity}
                    onChange={handleChange}
                    style={{
                      width: "400px",
                      height: "38px",
                    }}
                    type="text"
                  />
                </Form.Group>
                <Divider hidden className="clientCreatorDivider"/>
                {/*Hair Porosity, Hair Elasticity, Hair Length */}
                <Form.Group
                  unstackable
                  style={{
                    textAlign: "left",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Input
                    label="Hair Porosity"
                    placeholder="Hair Porosity"
                    name="hairPorosity"
                    value={hairPorosity}
                    onChange={handleChange}
                    style={{
                      width: "400px",
                      height: "38px",
                    }}
                    type="text"
                  />

                  <Form.Input
                    label="Hair Elasticity"
                    placeholder="Hair Elasticity"
                    name="hairElasticity"
                    value={hairElasticity}
                    onChange={handleChange}
                    style={{
                      width: "400px",
                      height: "38px",
                    }}
                    type="text"
                  />
                  <Form.Input
                    label="Hair Length"
                    placeholder="Hair Length"
                    name="hairLength"
                    value={hairLength}
                    onChange={handleChange}
                    style={{
                      width: "400px",
                      height: "38px",
                    }}
                    type="text"
                  />
                </Form.Group>
              </div>
            ) : (
              <></>
            )}
          </Form.Group>
          <div style={{ textAlign: "left" }}>
            <Button
              color="orange"
              content="Signup"
              icon="signup"
              type="submit"
            />
          </div>
        </Segment>
      </Form>
    </>
  );
};

export default ClientCreator;

// import {
//   Button,
//   Divider,
//   Form,
//   Message,
//   Segment,
//   Dropdown,
//   Checkbox,
// } from "semantic-ui-react";
// import { useState, useRef, useEffect, Component } from "react";
// import axios from "axios";
// import catchErrors from "./util/catchErrors";
// import { setToken } from "./util/auth";

// import Router from "next/router";

// const ClientCreator = ({ stylist }) => {
//   const [client, setClient] = useState({
//     //Dont change stylist.email to stylist.firstName.
//     //Despite the naming (my bad), it is better to match based on email because email is unique, wereas name is not.
//     stylistName: stylist.email,
//     stylistPic: stylist.profilePicURL,
//     firstName: "",
//     lastName: "",
//     email: "",
//     age: "",
//     appointmentDate: "",
//     serviceRequest: "",
//     medicalIssues: "",
//     address: "",
//     city: "",
//     state: "",
//     phoneNumber: "",
//     zipCode: "",
//     hairCondition: "",
//     hairClassification: "",
//     scalpClassification: "",
//     hairTexture: "",
//     growthPatterns: "",
//     hairDensity: "",
//     hairElasticity: "",
//     hairPorosity: "",
//     hairLength: "",
//   });
//   const {
//     stylistName,
//     stylistPic,
//     firstName,
//     lastName,
//     email,
//     age,
//     appointmentDate,
//     serviceRequest,
//     medicalIssues,
//     address,
//     city,
//     state,
//     phoneNumber,
//     zipCode,
//     hairClassification,
//     hairCondition,
//     scalpClassification,
//     hairDensity,
//     hairTexture,
//     growthPatterns,
//     hairElasticity,
//     hairPorosity,
//     hairLength,
//   } = client;

//   //* Form States */
//   const [formLoading, setFormLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [submitDisabled, setSubmitDisabled] = useState(true);

//   const [showPassword, setShowPassword] = useState(false);

//   const inputRef = useRef(null);
//   const [highlighted, setHighlighted] = useState(false);
//   const [media, setMedia] = useState(null);
//   const [mediaPreview, setMediaPreview] = useState(null);
//   const [hidden, setHidden] = useState(false);

//   const [checkbox, setCheckbox] = useState("");

//   //* Functions */

//   // Sets form loading to true while form is being submitted
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormLoading(true);
//     let profilePicURL;

//     if (media !== null) {
//       const formData = new FormData();
//       formData.append("image", media, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       const res = await axios.post("/api/v1/uploads", formData);
//       profilePicURL = res.data.src;
//     }

//     if (media !== null && !profilePicURL) {
//       setFormLoading(false);
//       return res.status(500).send("Image Upload Failure");
//     }

//     try {
//       const res = await axios.post("/api/v1/client/clientCreator", {
//         client,
//       });
//       Router.push("/");
//     } catch (error) {
//       const errorMsg = catchErrors(error);
//       setErrorMsg(errorMsg);
//     }
//     setFormLoading(false);
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "media" && files.length > 0) {
//       setMedia(() => files[0]);
//       setMediaPreview(() => URL.createObjectURL(files[0]));
//       setHighlighted(true);
//     } else {
//       setClient((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   //* USE EFFECTS */
//   useEffect(() => {
//     setSubmitDisabled(
//       !(
//         stylistName &&
//         stylistPic &&
//         firstName &&
//         lastName &&
//         email &&
//         age &&
//         appointmentDate &&
//         serviceRequest &&
//         medicalIssues &&
//         address &&
//         city &&
//         state &&
//         phoneNumber &&
//         zipCode &&
//         hairClassification &&
//         hairCondition &&
//         scalpClassification &&
//         hairDensity &&
//         hairTexture &&
//         growthPatterns &&
//         hairElasticity &&
//         hairPorosity &&
//         hairLength
//       )
//     );
//   }, [client]);

//   return (
//     <>
//       <Form
//         style={{
//           width: "90vw",
//           margin: "0 auto",
//           marginTop: "3rem",
//           textAlign: "center",
//         }}
//         loading={formLoading}
//         error={errorMsg !== null}
//         onSubmit={handleSubmit}
//       >
//         <h1 style={{ textAlign: "center" }}>Fill out the form below.</h1>
//         <Segment style={{ overflow: "auto" }} className="clientCreatorHandheld">
//           <Message
//             error
//             content={errorMsg}
//             header="There was an Error!"
//             icon="meh"
//           />
//           {/*FirstName, LastName, Age */}
//           <Form.Group
//             unstackable
//             style={{ justifyContent: "space-between", textAlign: "left" }}
//             className="inputClient"
//           >
//             <Form.Input
//               required
//               label="First Name"
//               placeholder="John"
//               name="firstName"
//               value={firstName}
//               onChange={handleChange}
//               icon="user"
//               iconPosition="left"
//               style={{ width: "435px", height: "42px" }}
//               type="text"
//             />
//             <Form.Input
//               required
//               label="Last Name"
//               placeholder="Doe"
//               name="lastName"
//               value={lastName}
//               onChange={handleChange}
//               icon="user"
//               iconPosition="left"
//               style={{ width: "435px", height: "42px" }}
//               type="text"
//             />
//             <Form.Input
//               required
//               label="Age"
//               placeholder="age"
//               name="age"
//               value={age}
//               onChange={handleChange}
//               icon="birthday cake"
//               iconPosition="left"
//               type="number"
//               style={{ width: "435px", height: "42px" }}
//             />
//           </Form.Group>
//           <Divider hidden className="clientCreatorDivider" />
//           {/*Appointment Date, ServiceRequest, Medical */}
//           <Form.Group
//             unstackable
//             style={{ justifyContent: "space-between", textAlign: "left" }}
//             className="inputClient"
//           >
//             <Form.Input
//               required
//               label="Appointment Date"
//               placeholder="Today"
//               name="appointmentDate"
//               value={appointmentDate}
//               onChange={handleChange}
//               icon="time"
//               iconPosition="left"
//               style={{ width: "435px", height: "42px" }}
//               type="date"
//             />
//             <Form.Input
//               label="Service Request"
//               required
//               placeholder="serviceRequest"
//               name="serviceRequest"
//               value={serviceRequest}
//               onChange={handleChange}
//               icon="user"
//               iconPosition="left"
//               style={{ width: "435px", height: "42px" }}
//               type="text"
//             />
//             <Form.Input
//               label="Medical Issues"
//               required
//               placeholder="Allergies"
//               name="medicalIssues"
//               value={medicalIssues}
//               onChange={handleChange}
//               icon="medkit"
//               iconPosition="left"
//               style={{ width: "435px", height: "42px" }}
//               type="text"
//             />
//           </Form.Group>
//           <Divider hidden className="clientCreatorDivider" />
//           {/*Address, City, State*/}
//           <Form.Group
//             unstackable
//             style={{ justifyContent: "space-between", textAlign: "left" }}
//             className="inputClient"
//           >
//             <Form.Input
//               label="Address"
//               required
//               placeholder="Address"
//               name="address"
//               value={address}
//               onChange={handleChange}
//               icon="home"
//               iconPosition="left"
//               style={{ width: "435px", height: "42px" }}
//               type="text"
//             />
//             <Form.Input
//               label="City"
//               required
//               placeholder="City"
//               name="city"
//               value={city}
//               onChange={handleChange}
//               icon="road"
//               iconPosition="left"
//               style={{ width: "435px", height: "42px" }}
//               type="text"
//             />
//             <Form.Input
//               label="State"
//               required
//               placeholder="State"
//               name="state"
//               value={state}
//               onChange={handleChange}
//               icon="tree"
//               iconPosition="left"
//               style={{ width: "435px", height: "42px" }}
//               type="text"
//             />
//           </Form.Group>
//           <Divider hidden className="clientCreatorDivider" />
//           {/*Zip Code, Phone, Email */}
//           <Form.Group
//             unstackable
//             style={{ justifyContent: "space-between", textAlign: "left" }}
//             className="inputClient"
//           >
//             <Form.Input
//               required
//               label="Zip Code"
//               placeholder="Zip Code"
//               name="zipCode"
//               value={zipCode}
//               onChange={handleChange}
//               icon="home"
//               iconPosition="left"
//               type="number"
//               style={{ width: "435px", height: "42px" }}
//             />

//             <Form.Input
//               required
//               label="Phone Number"
//               placeholder="Phone Number"
//               name="phoneNumber"
//               value={phoneNumber}
//               onChange={handleChange}
//               icon="phone"
//               iconPosition="left"
//               style={{ width: "435px", height: "42px" }}
//               type="text"
//             />

//             <Form.Input
//               required
//               label="Email"
//               placeholder="johndoe@example.com"
//               name="email"
//               value={email}
//               onChange={handleChange}
//               icon="envelope"
//               iconPosition="left"
//               type="email"
//               style={{ width: "435px", height: "42px" }}
//             />
//           </Form.Group>
//           <Divider hidden className="clientCreatorDivider" />
//           {/*Hair Menu */}
//           <Divider hidden className="clientCreatorDivider" />
//           <Button
//             onClick={() => setHidden(!hidden)}
//             type="button"
//             color="orange"
//             style={{ textAlign: "center" }}
//           >
//             Show Hair Menu
//           </Button>
//           <Divider hidden className="clientCreatorDivider" />
//           <Form.Group>
//             {hidden ? (
//               <div
//                 className="grouping"
//                 style={{ padding: "2rem", marginLeft: "2.5%" }}
//               >
//                 {/*Hair condition, Hair classification, scalp classification */}
//                 <Form.Group
//                   unstackable
//                   style={{
//                     textAlign: "left",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <Form.Input
//                     label="Hair Condition"
//                     placeholder="Hair Condition"
//                     name="hairCondition"
//                     value={hairCondition}
//                     onChange={handleChange}
//                     style={{
//                       width: "400px",
//                       height: "38px",
//                     }}
//                     type="text"
//                   />

//                   <Form.Input
//                     label="Hair Classification"
//                     placeholder="Hair Classification"
//                     name="hairClassification"
//                     value={hairClassification}
//                     onChange={handleChange}
//                     style={{
//                       width: "400px",
//                       height: "38px",
//                     }}
//                     type="text"
//                   />

//                   <Form.Input
//                     label="Scalp Condition"
//                     placeholder="Scalp Condition"
//                     name="scalpClassification"
//                     value={scalpClassification}
//                     onChange={handleChange}
//                     style={{
//                       width: "400px",
//                       height: "38px",
//                     }}
//                     type="text"
//                   />
//                 </Form.Group>
//                 <Divider hidden className="clientCreatorDivider" />
//                 {/*Hair texture, growth patterns, hair density */}
//                 <Form.Group
//                   unstackable
//                   style={{
//                     textAlign: "left",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <Form.Input
//                     label="Hair Texture"
//                     placeholder="Hair Texture"
//                     name="hairTexture"
//                     value={hairTexture}
//                     onChange={handleChange}
//                     style={{
//                       width: "400px",
//                       height: "38px",
//                     }}
//                     type="text"
//                   />
//                   <Form.Input
//                     label="Growth Patterns"
//                     placeholder="Growth Patterns"
//                     name="growthPatterns"
//                     value={growthPatterns}
//                     onChange={handleChange}
//                     style={{
//                       width: "400px",
//                       height: "38px",
//                     }}
//                     type="text"
//                   />
//                   <Form.Input
//                     label="Hair Density"
//                     placeholder="Hair Density"
//                     name="hairDensity"
//                     value={hairDensity}
//                     onChange={handleChange}
//                     style={{
//                       width: "400px",
//                       height: "38px",
//                     }}
//                     type="text"
//                   />
//                 </Form.Group>
//                 <Divider hidden className="clientCreatorDivider" />
//                 {/*Hair Porosity, Hair Elasticity, Hair Length */}
//                 <Form.Group
//                   unstackable
//                   style={{
//                     textAlign: "left",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <Form.Input
//                     label="Hair Porosity"
//                     placeholder="Hair Porosity"
//                     name="hairPorosity"
//                     value={hairPorosity}
//                     onChange={handleChange}
//                     style={{
//                       width: "400px",
//                       height: "38px",
//                     }}
//                     type="text"
//                   />

//                   <Form.Input
//                     label="Hair Elasticity"
//                     placeholder="Hair Elasticity"
//                     name="hairElasticity"
//                     value={hairElasticity}
//                     onChange={handleChange}
//                     style={{
//                       width: "400px",
//                       height: "38px",
//                     }}
//                     type="text"
//                   />
//                   <Form.Input
//                     label="Hair Length"
//                     placeholder="Hair Length"
//                     name="hairLength"
//                     value={hairLength}
//                     onChange={handleChange}
//                     style={{
//                       width: "400px",
//                       height: "38px",
//                     }}
//                     // type="text"
//                   >
//                     <Form.Checkbox
//                       label="Long"
//                       // disabled
//                       // checked={teacherChecked}
//                       // key={iteration._id}
//                       onClick={() => {
//                         setCheckbox("Long");
//                       //   setSelectedTeacher(true);
//                       }}
//                     />
//                     <Form.Checkbox
//                       label="Middle"
//                       // disabled
//                       // checked={teacherChecked}
//                       // key={iteration._id}
//                       onClick={() => {
//                         setCheckbox("Long");
//                       //   setSelectedTeacher(true);
//                       }}
//                     />
//                     <Form.Checkbox
//                       label="Short"
//                       // disabled
//                       // checked={teacherChecked}
//                       // key={iteration._id}
//                       onClick={() => {
//                         setCheckbox("Long");
//                       //   setSelectedTeacher(true);
//                       }}
//                     />
//                   </Form.Input>
//                 </Form.Group>
//               </div>
//             ) : (
//               <></>
//             )}
//           </Form.Group>
//           <div style={{ textAlign: "left" }}>
//             <Button
//               color="orange"
//               content="Signup"
//               icon="signup"
//               type="submit"
//             />
//           </div>
//         </Segment>
//       </Form>
//     </>
//   );
// };

// export default ClientCreator;
