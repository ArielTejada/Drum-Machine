const audioClips = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      id: 'Heater-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      id: 'Heater-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      id: 'Heater-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      id: 'Heater-4',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      id: 'Clap',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      id: "Kick-n'-Hat",
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          audioText: "Press a drum pad!",
          volume: 1
        }
        this.setAudioText = this.setAudioText.bind(this);
        this.setVolume = this.setVolume.bind(this);
    }  

setAudioText(newText){
  this.setState({
    audioText: newText
  });
}

setVolume(event){
  this.setState({
    volume: event.target.value
  });
}

    render(){

        return (
            <div>
                <div id="page-title" className="noselect">Drum Machine</div>
                <div id="drum-machine">
                  <div id="drumset-slot">
                    {audioClips.map((audioClip) => (
                      <DrumPad 
                        {...audioClip} 
                        key={audioClip.id}
                        volume={this.state.volume}
                        setAudioText={this.setAudioText}/>
                    ))}
                  </div>   
                  <div id="display-slot" className="noselect">
                    <div id="display">
                      <h3>{this.state.audioText}</h3>
                    </div>
                    <div id="controls">
                      <h2>Volume</h2>
                      <div id="volume"></div> 
                      <input 
                        type="range" 
                        max="1" 
                        min="0" 
                        step="0.01" 
                        value={this.state.volume}
                        onChange={(e) => this.setVolume(e)}
                      />
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}

class DrumPad extends React.Component {
  constructor(props){
    super(props);

    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

   playSound(){
    const sound = document.getElementById(this.props.keyTrigger);
    sound.volume = this.props.volume;
    sound.currentTime = 0;
    sound.play();
    const audioText = this.props.id;
    this.props.setAudioText(audioText);
   }

   componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(event) {
    if (event.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }

  render(){

    return (
      <div onClick={this.playSound} className="drum-pad noselect" id={this.props.id}>
        {this.props.keyTrigger}
        <audio 
          className="clip"  
          id={this.props.keyTrigger}
          src={this.props.url}/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
