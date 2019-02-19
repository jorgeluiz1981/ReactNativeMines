import React ,{Component}from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import params from './src/params'
import Header from './src/components/Header'
import LevelSelection from './src/screens/LevelSelection'
import { 
  createMinedBoard,
  cloneBoard,
  opendField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed,
} from './src/functions'
import MineField from './src/components/MineField';


export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = this.createState()
  }

  minesAmount = () =>{
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)

  }

  createState = () =>{
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return{
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false,
    }
  }

  onOpenField = (row, column) =>{
    const board = cloneBoard(this.state.board)
    opendField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if(lost){
      showMines(board)
      Alert.alert('Você perdeu!', 'Tente novamente ' )
    }

    if(won){
      Alert.alert('Parabens', 'Você Venceu!')
    }

    this.setState({board, lost, won})
  }

  onSelectField = (row, column) =>{
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    const won = wonGame(board)
    
    if(won){
      Alert.alert('Parabéns', 'Você Venceu!')
    }

    this.setState({board, won})
  }

  onLevelSelected = level =>{
    params.difficultLevel = level
    this.setState(this.createState())
  }

  render() {
    return (
      <View style={styles.container}> 
        <LevelSelection inVisible = { this.state.showLevelSelection}
          onLevelSelected = {this.onLevelSelected}
          onCancel = {() =>this.setState({showLevelSelection: false})} />      
        <Header flagsLeft = {this.minesAmount() - flagsUsed(this.state.board)}
          onNewGame = {() => this.setState(this.createState())}
          onFlagPress ={() => this.setState({showLevelSelection: true })} />
        <View style={styles.board}>
          <MineField board={this.state.board} 
            onOpenField = {this.onOpenField}
            onSelectField = {this.onSelectField}/> 
        </View>        

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent:'flex-end',
  },
  board:{
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});
