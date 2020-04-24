import React from "react";

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: "",
      last: "",
      position: "",
      email: "",
      error: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  saveEmployee() {
    if (
      !this.state.last ||
      !this.state.first ||
      !this.state.position ||
      !this.state.email
    ) {
      this.setState({ error: "All Fields should be filled!" });
    } else {
      let data = { ...this.state };
      delete data.error;
      this.props.saveEmployee(data);
    }
  }

  render() {
    return (
      <div className="addForm">
        <div className="form-row mb-3">
          <div className="col">
            <input
              type="text"
              name="first"
              className="form-control"
              placeholder="First name"
              onChange={this.handleChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="last"
              className="form-control"
              placeholder="Last name"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="form-row mb-3">
          <div className="col">
            <input
              type="text"
              name="position"
              className="form-control"
              placeholder="Postion"
              onChange={this.handleChange}
            />
          </div>
          <div className="col">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              onChange={this.handleChange}
            />
          </div>
        </div>

        {this.state.error && (
          <div className="row my-2">
            <div className="col-12 text-center text-danger">
              {this.state.error}
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-12 text-center">
            <button
              onClick={this.saveEmployee.bind(this)}
              className="btn btn-success"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddForm;
