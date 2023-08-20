import React, { Component } from "react";
import axios from "axios";

export default class FileUploadComponent extends Component {
  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      image: "",
    };
  }
  onFileChange(e) {
    this.setState({ image: e.target.files[0] });
  }
  onSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", this.state.image);
    axios
      .post("http://localhost:8000/uploadImage", formData, {
        
      })
      .then((res) => {
        console.log(res);
      });
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
