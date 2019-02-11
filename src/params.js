import {Dimensions} from 'react-native'

const params = {
    blockSize : 30, //tamanho do bloco
    borderSize: 5 , //tamanho da borda
    fontSize: 15, //tamanho da fonte
    headerRatio: 0.15, //area do cadeçalho vai ser 15%
    difficultLevel: 0.1, //dificudado do jogo
    //metodo para calcular colunas (horizontal)
    getColumnsAmount(){
        const width =Dimensions.get('window').width
        return Math.floor(width / this.blockSize)
    },
    //calcula o numero de linhas(vertical)
    getRowsAmount(){
        const totalHeight = Dimensions.get('window').height
        const boardHeight = totalHeight * (1 - this.headerRatio)
        return Math.floor(boardHeight / this.blockSize)
    }

}

export default params

