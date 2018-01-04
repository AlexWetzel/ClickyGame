import React, { Component } from 'react';
import Counter from "./components/Counter";
import update from "react-addons-update"
import Panel from "./components/Panel"
import './App.css';
import pictures from "./pictures.json";

class App extends Component {
  // Set the state of the pictures, the counter, and the message
  state = {
    pictures,
    count: 0,
    message: "Click a character to start the game!"
  };
  // Shuffle the pictures each turn
  shuffle = () => {
    // Copy the state of the pictures to be shuffled
    let shuffledPictures = this.state.pictures;

    // Fisher-Yates shuffle
    //=============================================
    let m = shuffledPictures.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = shuffledPictures[m];
      shuffledPictures[m] = shuffledPictures[i];
      shuffledPictures[i] = t;
    //==============================================
    }
    // Set the state to the shuffled pictures
    this.setState({ pictures: shuffledPictures })
  }

  // Reset the game
  reset = () => {
    // Set the counter to 0
    this.setState({ count: 0 });
    // Mark the pictures as not clicked
    this.state.pictures.map(picture => picture.isClicked = false);
  }

  // Increase the score and mark the clicked panel as clicked
  goodGuess = id => {
    // Copy the count state to a variable
    let c = this.state.count
    // Increment the count by 1
    c++
    // Search the state for the clicked picture
    let pic = this.state.pictures.filter(picture => picture.id === id)

    // Reassign the array as a single object
    pic = pic[0]
    // Mark the picture as clicked
    pic.isClicked = true;
    // Find the index of the picture in the state
    const index = this.state.pictures.findIndex((picture) => picture.id === pic.id);
    // Update the picture at its index
    const updatedPictures = update(this.state.pictures, {$splice: [[index, 1, pic]]});
    // Set the new state
    this.setState({ pictures: updatedPictures });

    // If the count reaches 12, all pictures have been clicked
    if (c >= 12) {
      this.setState({ message: "You did it! Click again to start over." })
    } else {
      this.setState({ message: "Good guess!" })
    }
    // Set the new count
    this.setState({ count: c })
  }

  // Method that determines the game logic based on if a panel has been clicked
  guess = (id, isClicked) => {    
    // If the panel has been clicked before
    if (isClicked === true) {
      // After the score reaches 12, it is displayed as 12 instead of resetting to 0
      if (this.state.count >= 12) {
        // The score is reset...
        let gameWin = new Promise((resolve, reject) => {
          this.reset();
          resolve();
        });
        // Then is immediately incremented for the user's guess
        gameWin.then(() => {
          this.goodGuess(id);
        });

      }
      // If the panel has been clicked, and is clicked again, the game is reset
      else {
      this.setState({ message: "Bad guess! You have to start over." })
      this.reset()
      }
    }
    // If the panel has not been clicked before, the counter goes up
    else {     
      this.goodGuess(id);
    }
    // Panels are shuffled after each guess
    this.shuffle();
  }

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