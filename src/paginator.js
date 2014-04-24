/** @jsx React.DOM */
var ProductPaginator = React.createClass({
  render: function() {
    if(this.props.meta){
      var meta = this.props.meta;
      var pages = meta.total/meta.limit;
      var current = (meta.start/meta.limit) + 1;
      var pagerEls = Array.apply(null, Array(pages))
        .map(function (_, i) {
          var page = i + 1;
          var start = i * meta.limit;
          return <li key={page} className={(page == current) ? "active" : "" }>
            <a href="#" onClick={this.props.onElementClick.bind(null, start, meta.limit)}>{page}</a>
          </li>;

        }, this);
      return <ul className="pagination">
        {pagerEls}
      </ul>
    } else {
      return <ul className="pagination">
      </ul>
    }
  }
});