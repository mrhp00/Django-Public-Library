import React from 'react'
import axios from "axios";
import {withRouter} from "react-router-dom";
import OneSignal from "react-onesignal";

class City extends React.Component {
  constructor(props) {
    super(props);
    this.idval = React.createRef()
    this.titleval = React.createRef()
    this.provinceval = React.createRef()
    this.state = {
      provinces: [],
      editing: 'false',
      prv: 0
      // cityid:"",
      // citytitle:"",
      // cityprovince:""
    }
  }

  componentDidMount() {

    if (this.props.match.params.id == "0") {

      axios.post("http://127.0.0.1:8000/blog/cities/create")
        .then((res) => {

          this.setState({provinces: res.data.data.provinces})

        }).catch(() => {
      })

    } else {
      axios.post('http://127.0.0.1:8000/blog/cities/edit', {
        id: this.props.match.params.id
      }).then((res) => {
        console.log(res.data)
        this.idval.current.value = res.data.data.city.id
        this.titleval.current.value = res.data.data.city.title
        this.provinceval.current.value = res.data.data.city.province
        this.setState({provinces: res.data.data.provinces})
        this.setState({prv: res.data.data.city.province})
      }).catch()
    }

    // axios.post("http://127.0.0.1:8000/blog/cities/create")
    //   .then((res) => {
    //
    //     this.setState({provinces: res.data.data.provinces})
    //
    //   }).catch(() => {
    // })
    // let quaryparams = new URLSearchParams(window.location.search)
    // let edit = quaryparams.get('editmode')
    // let cid = quaryparams.get('id')
    // let cname = quaryparams.get('title')
    // let cprovince = quaryparams.get('province')
    // console.log(edit, cid, cname, cprovince)
    // // if (cname!=="") {
    // this.setState({editing: edit})
    // this.idval.current.value = cid
    // this.titleval.current.value = cname
    // this.provinceval.current.value = cprovince
    // // }

  }


  render() {
    return (
      <>
        <form>
          <input type={"hidden"} ref={this.idval} name={"id"} id={"id"}/>
          <div className="form-group">
            <label htmlFor="title">City Name:</label>
            <input type={"text"} ref={this.titleval} className={"form-control"} placeholder={"Enter city's name"}
                   name={"title"}
                   id={"title"}/>
          </div>
          <div>
            <select name={"province"} value={this.state.prv} ref={this.provinceval} onChange={(e) => {
              this.setState({prv: e.target.value})
            }}>
              {this.state.provinces.map((value) => (
                <option value={value.id}>{value.title}</option>
              ))}
            </select>
          </div>
          <br/>
          <button type="button" className="btn btn-primary" onClick={(e) => {
            if (this.props.match.params.id == "0") {
              axios.post('http://127.0.0.1:8000/blog/cities/store', {
                title: this.titleval.current.value,
                province: this.provinceval.current.value,
              }).then((res) => {
                console.log(res)
                this.props.history.push("/library/cities")
              }).catch(() => {
              })
            } else {
              axios.post('http://127.0.0.1:8000/blog/cities/update', {
                id: this.idval.current.value,
                title: this.titleval.current.value,
                province: this.provinceval.current.value,
              }).then((res) => {
                this.props.history.push("/library/cities")
              }).catch(() => {
              })
            }
          }
          }>Submit
          </button>
        </form>
      </>
    )
  }
}

export default withRouter(City)
