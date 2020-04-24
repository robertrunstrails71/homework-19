import React from "react";
import "./styles/App.css";
import EmployeeList from "./components/EmployeeList";
import AddForm from "./components/AddForm";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
// import team from "./team.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employee_list: [],
      showAddForm: false
    };

    this.saveEmployee = this.saveEmployee.bind(this);
    this.deleteEmployer = this.deleteEmployer.bind(this);
  }

  showAddForm() {
    this.setState({ showAddForm: !this.state.showAddForm });
  }

  saveEmployee(val) {
    this.state.employee_list.push(val);
    localStorage.setItem("list", JSON.stringify(this.state.employee_list));
    this.setState({ showAddForm: false });
  }

  deleteEmployer(val) {
    this.state.employee_list.splice(val, 1);
    this.setState({ employee_list: this.state.employee_list });
    localStorage.setItem("list", JSON.stringify(this.state.employee_list));
  }

  componentDidMount() {
    const list = JSON.parse(localStorage.getItem("list"));
    this.setState({ employee_list: list ? list : [] });
  }

  render() {
    return (
      <Wrapper>
        <Header />
        <div className="App">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="text-center mt-3 mb-5">
                  Dream Team
                  <button
                    className="btn btn-success pull-right"
                    onClick={this.showAddForm.bind(this)}
                  >
                    +
                  </button>
                </h2>
              </div>
            </div>
            {!this.state.showAddForm ? (
              <div className="row">
                <div className="col-12">
                  <EmployeeList
                    deleteEmployer={this.deleteEmployer}
                    list={this.state.employee_list}
                  />
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-12">
                  <AddForm saveEmployee={this.saveEmployee} />
                </div>
              </div>
            )}
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default App;
