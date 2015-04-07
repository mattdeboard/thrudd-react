const React = require('react');
const StationIcon = require('./StationIcon.jsx');

let SearchResult = React.createClass({
  // It's a little unusual to have TitleCased props, but since the data is
  // coming down exactly like this, for convenience's sake we'll ignore the
  // style violation for now.
  propTypes: {
    Id: React.PropTypes.number.isRequired,
    Buy: React.PropTypes.number.isRequired,
    Sell: React.PropTypes.number.isRequired,
    GalacticAveragePrice: React.PropTypes.number.isRequired,
    StationTypeName: React.PropTypes.string.isRequired,
    StationTypeIcon: React.PropTypes.string.isRequired,
    StationAllegiance: React.PropTypes.string,
    SupplyAmount: React.PropTypes.number.isRequired,
    Demand: React.PropTypes.string,
    DemandAmount: React.PropTypes.number.isRequired,
    LastUpdate: React.PropTypes.string.isRequired,
    LastUpdatedBy: React.PropTypes.string.isRequired,
    Location: React.PropTypes.string.isRequired,
    DistanceFromJumpIn: React.PropTypes.number.isRequired,
    Distance: React.PropTypes.number.isRequired,
    PermitRequired: React.PropTypes.bool
  },

  render: function() {
    // There's a variety of values that can be returned by this 'Demand'
    // property, each of which represents "Low". So instead of listing them,
    // be very clever and infer that anything that's not "High" or "Med" must be
    // "Low".
    const demand = (
      ["High", "Med"].indexOf(this.props.Demand) != -1 ? this.props.Demand : "Low"
    );
    return (
      <tr>
        <td>
          {this.props.Distance}
        </td>
        <td>
          <StationIcon
            typeIcon={this.props.StationTypeIcon}
            typeName={this.props.StationTypeName}
            allegiance={this.props.StationAllegiance} />
        </td>
        <td>
          {`${this.props.Location} (${this.props.DistanceFromJumpIn}Ls)`}
        </td>
        <td>
          {this.props.Sell}
        </td>
        <td>
          {demand}
        </td>
        <td>
          {this.props.DemandAmount}
        </td>
        <td>
          {this.props.GalacticAveragePrice}
        </td>
        <td>
          {this.props.LastUpdate}
        </td>
      </tr>
    );
  }
});

module.exports = SearchResult;
