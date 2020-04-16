var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import './Grid.module.css';
import range from 'lodash.range';
import Measure from 'react-measure';

/*:: type Props = {
  // Width, in pixels, of each small grid line
  blockSize: number,

  // Show thikk lines every N thin lines
  thickLinesEvery: number,

  // Color of the thin lines
  lightColor?: string,

  // Color of the thick lines
  darkColor?: string
};*/
/*:: type State = {
  dimensions: {
    width: number,
    height: number
  },
  visible: boolean
};*/
/*:: type direction = 'vertical' | 'horizontal';*/


var LOCAL_STORAGE_KEY = 'Grid.Visible';

var Grid = function (_Component) {
  _inherits(Grid, _Component);

  function Grid() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Grid);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Grid.__proto__ || Object.getPrototypeOf(Grid)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      visible: false,
      dimensions: {
        width: 0,
        height: 0
      }
    }, _this.onKeyDown = function (_ref2) {
      var key = _ref2.key,
          ctrlKey = _ref2.ctrlKey;

      if (key === 'g' && ctrlKey) _this.toggleVisible();
    }, _this.toggleVisible = function () {
      var visible = !_this.state.visible;
      _this.setState({ visible: visible });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(visible));
    }, _this.renderLine = function (direction /*: direction*/, idx /*: number*/) {
      var _this$props = _this.props,
          blockSize = _this$props.blockSize,
          thickLinesEvery = _this$props.thickLinesEvery,
          lightColor = _this$props.lightColor,
          darkColor = _this$props.darkColor;

      var key = direction + idx;
      var style = Object.assign({}, {
        backgroundColor: idx % thickLinesEvery === 0 ? darkColor : lightColor
      }, direction === 'horizontal' ? {
        left: 0,
        right: 0,
        height: 1,
        top: idx * blockSize
      } : {
        left: idx * blockSize,
        top: 0,
        bottom: 0,
        width: 1
      });
      return React.createElement('div', { key: key, style: style, className: 'GridLine' });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Grid, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('keydown', this.onKeyDown);

      var raw = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (raw) {
        var _visible = !!JSON.parse(raw);
        this.setState({ visible: _visible });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.onKeyDown);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          visible = _state.visible,
          dimensions = _state.dimensions;
      var blockSize = this.props.blockSize;


      if (!visible) return React.createElement('div', null);
      var numHorizontal = Math.floor(dimensions.height / blockSize);
      var numVertical = Math.floor(dimensions.width / blockSize);
      return React.createElement(
        Measure,
        {
          bounds: true,
          onResize: function onResize(contentRect) {
            _this2.setState({ dimensions: contentRect.bounds });
          }
        },
        function (_ref3) {
          var measureRef = _ref3.measureRef;
          return React.createElement(
            'div',
            { ref: measureRef, className: 'Grid' },
            range(1, numHorizontal + 1).map(function (idx) {
              return _this2.renderLine('horizontal', idx);
            }),
            range(0, numVertical + 1).map(function (idx) {
              return _this2.renderLine('vertical', idx);
            })
          );
        }
      );
    }
  }]);

  return Grid;
}(Component);

Grid.defaultProps = {
  blockSize: 12,
  thickLinesEvery: 6,
  lightColor: 'rgba(255, 0, 0, 0.2)',
  darkColor: 'rgba(0, 0, 255, 0.2)'
};


export default Grid;