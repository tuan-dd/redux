import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';

function SearchInput({ handleSubmit }) {
   const [searchQuery, setSearchQuery] = useState('');
   const onSubmit = (e) => {
      e.preventDefault();
   };
   const handleChange = (value) => {
      handleSubmit(value);
      setSearchQuery(value);
   };
   return (
      <form onSubmit={onSubmit}>
         <TextField
            onChange={(event) => handleChange(event.target.value)}
            value={searchQuery}
            placeholder='Search by name'
            InputProps={{
               endAdornment: (
                  <InputAdornment position='start'>
                     <SearchIcon />
                  </InputAdornment>
               ),
            }}
            variant='outlined'
         />
      </form>
   );
}

export default SearchInput;
