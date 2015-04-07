const React = require('react');
const SearchResultsView = require('./components/SearchResultsView.jsx');

React.render(
  <SearchResultsView />,
  document.getElementById('main')
);
SearchResultsView.fetchResults();
