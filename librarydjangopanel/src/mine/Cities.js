import React, {Component} from 'react'
import axios from "axios";
import City from "./City";
import {BrowserRouter, Link, Route, Switch, withRouter} from "react-router-dom";
import OneSignal from "react-onesignal";

class Cities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      provinces: [],
      current_city: {}
    }
  }

  componentDidMount() {
    OneSignal.init({
      appId: "f6cc14cd-b352-47a6-b352-23fcf3731f75"
    })

    axios.post("http://127.0.0.1:8000/blog/cities/")
      .then((res) => {
        // console.log(res.data.data.cities)
        this.setState({cities: res.data.data.cities})
        this.setState({provinces: res.data.data.provinces})
        // console.log(res.data.data.cities)
      }).catch(() => {
    })

  }

  render() {
    return (
      <>
        <BrowserRouter>
          Controls:<br/>
          <button className={"btn btn-primary"} onClick={() => {
            this.props.history.push("/library/city/0")
          }
          }>Add New City
          </button>
          <table className={"table table-stripped"}>
            <tr>
              <th>Title</th>
              <th>Province</th>
              <th>Options</th>
            </tr>
            {this.state.cities.map((value) => (
              <tr>
                <td id={value.id}>{value.title}</td>
                <td>{value.province}</td>
                <td>

                  <button id={value.id} className={"btn btn-success"} onClick={(e) => {
                    axios.post('http://127.0.0.1:8000/blog/cities/edit', {
                      id: value.id
                    }).then((res) => {
                      this.props.history.push('/library/city/'+value.id)
                    }).catch(() => {
                    })

                  }}>Edit
                  </button>

                  {/*<Link className={"btn btn-success"} to={'../../library/cities/create?id='+value.id}>Edit</Link>*/}

                  <button className={"btn btn-danger"} id={value.id} onClick={(e) =>
                    {
                    axios.post('http://127.0.0.1:8000/blog/cities/delete', {
                      id: value.id
                    }).then((res) => {
                      let temp = []
                      this.state.cities.map((v) => {
                        if (v.id != value.id) {
                          temp.push({"id": v.id, "title": v.title, "province": v.province})
                        }
                      })
                      this.setState({cities: temp})
                    }).catch(() => {
                    })
                  }}>Delete
                  </button>
                </td>
              </tr>
            ))}
          </table>
          {/*<Switch>*/}
          {/*  <Route path={':id'} component={City}/>*/}
          {/*</Switch>*/}
        </BrowserRouter>
      </>
    )
  }
}

export default withRouter(Cities)
