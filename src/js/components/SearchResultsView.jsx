const React = require('react');
const fs = require('fs');
const Immutable = require('immutable');
const SearchResultStore = require('../stores/SearchResultStore');
const SearchResult = require('./SearchResult.jsx');
const { addSearchResult } = require('../actions/ActionCreators');
const { SEARCH_RESULT_PAGE_SIZE } = require('../constants/AppConstants');

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
      let results = fs.readFile(
        `${__dirname}/../data/commodity_query_result_big.json`,
        'utf8',
        function(err, data) {
          let jsonData = JSON.parse(data).CommodityList;
          addSearchResult(jsonData);
        }
      );
    }
  },

  getInitialState: function() {
    return {
      results: SearchResultStore.getPage(),
      currentPage: 0
    };
  },

  handleSearchResultChange: function(e) {
    let start = SEARCH_RESULT_PAGE_SIZE * this.state.currentPage;
    let end = start + SEARCH_RESULT_PAGE_SIZE;
    return this.setState({
      results: SearchResultStore.getPage(start, end),
      currentPage: this.state.currentPage + 1
    });
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
