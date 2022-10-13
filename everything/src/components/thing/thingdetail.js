import React, { useState, useEffect, useLayoutEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownLabel from '../label/DropdownLabel';
import { useThing } from './hooks';
import { actions } from '.';
import { THINGS_URL, THING_URL } from './thingUrl';
import Images from './pics/Images';


function ThingDetail(props) {

  const [state, dispatch] = useThing();
  const { selectedThing, hasUpdate } = state
  const [images, setImages] = useState([])

  useEffect(() => {
    if(selectedThing){
      setImages(selectedThing.images_url);
    }
  },[selectedThing]);

  useEffect(() => {
    return () =>{
      images && images.map((image, i) =>{
        URL.revokeObjectURL(image);
      })
    }
  },[images]);

  const handleHideModal = () => {
    if (hasUpdate) {
      if (selectedThing?.id !=  null){
        handleUpdateThing();
      }else{
        handleCreateThing();
      }
    }    
    props.onHide(selectedThing);
  }

  const handleCreateThing = () => {
    if (!isEmpty( )) {
      const formData = new FormData();
      formData.append('thing[title]',selectedThing.title)
      formData.append('thing[body]',selectedThing.body)
      images.map(image => {
        formData.append('thing[images][]',image)
      })
  
      axios({
        method: 'post',
        url: THINGS_URL,
        data: formData,
      }).then(response => {
        dispatch(actions.createThing(response.data));
        return response.json
      });
    }
  }

  const isEmpty = () => {
    return selectedThing.title.trim() == "" && selectedThing.body.trim() == "" && images == null;
  }

  const handleUpdateThing = () => {
    const formData = new FormData();
    formData.append('thing[title]',selectedThing.title)
    formData.append('thing[body]',selectedThing.body)
    images.map(image => {
      if(image?.preview){
        formData.append('images',image)
      }
    })
    axios({
      method: 'PATCH',
      url: THING_URL(selectedThing.id),
      data: formData
    }).then((response) => {
      dispatch(actions.updateThing(response.data));
    });
  }

  const handleDeleteThing = () => {
    dispatch(actions.deleteThing(selectedThing));
    axios.delete(THING_URL(selectedThing.id));
    props.onHide();
  }

  const handlePreviewImages = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    dispatch(actions.editThing());
    if(images){
      setImages([...images,file]);
    }else{
        setImages([file]);
      }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleHideModal}
    >
      <Images images={images}></Images>
      <Modal.Header>
      
        <input className="col-12 no-border" id="contained-modal-title-vcenter" placeholder='Title' value={selectedThing.title}
          onChange={e => dispatch(actions.inputTitle(e.target.value))}
        />
      </Modal.Header>
      <Modal.Body className='body-text'>
        <textarea className="col-12 no-border none-resize" placeholder='Take a note..' value={selectedThing.body}
          onChange={e => dispatch(actions.inputBody(e.target.value))} />
            
        <input type="file" name="image" id="image" onChange={(e) => handlePreviewImages(e)}/>

        {selectedThing?.id &&
          <div className="d-flex align-items-center justify-content-end">
            <button className="btn" onClick={e => handleDeleteThing()}><FontAwesomeIcon icon="fa-solid fa-trash" /></button>

            <Dropdown>
              <Dropdown.Toggle variant="" aria-expanded="true" id="dropdown-basic">
                <FontAwesomeIcon icon={faTag} />
              </Dropdown.Toggle>
              <DropdownLabel setIsUpdateLabel={props.setIsUpdateLabel}></DropdownLabel>
            </Dropdown>
          </div>
        }
      </Modal.Body>
    </Modal>
  );
}

export default ThingDetail