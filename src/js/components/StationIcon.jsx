const React = require('react');
const { ToolURL } = require('../constants/AppConstants');

let StationIcon = React.createClass({
  propTypes: {
    typeIcon: React.PropTypes.string,
    typeName: React.PropTypes.string,
    allegiance: React.PropTypes.string
  },

  renderStationAlignment: function() {
    // If there is no allegiance, don't render the allegiance icon.
    if (this.props.allegiance === "Independent") {
      return false;
    }
    return this.imgElement(this.props.allegiance);
  },

  imgElement: function(filename, title) {
    if (!title) {
      title = filename;
    }
    return (
      <img
        src={`${ToolURL}/Content/images/${filename}.png`}
        title={title} />
    );
  },

  render: function() {
    return (
      <div className="iconBlock">
        {this.imgElement(this.props.typeIcon, this.props.typeName)}
        {this.renderStationAlignment()}
      </div>
    );
  }
});

module.exports = StationIcon;
