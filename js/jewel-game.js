// Generated by CoffeeScript 1.3.3
(function() {

  if (window.eur00t == null) {
    window.eur00t = {};
  }

  if (window.eur00t.jewel == null) {
    window.eur00t.jewel = {};
  }

  /*
    Get random integer function.
    If supplied 2 arguments: result is in range [from, to]
    If 1 argument: [0, from]
  */


  window.eur00t.getRandomInt = function(from, to) {
    if (arguments.length === 2) {
      return from + Math.floor(Math.random() * (to - from + 1));
    } else if (arguments.length === 1) {
      return Math.floor(Math.random() * (from + 1));
    } else {
      return 0;
    }
  };

  /*
    Colors of gems. Each color has correspondent CSS class.
  */


  window.eur00t.jewel.COLORS = ['orange', 'brown', 'yellow', 'blue', 'green', 'red'];

  /*
    Value of game speed.
  */


  window.eur00t.jewel.SPEED = 600;

  /*
    Main game constructor.
    
    jQueryContainer: append game to this container ($(document.body) default)
    boardW, boardH: width and height of board in item units (8x8 default)
    size: size of gem item (60 default)
    gap: gap between gems (2 default)
    border: value of gem's border
  */


  window.eur00t.jewel.Game = function(jQueryContainer, boardW, boardH, size, gap, border) {
    var i, j, _i, _item, _j;
    if (jQueryContainer == null) {
      jQueryContainer = $(document.body);
    }
    if (boardW == null) {
      boardW = 8;
    }
    if (boardH == null) {
      boardH = 8;
    }
    if (size == null) {
      size = 60;
    }
    if (gap == null) {
      gap = 2;
    }
    if (border == null) {
      border = 1;
    }
    this.jQueryContainer = jQueryContainer;
    this.board = this._generateGameBoard(eur00t.compiledTemplates.jewel.board, boardW, boardH, size, gap);
    this.scoresIndicator = $(eur00t.compiledTemplates.jewel.scores());
    this.matrix = [];
    this.size = size;
    this.gap = gap;
    this.border = border;
    this.scores = 0;
    this.boardW = boardW;
    this.boardH = boardH;
    for (i = _i = 0; 0 <= boardH ? _i < boardH : _i > boardH; i = 0 <= boardH ? ++_i : --_i) {
      this.matrix.push([]);
      for (j = _j = 0; 0 <= boardW ? _j < boardW : _j > boardW; j = 0 <= boardW ? ++_j : --_j) {
        _item = this._generateItem(eur00t.compiledTemplates.jewel.item, size, gap, i, j, border);
        _item.elem.data({
          i: i,
          j: j,
          color: _item.data.color
        });
        this.matrix[i].push(_item.elem);
        this.board.append(_item.elem);
      }
    }
    this._initialize();
    return this;
  };

  window.eur00t.jewel.Game.prototype._generateGameBoard = function(template, boardW, boardH, size, gap) {
    return $(template({
      width: boardW * (size + 2 * gap),
      height: boardH * (size + 2 * gap)
    }));
  };

  window.eur00t.jewel.Game.prototype._generateItem = function(template, size, gap, i, j, border) {
    var color;
    color = eur00t.jewel.COLORS[eur00t.getRandomInt(eur00t.jewel.COLORS.length - 1)];
    return {
      elem: $(template({
        color: color,
        size: size,
        gap: gap,
        i: i,
        j: j,
        border: border
      })),
      data: {
        color: color
      }
    };
  };

  window.eur00t.jewel.Game.prototype._cancelPreviousSelect = function() {
    if (this.selected.obj != null) {
      if (this.selected.obj != null) {
        this.selected.obj.removeClass('selected');
      }
      this.selected.obj = null;
      this.selected.i = -1;
      this.selected.j = -1;
      return true;
    } else {
      return false;
    }
  };

  window.eur00t.jewel.Game.prototype._selectItem = function(i, j) {
    this._cancelPreviousSelect();
    this.selected.obj = this.matrix[i][j];
    this.selected.i = i;
    this.selected.j = j;
    return this.selected.obj.addClass('selected');
  };

  window.eur00t.jewel.Game.prototype._setPosition = function(elem, i, j) {
    if (elem !== null) {
      elem.css({
        left: this.gap + j * (this.size + 2 * this.gap) - this.border,
        top: this.gap + i * (this.size + 2 * this.gap) - this.border
      });
      return elem.data({
        i: i,
        j: j
      });
    }
  };

  window.eur00t.jewel.Game.prototype._swapItems = function(i0, j0, i, j) {
    var from, to, _ref;
    from = this.matrix[i0][j0];
    to = this.matrix[i][j];
    this._setPosition(from, i, j);
    this._setPosition(to, i0, j0);
    _ref = [to, from], this.matrix[i0][j0] = _ref[0], this.matrix[i][j] = _ref[1];
    return true;
  };

  window.eur00t.jewel.Game.prototype._ifEqualType = function(i0, j0, i, j) {
    return this.matrix[i0][j0].data('color') === this.matrix[i][j].data('color');
  };

  window.eur00t.jewel.Game.prototype._destroyObj = function(obj, hidden) {
    if (!hidden) {
      obj.obj.fadeOut(window.eur00t.jewel.SPEED);
      this.scores += 1;
    } else {
      obj.obj.remove();
    }
    return this.matrix[obj.i][obj.j] = null;
  };

  window.eur00t.jewel.Game.prototype._refreshScores = function() {
    return this.scoresIndicator.children('h2').text(this.scores);
  };

  window.eur00t.jewel.Game.prototype._processDestroyResult = function(hidden) {
    var item, _i, _len, _ref;
    if (this.destroy.length >= 2) {
      _ref = this.destroy;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        this._destroyObj(item, hidden);
      }
      return true;
    } else {
      return false;
    }
  };

  window.eur00t.jewel.Game.prototype._processDestroyDirection = function(i, j, iteratorI, iteratorJ, postIteration) {
    var newIterators;
    while (((0 <= iteratorI && iteratorI < this.boardH)) && ((0 <= iteratorJ && iteratorJ < this.boardW)) && (this.matrix[iteratorI][iteratorJ] !== null) && (this._ifEqualType(i, j, iteratorI, iteratorJ))) {
      this.destroy.push({
        obj: this.matrix[iteratorI][iteratorJ],
        i: iteratorI,
        j: iteratorJ
      });
      newIterators = postIteration(iteratorI, iteratorJ);
      iteratorI = newIterators.iteratorI;
      iteratorJ = newIterators.iteratorJ;
    }
    return true;
  };

  window.eur00t.jewel.Game.prototype._destroyLinearVertical = function(i, j, hidden) {
    this.destroy = [];
    this._processDestroyDirection(i, j, i + 1, j, function(i, j) {
      return {
        iteratorI: i + 1,
        iteratorJ: j
      };
    });
    this._processDestroyDirection(i, j, i - 1, j, function(i, j) {
      return {
        iteratorI: i - 1,
        iteratorJ: j
      };
    });
    return this._processDestroyResult(hidden);
  };

  window.eur00t.jewel.Game.prototype._destroyLinearHorizontal = function(i, j, hidden) {
    this.destroy = [];
    this._processDestroyDirection(i, j, i, j + 1, function(i, j) {
      return {
        iteratorI: i,
        iteratorJ: j + 1
      };
    });
    this._processDestroyDirection(i, j, i, j - 1, function(i, j) {
      return {
        iteratorI: i,
        iteratorJ: j - 1
      };
    });
    return this._processDestroyResult(hidden);
  };

  window.eur00t.jewel.Game.prototype._checkIfSelectable = function(i, j, hidden) {
    if (this.selected.obj === null) {
      return true;
    } else if (((this.selected.i === i) && (Math.abs(this.selected.j - j) < 2)) || ((this.selected.j === j) && (Math.abs(this.selected.i - i) < 2))) {
      if ((i === this.selected.i) && (j === this.selected.j)) {
        this._cancelPreviousSelect();
        return false;
      } else {
        if (this._ifEqualType(i, j, this.selected.i, this.selected.j)) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return true;
    }
  };

  window.eur00t.jewel.Game.prototype._compactizeBoard = function() {
    var i, iterator, j, newMatrix, _fn, _i, _item, _j, _k, _l, _m, _ref, _ref1, _ref2, _ref3, _ref4, _ref5,
      _this = this;
    newMatrix = [];
    for (j = _i = 0, _ref = this.boardW; 0 <= _ref ? _i < _ref : _i > _ref; j = 0 <= _ref ? ++_i : --_i) {
      newMatrix.push([]);
      for (i = _j = _ref1 = this.boardH - 1; _ref1 <= 0 ? _j <= 0 : _j >= 0; i = _ref1 <= 0 ? ++_j : --_j) {
        if (this.matrix[i][j] !== null) {
          newMatrix[j].push(this.matrix[i][j]);
        }
      }
    }
    for (j = _k = 0, _ref2 = this.boardW; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; j = 0 <= _ref2 ? ++_k : --_k) {
      iterator = 0;
      for (i = _l = _ref3 = this.boardH - 1, _ref4 = this.boardH - 1 - newMatrix[j].length; _ref3 <= _ref4 ? _l < _ref4 : _l > _ref4; i = _ref3 <= _ref4 ? ++_l : --_l) {
        this.matrix[i][j] = newMatrix[j][iterator];
        this._setPosition(this.matrix[i][j], i, j);
        this.matrix[i][j].data({
          i: i,
          j: j
        });
        iterator += 1;
      }
      if ((this.boardH - 1 - newMatrix[j].length) >= 0) {
        iterator = 1;
        _fn = function(i, j) {
          return setTimeout((function() {
            return _this._setPosition(_this.matrix[i][j], i, j);
          }), 0);
        };
        for (i = _m = _ref5 = this.boardH - 1 - newMatrix[j].length; _ref5 <= 0 ? _m <= 0 : _m >= 0; i = _ref5 <= 0 ? ++_m : --_m) {
          _item = this._generateItem(eur00t.compiledTemplates.jewel.item, this.size, this.gap, -iterator, j, this.border);
          this.board.append(_item.elem);
          this.matrix[i][j] = _item.elem;
          _item.elem.data({
            color: _item.data.color
          });
          _fn(i, j);
          iterator += 1;
        }
      }
    }
    return true;
  };

  window.eur00t.jewel.Game.prototype._destroyAt = function(i, j, hidden) {
    var destroyedFlag;
    destroyedFlag = this._destroyLinearVertical(i, j, hidden);
    destroyedFlag = (this._destroyLinearHorizontal(i, j, hidden)) || destroyedFlag;
    if (destroyedFlag) {
      this._destroyObj({
        obj: this.matrix[i][j],
        i: i,
        j: j
      }, hidden);
    }
    if (!hidden) {
      this._refreshScores();
    }
    return destroyedFlag;
  };

  window.eur00t.jewel.Game.prototype._clearBoard = function(hidden) {
    var destroyedFlag, i, j, _i, _j, _ref, _ref1,
      _this = this;
    destroyedFlag = false;
    for (i = _i = 0, _ref = this.boardH; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      for (j = _j = 0, _ref1 = this.boardW; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
        if (this.matrix[i][j] !== null) {
          destroyedFlag = (this._destroyAt(i, j, hidden)) || destroyedFlag;
        }
      }
    }
    if (destroyedFlag) {
      if (!hidden) {
        setTimeout((function() {
          return _this._compactizeBoard();
        }), window.eur00t.jewel.SPEED / 2);
        return setTimeout((function() {
          return _this._clearBoard();
        }), window.eur00t.jewel.SPEED / 2);
      } else {
        this._compactizeBoard();
        return this._clearBoard(hidden);
      }
    }
  };

  window.eur00t.jewel.Game.prototype._initialize = function() {
    var _this = this;
    this.jQueryContainer.append(this.scoresIndicator);
    this.jQueryContainer.append(this.board);
    this.selected = {
      obj: null,
      i: -1,
      j: -1
    };
    this._clearBoard(true);
    return this.board.on('click', '.jewel', function(e) {
      var data, destroyedFlag, destroyedFlag0, i, j;
      data = ($(e.target)).data();
      i = data.i;
      j = data.j;
      if (_this._checkIfSelectable(i, j)) {
        return _this._selectItem(i, j);
      } else {
        _this._swapItems(i, j, _this.selected.i, _this.selected.j);
        destroyedFlag0 = _this._destroyAt(i, j);
        destroyedFlag = _this._destroyAt(_this.selected.i, _this.selected.j);
        if ((!destroyedFlag0) && (!destroyedFlag)) {
          (function(selectedI, selectedJ) {
            return setTimeout((function() {
              return _this._swapItems(i, j, selectedI, selectedJ);
            }), 300);
          })(_this.selected.i, _this.selected.j);
          return _this._cancelPreviousSelect();
        } else {
          setTimeout((function() {
            _this._compactizeBoard();
            return _this._clearBoard();
          }), window.eur00t.jewel.SPEED / 2);
          return _this._cancelPreviousSelect();
        }
      }
    });
  };

}).call(this);
