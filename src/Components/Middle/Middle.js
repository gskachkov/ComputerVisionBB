import React, { Component } from "react";
import axios from "axios";
import Image from "../Image/Image";
import "./Middle.css";
import Entity from "../Entity/Entity";
import Konva from "konva";

class Middle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: [],
      addInput: false,
      colorInput: this.generateRandomColor(),
      labelInput: "",
      error: false,
      currEntity: -1
    };
  }

  generateRandomColor = () => Konva.Util.getRandomColor();

  componentDidMount() {
    this.getReq();
  }

  componentDidUpdate() {
    this.getReq();
  }

  getReq = () => {
    axios.get("/api/entities/").then(res => {
      this.setState({
        entities: res.data
      });
    });
  };

  addEntity = e => {
    e.preventDefault();
    if (e.target.label.value === "") {
      this.setState({ error: true });
    } else {
      const entity = {
        color: e.target.color.value,
        label: e.target.label.value
      };
      axios.post("/api/entities/", entity).then(res => {
        this.setState(state => {
          const entities = state.entities.push(res.data);
          return entities;
        });
      });
      this.setState({
        colorInput: this.generateRandomColor(),
        labelInput: "",
        error: false
      });
    }
  };

  changeInput = () => {
    this.setState({
      addInput: !this.state.addInput,
      colorInput: this.generateRandomColor(),
      error: false
    });
  };

  inputColorValueHandler = event => {
    this.setState({
      colorInput: event.target.value
    });
  };

  inputLabelValueHandler = event => {
    this.setState({
      labelInput: event.target.value
    });
  };

  entityClick = index => {
    if (this.state.currEntity === index) {
      this.setState({ currEntity: -1 });
    } else {
      this.setState({ currEntity: index });
    }
  };

  render() {
    const { currentImg } = this.props;
    const {
      entities,
      addInput,
      colorInput,
      labelInput,
      error,
      currEntity
    } = this.state;
    return (
      <div className="midleMain">
        <div className="leftbarNav">
          <p>Entities</p>
          <div
            title="Add entity"
            onClick={() => this.changeInput()}
            className={
              addInput ? "addBtn fas fa-user-slash" : "addBtn fas fa-user-plus"
            }
          >
            <span>{addInput ? "Close" : "Add entity"}</span>
          </div>
          <form
            style={
              addInput
                ? { visibility: "visible", opacity: "1", height: "57px" }
                : {}
            }
            onSubmit={this.addEntity}
          >
            <div
              className="errorField"
              style={
                error
                  ? { visibility: "visible", opacity: "1", height: "20px" }
                  : {}
              }
            >
              Incorrect input
            </div>
            <div className="inputBox">
              <label htmlFor="label">
                {"Label: "}
                <input
                  style={error ? { border: "1px solid maroon" } : {}}
                  type="text"
                  id="label"
                  value={labelInput}
                  onChange={this.inputLabelValueHandler}
                />
              </label>
            </div>
            <div className="inputBox">
              <label htmlFor="color">
                {"Color: "}
                <input
                  type="text"
                  id="color"
                  value={colorInput}
                  onChange={this.inputColorValueHandler}
                />
              </label>
            </div>
            <button title="Add entity" type="submit">
              <i className="fas fa-user-check" />
            </button>
          </form>
          <div className="items">
            {entities.map(item => (
              <Entity
                key={item.index}
                item={item}
                onClick={() => this.entityClick(item.index)}
              />
            ))}
            <style jsx>{`
              .item:nth-child(${currEntity + 1}) {
                background: whitesmoke;
                border: 2px solid #737373;
              }
            `}</style>
          </div>
        </div>
        <div className="targetImg">
          <p>Image</p>
          <Image currentImg={currentImg} />
        </div>
      </div>
    );
  }
}

export default Middle;
