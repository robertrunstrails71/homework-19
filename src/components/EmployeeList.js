import React from "react";

class EmployeeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      sort: "first"
    };

    this.deleteEmployer = this.deleteEmployer.bind(this);
  }

  listFilter() {
    let result = this.props.list.filter(
      el =>
        el.last.toLowerCase().includes(this.state.keyword.toLowerCase()) ||
        el.first.toLowerCase().includes(this.state.keyword.toLowerCase()) ||
        el.position.toLowerCase().includes(this.state.keyword.toLowerCase()) ||
        el.email.toLowerCase().includes(this.state.keyword.toLowerCase())
    );

    const elsort = this.state.sort;

    return result.sort((a, b) =>
      a[elsort] > b[elsort] ? 1 : b[elsort] > a[elsort] ? -1 : 0
    );
  }

  onKeyUp(e) {
    this.setState({ keyword: e.target.value });
  }

  deleteEmployer(index) {
    this.props.deleteEmployer(index);
  }

  render() {
    return (
      <div className="EmployList">
        <div className="row">
          <div className="col-12">
            <div className="">
              <input
                onKeyUp={this.onKeyUp.bind(this)}
                placeholder="Search"
                type="text"
                className="form-control mb-3"
              />
            </div>
          </div>
        </div>

        <table className="table table-striped table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th onClick={() => this.setState({ sort: "first" })}>First</th>
              <th onClick={() => this.setState({ sort: "last" })}>Last</th>
              <th onClick={() => this.setState({ sort: "position" })}>
                Position
              </th>
              <th onClick={() => this.setState({ sort: "email" })}>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.listFilter() &&
              this.listFilter().map((el, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{el.first}</td>
                    <td>{el.last}</td>
                    <td>{el.position}</td>
                    <td>{el.email}</td>
                    <td>
                      <button
                        onClick={() => this.deleteEmployer(index)}
                        className="btn btn-danger btn-sm"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default EmployeeList;
