import PropTypes from 'prop-types';
import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import {
  SearchHeader,
  Form,
  Button,
  ButtonLabel,
  SearchFormInput,
} from './SearchBar.styled';

export class SearchBar extends Component {
  state = {
    name: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  onInputChange = e => {
    this.setState({ name: e.target.value });
  };

  onSubmitCapture = e => {
    e.preventDefault();

    const { name } = this.state;

    this.props.onSubmit(name);

    this.setState({ name: '' });
  };

  render() {
    return (
      <SearchHeader>
        <Form onSubmit={this.onSubmitCapture}>
          <Button>
            <ButtonLabel>Search</ButtonLabel>
            <BsSearch size="18px" />
          </Button>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInputChange}
            value={this.state.name}
          />
        </Form>
      </SearchHeader>
    );
  }
}
