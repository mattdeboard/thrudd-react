const React = require('react');
const fs = require('fs');
const SearchResultStore = require('../stores/SearchResultStore');
const SearchResult = require('./SearchResult.jsx');
const { addSearchResults } = require('../actions/ActionCreators');

let TableHeading = React.createClass({
  render: function() {
    return (
      <thead>
        <tr>
          <th className="sortable header">Distance</th>
          <th className="header"></th>
          <th className="sortable header">Location</th>
          <th className="sortable header">Sell</th>
          <th className="sortable header">Demand</th>
          <th className="sortable header">Amount</th>
          <th className="header">Avg</th>
          <th className="header">Last Update</th>
        </tr>
      </thead>
    );
  }
});

let SearchResultsView = React.createClass({
  statics: {
    fetchResults: function() {
      let results = window.JSON.parse(
        fs.readFileSync(__dirname + '/../data/commodity_query_result.json', 'utf8')
      );
      addSearchResults(results.CommodityList);
    }
  },

  getInitialState: function() {
    return {
      results: SearchResultStore.getAll()
    };
  },

  handleSearchResultChange: function(e) {
    return this.setState({ results: SearchResultStore.getAll() });
  },

  componentDidMount: function() {
    SearchResultStore.addChangeListener(this.handleSearchResultChange);
  },

  componentWillUnmount: function() {
    SearchResultStore.removeChangeListener(this.handleSearchResultChange);
  },

  renderResultRows: function() {
    const results = this.state.results;
    return results.map(function(result) {
      return (
        <SearchResult {...result} />
      );
    });
  },

  render: function() {
    return (
      <div id="DataListing">
        <hr />
        <table className="table table-striped" id="DataListTable">
          <TableHeading />
          <tbody>
            {this.renderResultRows()}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = SearchResultsView;
