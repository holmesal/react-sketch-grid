// @flow
import React, { Component } from 'react';
import './Grid.css';
import range from 'lodash.range';
import Measure from 'react-measure';

type Props = {
  // Width, in pixels, of each small grid line
  blockSize: number,

  // Show thikk lines every N thin lines
  thickLinesEvery: number,

  // Color of the thin lines
  lightColor?: string,

  // Color of the thick lines
  darkColor?: string
};

type State = {
  dimensions: {
    width: number,
    height: number
  },
  visible: boolean
};

type direction = 'vertical' | 'horizontal';

const LOCAL_STORAGE_KEY = 'Grid.Visible';

class Grid extends Component<Props, State> {
  static defaultProps = {
    blockSize: 12,
    thickLinesEvery: 6,
    lightColor: 'rgba(255, 0, 0, 0.2)',
    darkColor: 'rgba(0, 0, 255, 0.2)'
  };

  state = {
    visible: false,
    dimensions: {
      width: 0,
      height: 0
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);

    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (raw) {
      const visible = !!JSON.parse(raw);
      this.setState({ visible });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = ({ key, ctrlKey }: KeyboardEvent) => {
    if (key === 'g' && ctrlKey) this.toggleVisible();
  };

  toggleVisible = () => {
    const visible = !this.state.visible;
    this.setState({ visible });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(visible));
  };

  renderLine = (direction: direction, idx: number) => {
    const { blockSize, thickLinesEvery, lightColor, darkColor } = this.props;
    const key = direction + idx;
    const style = Object.assign(
      {},
      {
        backgroundColor: idx % thickLinesEvery === 0 ? darkColor : lightColor
      },
      direction === 'horizontal'
        ? {
            left: 0,
            right: 0,
            height: 1,
            top: idx * blockSize
          }
        : {
            left: idx * blockSize,
            top: 0,
            bottom: 0,
            width: 1
          }
    );
    return <div key={key} style={style} className="GridLine" />;
  };

  render() {
    const { visible, dimensions } = this.state;
    const { blockSize } = this.props;

    if (!visible) return <div />;
    const numHorizontal = Math.floor(dimensions.height / blockSize);
    const numVertical = Math.floor(dimensions.width / blockSize);
    return (
      <Measure
        bounds
        onResize={contentRect => {
          this.setState({ dimensions: contentRect.bounds });
        }}
      >
        {({ measureRef }) => (
          <div ref={measureRef} className="Grid">
            {range(1, numHorizontal + 1).map(idx =>
              this.renderLine('horizontal', idx)
            )}
            {range(0, numVertical + 1).map(idx =>
              this.renderLine('vertical', idx)
            )}
          </div>
        )}
      </Measure>
    );
  }
}

export default Grid;
