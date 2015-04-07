const React = require('react');
const classnames = require('classnames');

let PageButton = React.createClass({
  propTypes: {
    clickHandler: React.PropTypes.func.isRequired,
    direction: React.PropTypes.oneOf([1, -1]).isRequired
  },

  handleClick: function(e) {
    return this.props.clickHandler(e, this.props.direction);
  },

  render: function() {
    let buttonText = this.props.direction == 1 ? "Next" : "Previous";
    // Obviously this is pretty rudimentary styling, but it gets the
    // job done.
    let classNames = classnames(
      "btn",
      "btn-default",
      "col-md-2",
      {
        "pull-right": this.props.direction == 1,
        "navbar-left": this.props.direction == -1
      }
    );
    return (
      <button
        className={classNames}
        type="button"
        onClick={this.handleClick}>
        {`${buttonText} Page`}
      </button>
    );
  }
});

module.exports = PageButton;
