import { ModalImg } from 'components/Modal/Modal';
import { useState } from 'react'
import { Img } from './ImageGalleryItem.styled';
import React from 'react'

export const ImageGalleryItem= ({photo}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

        const openModal = () => {
            setIsModalOpen(true);
    };

        const closeModal = () => {
            setIsModalOpen(false);
    };
  return (
    <>
        <Img onClick={openModal} src={photo.webformatURL} alt=""/>
        <ModalImg isModalOpen={isModalOpen} closeModal={closeModal}>
            <img src={photo.largeImageURL} alt=""/>
        </ModalImg>
    </>
  )
}