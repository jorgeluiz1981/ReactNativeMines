//função que criar o tabuleiro
const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) =>{
            return{
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    }) 
}//fim do createBoard

//função que espalha as minas
const spreadMines = (board, minesAmount) =>{ 
    const rows = board.length
    const columns = board[0].length
    let minesPlanted = 0

    while (minesPlanted < minesAmount){
        const rowSel = parseInt(Math.random() * rows, 10)
        const columnSel = parseInt(Math.random() * columns, 10)

        if(!board[rowSel][columnSel].mined){
            board[rowSel][columnSel].mined = true
            minesPlanted++
        }
    }
}//fim do spreadMines

//criar o tabuleiro com as minas espanhadas
const createMinedBoard = (rows, columns, minesAmount) =>{
    const board = createBoard(rows, columns)
    spreadMines(board, minesAmount)
    return board
}//fim do createMinedBoard

//criar um clone do bord
const cloneBoard = board => {
    return board.map(rows =>{
        return rows.map(field =>{
            return{ ...field}
        })
    })
}//fim do cloneBoard

//metodo para descobrit os elemetos vizinhos
const getNeighbors = (board, row, column) =>{
    const neighbors = []
    const rows = [row -1, row, row +1]
    const columns = [column -1, column, column +1]
    rows.forEach(r =>{
            columns.forEach(c => {
            const diferent = r !== row || c !==column 
            const validRow = r >= 0 && r < board.length  // verifica se a linha e validar
            const validColumn = c >= 0 && c < board[0].length // verifica se a linha e validar
            if(diferent && validRow && validColumn){
                neighbors.push(board[r][c])
            }
        })
    })
    return neighbors
}//fim do getNeighbors 

//verifida se a vizinhança é segura
const safeNeighborhood = (board, row, column) =>{
    const safes = (result, neighbors) => result && !neighbors.mined
    return getNeighbors(board, row, column).reduce(safes, true)
}//fim do safeNeighborhood

const opendField = (board, row, column) =>{
    const field = board[row][column]
    if (!field.opened){
        field.opened = true
        if (field.mined){
            field.exploded = true
        } else if(safeNeighborhood(board, row, column)){
            getNeighbors(board, row, column)
                .forEach(n => opendField(board, n.row, n.column))
        }else {
            const neighbors = getNeighbors(board, row, column)
            field.nearMines = neighbors.filter(n => n.mined).length
        }
    }//fim do if
}//Fim opendField 

const fields = board =>[].concat(...board)
const hadExplosion = board => fields(board)
    .filter(field => field.exploded).length > 0
const pendding = field =>(field.mined && !fields.flagged)
    || (!field.mined && !field.opened)
const wonGame = board =>fields(board).filter(pendding).length === 0
const showMines = board => fields(board).filter(field =>field.mined)
    .forEach(field => field.opened =true)

const invertFlag = (board, row, column) =>{
    const field = board[row][column]
    field.flagged = !field.flagged
}

//exporta os metodo 
export {
    createMinedBoard,
    cloneBoard,
    opendField,
    hadExplosion,
    showMines,
    wonGame,
    invertFlag, 
}