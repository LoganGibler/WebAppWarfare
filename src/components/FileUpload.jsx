import React, { Component } from "react";
import axios from "axios";

export default class FileUploadComponent extends Component {
  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      image: "",
      guide_id: this.props.id,
      step_index: this.props.stepCounter,
    };
  }

  onFileChange(e) {
    this.setState({ image: e.target.files[0] });
  }
  onSubmit(e) {
    e.preventDefault();
    // console.log("this.state passed in values", this.state);
    const formData = new FormData();
    formData.append("image", this.state.image);
    formData.append("step_index", this.state.step_index);
    formData.append("guide_id", this.state.guide_id);
    console.log("this formdata",formData)
    axios.post("http://localhost:8000/uploadImage", formData, {})
      .then((res) => {
        console.log(res);
      });
    
    // axios
    //   .post("http://localhost:8000/uploadImage", {
    //     image: this.state.image,
    //     guide_id: this.state.guide_id,
    //     step_index: this.state.step_index,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   });
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.onSubmit}>
            <div>
              <input type="file" onChange={this.onFileChange} />
            </div>
            <div>
              <button type="submit">Upload Img</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
