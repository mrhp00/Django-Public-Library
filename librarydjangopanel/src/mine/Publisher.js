import React from 'react'
import {withRouter} from "react-router-dom";
import axios from "axios";

class Publisher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      provinces: [],
      prv: "1",
    }
  }

  componentDidMount() {
      axios.post("http://127.0.0.1:8000/blog/provinces/")
        .then((res) => {
          // console.log(res.data)
          this.setState({provinces: res.data.data.provinces})
        })
        .catch(() => {
        })


    if (this.props.match.params.id == "0") {

    }
  }

  render() {
    return (

      <>
        <select
          onChange={(e) => {
            {if (e.target.value != 0){
              axios.post("http://127.0.0.1:8000/blog/cities/get/province/", {
              province: e.target.value
            }).then((res) => {
              this.setState({cities: res.data.data.cities})
                console.log(res.data)
            }).catch()
            }}
          }}>
          <option value={'0'} disabled selected>Select One</option>
          {this.state.provinces.map((value) => (
            <option value={value.id} id={value.id} onSelect={() => {
              this.setState({prv: value.id})
            }}>{value.title}</option>
          ))}
        </select>
        <select>
          {this.state.cities.map((value) => (
            <option value={value.id}>{value.title}</option>
          ))}
        </select>
      </>
    )
  }
}

export default withRouter(Publisher)
