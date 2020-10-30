import React, { Component } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./App.css";
import Particles from "react-particles-js";

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 0.5,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 3,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
};
class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      shortUrl: "",
      longUrl: "",
      isError: false,
      isLoading: false,
      error: null
    };
  }
  async handleSubmit() {
    // e.preventDefault();
    try {
      this.setState({ isLoading: true });
      let url = await axios.post("/api/url/shorten", {
        longUrl: this.state.longUrl
      });
      if (url) {
        this.setState({ shortUrl: url.data.shortUrl, isLoading: false });
      }
    } catch (err) {
      this.setState({
        isError: true,
        error: {
          status: err.response.status,
          message: err.response.data
        },
        isLoading: false
      });
    }
  }

  renderError() {
    setTimeout(() => {
      this.setState({ isError: null, err: null });
    }, 3000);
    let { message, status } = this.state.error;
    return (
      <div
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="mr-auto">Error {status}</strong>
          <button
            onClick={() => this.setState({ isError: null, err: null })}
            type="button"
            className="ml-2 mb-1 close"
            data-dismiss="toast"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    );
  }

  inputForm() {
    return (
      <div className="row justify-content-center">
        <div className="col-sm-8">
          <input
            style={{ width: "100%" }}
            onChange={e => this.setState({ longUrl: e.target.value })}
            type="text"
            className="form-control mb-2 mr-sm-2"
            id="inputLink"
            placeholder="Paste your link here..."
            value={this.state.longUrl}
          />
        </div>
        <div className="col-sm-2">
          <button
            type="submit"
            onClick={() => this.handleSubmit()}
            className="btn btn-success mb-2"
          >
            Shorten
          </button>
        </div>
      </div>
    );
  }

  reset() {
    this.setState({
      copied: false,
      shortUrl: "",
      longUrl: "",
      isError: false,
      isLoading: false,
      error: null
    });
  }

  output() {
    return (
      <div className="row justify-content-center">
        <div className="col-sm-8">
          <input
            disabled
            style={{ width: "100%" }}
            type="text"
            className="form-control mb-2 mr-sm-2"
            id="inputLink"
            placeholder=""
            value={this.state.shortUrl}
          />
        </div>
        <div className="col-sm-2">
          <CopyToClipboard
            text={this.state.shortUrl}
            onCopy={() => this.setState({ copied: true })}
          >
            <button
              disabled={this.state.shortUrl ? false : true}
              // style={{ width: "56%" }}
              className={`btn ${
                this.state.copied ? "btn-success" : "btn-success"
              } mb-2`}
            >
              {this.state.copied ? "Copied" : "Copy"}
            </button>
          </CopyToClipboard>
          <button
            className="btn btn-success mb-2"
            style={{
              marginLeft: "2px"
              // width: "42%"
            }}
            onClick={() => this.reset()}
          >
            Clear
          </button>
        </div>
      </div>
    );
  }

  spinner() {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  cardHeader() {
    return (
      <h5 className="card-header text-center">
        <span aria-label="Urily" role="img">
          🔗 
        </span>
        Shortly - A Simple URL Shortner
      </h5>
    );
  }

  cardFooter() {
    return (
      <div className="card-footer text-muted">
        <div className="float-left">
          <h6 style={{ cursor: "default" }}>
            <code>{"</>"}</code> with{" "}
            <span aria-label="Love" role="img">
              ❤️
            </span>{" "}
            by{" "}
            <a
              style={{ cursor: "pointer" }}
              href="https://tarunrajput.netlify.app"
              className="alert-link"
            >
              Tarun Chauhan
            </a>
          </h6>
        </div>

        <div className="float-right">
          <h6>
            <a
              href="https://github.com/tarunrajput/shortly"
              className="alert-link"
            >
              Source
            </a>
          </h6>
        </div>
      </div>
    );
  }

  render() {
    let isLoading = this.state.isLoading;
    return (
      
      <div className="App-header">
        <Particles className="particles" params={particlesOptions} />
      
        <div
          className="container"
          style={{
            opacity: isLoading ? 0.5 : 1
          }}
        >
          <div className="card rounded">
            {this.cardHeader()}
            <div className="card-body">
              {isLoading ? this.spinner() : null}
              {this.inputForm()}
              {this.output()}
            </div>
            {this.cardFooter()}
          </div>
        </div>
        {this.state.isError ? this.renderError() : null}
      </div>
    );
  }
}
export default App;
