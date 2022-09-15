import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import {
  SearchHeader,
  Form,
  Button,
  ButtonLabel,
  SearchFormInput,
} from './SearchBar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const onInputChange = e => {
    setName(e.target.value);
  };

  const onSubmitCapture = e => {
    e.preventDefault();
    onSubmit(name);
    setName('');
  };

  return (
    <SearchHeader>
      <Form onSubmit={onSubmitCapture}>
        <Button>
          <ButtonLabel>Search</ButtonLabel>
          <BsSearch size="18px" />
        </Button>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onInputChange}
          value={name}
        />
      </Form>
    </SearchHeader>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
