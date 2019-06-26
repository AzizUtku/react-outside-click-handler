/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { Component } from "react";
import PropTypes from "prop-types";

const propTypes = {
  targetElement: PropTypes.func,
  onOutsideClick: PropTypes.func.isRequired,
  wrapperProps: PropTypes.object,
  closeable: PropTypes.bool,
  children: PropTypes.node
};

const defaultProps = {
  closeable: true
};

class OutsideClickHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    };
    this.node = React.createRef();
  }

  componentDidMount() {
    this.node.current.addEventListener("click", this.insideClickHandler, false);
    document.addEventListener("click", this.outsideClickHandler, false);
  }

  componentWillUnmount() { 
    this.node.current.removeEventListener("click", this.insideClickHandler, false);
    document.removeEventListener("click", this.outsideClickHandler, false);
  }

  insideClickHandler = () => {
    this.clickedInside = true;
  };

  outsideClickHandler = event => {
    if (!this.clickedInside) {
      const { isVisible } = this.state;
      const { onOutsideClick, closeable } = this.props;

      if (isVisible && onOutsideClick) {
        onOutsideClick(event);
      }
      if (closeable && this.node.current) {
        this.setState({
          isVisible: false
        });
      }
    }
    this.clickedInside = false;
  };

  render() {
    const { isVisible } = this.state;
    const { targetElement, wrapperProps, children } = this.props;

    const output = targetElement ? (
      targetElement(this.node)
    ) : (
      <div ref={this.node} {...wrapperProps}>
        {children}
      </div>
    );
    return isVisible ? output : null;
  }
}

OutsideClickHandler.propTypes = propTypes;
OutsideClickHandler.defaultProps = defaultProps;
export default OutsideClickHandler;