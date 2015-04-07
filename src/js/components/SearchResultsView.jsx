const React = require('react');
const fs = require('fs');
const Immutable = require('immutable');
const classnames = require('classnames');
const SearchResultStore = require('../stores/SearchResultStore');
const SearchResult = require('./SearchResult.jsx');
const PageButton = require('./PageButton.jsx');
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

  handlePageButtonClick: function(e, direction) {
    let targetPage = this.state.currentPage + direction;
    if (targetPage < 0) {
      targetPage = 0;
    } else if (targetPage > SearchResultStore.getNumPages()) {
      targetPage = this.state.currentPage;
    }
    let start = SEARCH_RESULT_PAGE_SIZE * targetPage;
    let end = start + SEARCH_RESULT_PAGE_SIZE;
    this.setState({
      results: SearchResultStore.getPage(start, end),
      currentPage: targetPage
    });
  },

  handleSearchResultChange: function(e) {
    let start = SEARCH_RESULT_PAGE_SIZE * this.state.currentPage;
    let end = start + SEARCH_RESULT_PAGE_SIZE;
    return this.setState({
      results: SearchResultStore.getPage(start, end)
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

  renderPageButtons: function() {
    // Don't render any page controls if there's only one page.
    const pages = SearchResultStore.getNumPages();
    if (SearchResultStore.getNumPages() == 1) {
      return false;
    }
    return (
      <nav className="navbar">
        <PageButton clickHandler={this.handlePageButtonClick} direction={-1}/>
        <p className="col-md-offset-3 col-md-2 lead">
          {`Page ${this.state.currentPage} of ${pages}`}
        </p>
        <PageButton clickHandler={this.handlePageButtonClick} direction={1}/>
      </nav>
    );
  },

  render: function() {
    return (
      <div id="DataListing" className="container">
        <hr />
        {this.renderPageButtons()}
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
