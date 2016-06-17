import React, { Component, PropTypes } from 'react';
import styles from './postFilter.less';

export default class PostList extends Component {
  static propTypes = {
    filterPosts: PropTypes.func.isRequired,
    setSearch: PropTypes.func.isRequired,
    setOrder: PropTypes.func.isRequired,
    setLimit: PropTypes.func.isRequired,
    setOffset: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
    ascOrder: PropTypes.bool.isRequired,
    limit: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      changed: false
    };
  }

  handleChange = (event) => {
    this.setState({ changed: true });

    switch (event.target.dataset.field) {
      case 'order':
        this.props.setOrder(this.refs.order.value);
        break;
      case 'limit':
        this.props.setLimit(this.refs.limit.value);
        break;
      case 'offset':
        this.props.setOffset(this.refs.offset.value);
        break;
      default:
        this.props.setSearch(this.refs.search.value);
        break;
    }

    this.props.filterPosts(this.refs.order.value, this.refs.limit.value, ((this.refs.offset.value === '') ? 0 : this.refs.offset.value), this.refs.search.value);
  }

  render() {
    return (
      <div className={ styles.postFilter }>
        <form className="form-inline" ref="postQuery">
          <div className={ styles.formGroup + ' form-group'}>
            <label className="control-label">Search</label>
            <input type="text" className="form-control" data-field="search" ref="search" onChange={ this.handleChange } />
          </div>
          <div className={ styles.formGroup + ' form-group'}>
            <label className="control-label">Order</label>
            <select className="form-control" data-field="order" defaultValue={ this.props.ascOrder } ref="order" onChange={ this.handleChange }>
              <option value="true">ASC</option>
              <option value="false">DESC</option>
            </select>
          </div>
          <div className={ styles.formGroup + ' form-group'}>
            <label className="control-label">Limit</label>
            <select className="form-control" data-field="limit" defaultValue={ this.props.limit } ref="limit" onChange={ this.handleChange }>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </select>
          </div>
          <div className={ styles.formGroup + ' form-group'}>
            <label className="control-label">Offset</label>
            <input type="text" className="form-control" data-field="offset" defaultValue={ this.props.offset } ref="offset" onChange={ this.handleChange } />
          </div>
        </form>
      </div>
    );
  }
}
