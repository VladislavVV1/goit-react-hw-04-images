import { useState, useEffect } from "react";
import { ToastContainer} from 'react-toastify';
import '../styles.css'
import { Searchbar } from "./Searchbar/Searchbar"
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { getSearchImg } from "../api/api";
import { Loader } from "./Loader/Loader";
import { LoadMoreButton } from "./LoadMoreButton/LoadMoreButton";
import { ErrorMessage } from "./ErrorMessage/ErrorMessage";

export const App = () => {
const [searchValue, setSearchValue] = useState('')
const [page, setPage] = useState(1)
const [photos, setPhotos] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
const [totalHits, setTotalHits] = useState(12)

const onSubmit = (value) => {
  setSearchValue(value)
  setPage(1)
  setPhotos([])
}

const onLoadMoreClick = () => {
  setPage(prevState => prevState + 1);
}

useEffect(() => {
  if (searchValue === '') {
    return;
  }
  async function getPhotos() {
    try{
      setLoading(true)
            const data = await getSearchImg(searchValue, page)
            setPhotos((p) => [...p, ...data.hits])
            setTotalHits(data.totalHits)
          }catch (error){
            setError(true)
          }finally{
            setLoading(false)
          }          
  }
  getPhotos();
}, [searchValue, page]);

  let button;
    if(photos.length !== 0 && totalHits >= photos.length + 1){
      button = <LoadMoreButton onLoadMoreClick={onLoadMoreClick}>Load more</LoadMoreButton>
  }
  return (
     <>
    <Searchbar onSubmit={onSubmit}></Searchbar>
    {error && (<ErrorMessage/>)}
{photos.length !== 0 && (<ImageGallery photos={photos}>
    </ImageGallery>)}
    {loading && <Loader/>}
    {button}
    <ToastContainer autoClose={3000}/>
    </>
  )
}

