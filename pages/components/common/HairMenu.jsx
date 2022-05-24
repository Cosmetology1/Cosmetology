import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
class HairMenu extends Component {
  constructor() {
    super();
    this.state = {
      showHairMenu: false,
    };
    this.hideComponent = this.hideComponent.bind(this);
  }

  hideComponent(menu) {
    switch (menu) {
      case "showHairMenu":
        this.setState({ showHairMenu: !this.state.showHairMenu });
        break;

      default:
        null;
    }
  }

  render() {
    const { showHairMenu } = this.state;
    return (
      <div>
        <Button
          onClick={() => this.hideComponent("showHairMenu")}
          style={{ marginLeft: "160px", height: "80px", width: "1200px", marginTop: "50px"}}
          content="Hair Menu"
          color="navy blue"
      
        />

        {showHairMenu && (
          <>
            <Form
              style={{
                backgroundColor: "orange",

                marginTop: "20px",

                padding: "50px",
                
              }}
            >
              <Form.Group unstackable widths={3}>
                <Form.Input
                  label="Hair Condition"
                  placeholder="Hair Condition"
                  style={{ width: "435px", height: "96px" }}
                />

                <Form.Input
                  label="Hair Classification"
                  placeholder="Hair Classification"
                  style={{ width: "435px", height: "96px" }}
                />

                <Form.Input
                  label="Scalp Condition"
                  placeholder="Scalp Condition"
                  style={{ width: "435px", height: "96px" }}
                />
              </Form.Group>

              <Form.Group unstackable widths={3}>
                <Form.Input
                  label="Hair Texture"
                  placeholder="Hair Texture"
                  style={{ width: "435px", height: "96px" }}
                />

                <Form.Input
                  label="Growth Patterns"
                  placeholder="Growth Patterns"
                  style={{ width: "435px", height: "96px" }}
                />

                <Form.Input
                  label="Hair Density"
                  placeholder="Hair Density"
                  style={{ width: "435px", height: "96px" }}
                />
              </Form.Group>

              <Form.Group unstackable widths={3}>
                <Form.Input
                  label="Hair Porosity"
                  placeholder="Hair Porosity"
                  style={{ width: "435px", height: "96px" }}
                />

                <Form.Input
                  label="Hair Elasticity"
                  placeholder="Hair Elasticity"
                  style={{ width: "435px", height: "96px" }}
                />

                <Form.Input
                  label="Hair Length"
                  placeholder="Hair Length"
                  style={{ width: "435px", height: "96px" }}
                />
              </Form.Group>
            </Form>
          </>
        )}
        {showHairMenu && <Button type="submit"  style={{ marginTop: "50px", marginLeft: "50px", height: "50px", width: "100px"}}>Submit</Button>}
      </div>
    );
  }
}

export default HairMenu;
