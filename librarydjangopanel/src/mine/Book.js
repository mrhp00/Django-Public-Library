// import React from 'react'
// import {withRouter} from "react-router-dom";
// import axios from "axios";
//
// class Book extends React.Component{
//   constructor(props) {
//     super(props);
//     this.state={
//       authors:[]
//     }
//   }
//
//   componentDidMount() {
//     axios.post("http://127.0.0.1:8000/blog/book/0")
//       .then((res)=>(
//         this.setState({authors:res.data.data.authors})
//       ))
//   }
//
//   render() {
//     return(
//       <>
//       <form>
//           <input type={"hidden"} name={"id"}/>
//         <div className={"form-group"}>
//           <label htmlFor="title">City Name:</label>
//             <input type={"text"} ref={this.titleval} className={"form-control"} placeholder={"Enter city's name"}/>
//         </div>
//       </>
//     )
//   }
// }
//
// export default withRouter(Book)
