import {useState, useRef} from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyledSearchbar, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from "./Searchbar.styled";


import React from 'react'

export const Searchbar = ({onSubmit}) => {
  const [value, setValue] = useState('')
  const prevValue = useRef(value)
const  handleInputValueChange = ({target}) => {
      setValue(target.value)
  }

const  handleFormSubmit = (e) => {
        e.preventDefault()
        if(value.trim() === ''){
          toast.error('Введите что то')
          return;
        }
        if(value === prevValue.current){
          return
        }
        prevValue.current = value
        onSubmit(value)
    }

  return (
    <StyledSearchbar>
    <SearchForm onSubmit={handleFormSubmit}>
       <SearchFormButton type="submit"  >
             <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>
        <SearchFormInput
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        value={value}
        onInput={(e)=>handleInputValueChange(e)}
        />
    </SearchForm>
</StyledSearchbar>
  )
}

    
//     handleFormSubmit = (e) => {
//         e.preventDefault()
//         if(this.state.value.trim() === ''){
//           toast.error('Введите что то')
//           return;
//         }
//         this.props.onSubmit(this.state.value)
//     }
  

