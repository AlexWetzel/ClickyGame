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
    count: 0
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

    this.setState({pictures: shuffledPictures})
  }

  reset = () => {
    this.setState({count: 0});
    this.state.pictures.map(picture => picture.isClicked = false);
  }

  markAsClicked = pic => {
    pic.isClicked = true;
    const index = this.state.pictures.findIndex((picture) => picture.id === pic.id);
    const updatedPictures = update(this.state.pictures, {$splice: [[index, 1, pic]]});  // array.splice(start, deleteCount, item1)
    this.setState({pictures: updatedPictures});
  }

  // Method that determines the game logic based on if a panel has been clicked
  guess = (id, isClicked) => {
    // If a panel has been clicked, the game is reset
    if (isClicked === true) {
      this.reset()
    }
    // If a panel has not been clicked, the counter goes up
    else {
      this.setState({ count: this.state.count + 1 });
      let pic = this.state.pictures.filter(picture => picture.id === id)
      console.log(pic);
      
      this.markAsClicked(pic[0]);
    }

    this.shuffle();
  }

      // Counter goes up if a clicked picture has not been clicked before
  render() {
    return(
      <div>
        <nav className="navbar fixed-top navbar-dark bg-danger">
          <p className="navbar-brand">Mario Click Game</p>
        </nav>
        

        <div className="container">

          <Counter count={this.state.count} />;
          
          <div className="row jumbotron opaque">
          </div>

          <div className="row jumbotron clear">
          {this.state.pictures.map(picture => (
            <Panel
              key={picture.id}
              id={picture.id}
              url={picture.url}
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
