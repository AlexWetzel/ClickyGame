import React, { Component } from 'react';
import Counter from "./components/Counter";
import update from "react-addons-update"
import Panel from "./components/Panel"
import './App.css';
import pictures from "./pictures.json";

class App extends Component {
  // Set the state of the pictures and the counter
  state = {
    pictures,
    count: 0,
    message: "Click a character to start the game!"
  };

  shuffle = () => {
    let shuffledPictures = this.state.pictures;

    // Fisher-Yates shuffle
    let m = shuffledPictures.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = shuffledPictures[m];
      shuffledPictures[m] = shuffledPictures[i];
      shuffledPictures[i] = t;
    }

    this.setState({ pictures: shuffledPictures })
  }

  reset = () => {
    console.log("reset is called")
    this.setState({ count: 0 });
    console.log(this.state.count);
    this.state.pictures.map(picture => picture.isClicked = false);
  }

  goodGuess = id => {
    let c = this.state.count
    c++

    let pic = this.state.pictures.filter(picture => picture.id === id)

    pic = pic[0]

    pic.isClicked = true;
    const index = this.state.pictures.findIndex((picture) => picture.id === pic.id);
    const updatedPictures = update(this.state.pictures, {$splice: [[index, 1, pic]]});
    this.setState({ pictures: updatedPictures });

    if (c >= 12) {

      this.setState({ message: "You did it! Click again to start over." })
    } else {
      this.setState({ message: "Good guess!" })
    }
    this.setState({ count: c })
  }

  // Method that determines the game logic based on if a panel has been clicked
  guess = (id, isClicked) => {
  
    // If a panel has been clicked, the game is reset

    if (isClicked === true) {

      if (this.state.count >= 12) {


        let gameWin = new Promise((resolve, reject) => {
          this.reset();
          resolve();
        });

        gameWin.then(() => {
          this.goodGuess(id);
        });

      }
      else {
      this.setState({ message: "Bad guess! You have to start over." })
      this.reset()
      }
    }
    // If a panel has not been clicked, the counter goes up
    else {     
      this.goodGuess(id);
    }

    this.shuffle();
  }

      // Counter goes up if a clicked picture has not been clicked before
  render() {
    return(
      <div>
        <nav className="navbar navbar-dark bg-danger text-white">
          <div className="container">
            <div className="h1">Mario Click Game</div>
          </div>
        </nav>
        
        <br />

        <div className="container">

          <div className="row">
            <div className=" col-8">
              <div className="card border-danger text-center mr-3">
                <div className="card-body">
                  <h5 className="card-title">{this.state.message}</h5>                
                </div>
              </div>
            </div>
            <Counter count={this.state.count} />
          </div>

          <br />          
          
          <div className="row jumbotron opaque">
          </div>

          <div className="row jumbotron clear">
          {this.state.pictures.map(picture => (
            <Panel
              key={picture.id}
              id={picture.id}
              url={picture.url}
              name={picture.name}
              clicked={picture.isClicked}
              guess={this.guess}
            />
          ))}
          </div>
        </div>
      </div>
    )
  }
}




export default App;
