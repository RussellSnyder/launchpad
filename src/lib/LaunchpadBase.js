const debug = require('debug');
const {EventEmitter} = require('events');

const Color = require('./Color');
const generateBlankSquare = require('./generateBlankSquare');

class LaunchpadBase extends EventEmitter {
    constructor() {
        super()

        this._debug = debug('lp:launchpad')
        this._squares = generateBlankSquare(Color.BLACK)
        this._functionX = [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK]
        this._functionY = [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK]
    }

    clearSquares() {
        this.updateBoard(generateBlankSquare(Color.BLACK))

        return this
    }

    clearAll() {
        this.updateBoard(
            generateBlankSquare(Color.BLACK),
            [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK],
            [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK]
        )

        return this
    }

    getSquare(x, y) {
        return this._squares[x][y]
    }

    setSquare (x, y, color, shouldFlush = true) {
        this._squares[x][y] = color
        this._setSquare(x, y, color)

        if (shouldFlush) {
            this._flush()
        }

        return this
    }

    getFunctionX(x) {
        return this._functionX[x]
    }

    setFunctionX(x, color, shouldFlush = true) {
        this._functionX[x] = color
        this._setFunctionX(x, color)

        if (shouldFlush) {
            this._flush()
        }

        return this
    }

    getFunctionY(y) {
        return this._functionX[y]
    }

    setFunctionY(y, color, shouldFlush = true) {
        this._functionY[y] = color
        this._setFunctionY(y, color)

        if (shouldFlush) {
            this._flush()
        }

        return this
    }

    _selectSquare(x, y) {
        this.emit('input', x, y);
    }

    _selectFunctionX(x) {
        this.emit('functionX', x)
    }

    _selectFunctionY(y) {
        this.emit('functionY', y)
    }

    updateBoard (squares, functionX = null, functionY = null) {
        if (squares) {
            for (let x = 0; x < squares.length; x++) {
                for (let y = 0; y < squares[x].length; y++) {
                    let color = squares[x][y]

                    if (!color) continue

                    if (this._squares[x][y].getCode() !== color.getCode()) {
                        this.setSquare(x, y, color, true)
                    }
                }
            }
        }

        if (functionX) {
            for (let x = 0; x < functionX.length; x++) {
                let color = functionX[x]

                if (!color) continue

                if (this._functionX[x].getCode() !== color.getCode()) {
                    this.setFunctionX(x, color, true)
                }
            }
        }

        if (functionY) {
            for (let y = 0; y < functionY.length; y++) {
                let color = functionY[y]

                if (!color) continue

                if (this._functionY[y].getCode() !== color.getCode()) {
                    this.setFunctionY(y, color, false)
                }
            }
        }

        this._flush()

        return this
    }
}

module.exports = LaunchpadBase;