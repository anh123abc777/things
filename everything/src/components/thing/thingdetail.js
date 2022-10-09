import React, { useState,useEffect, useLayoutEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownLabel from '../label/dropdownlabel';
import { useThing } from './hooks';
import { actions } from '.';
import { UPDATE_URL } from './thing_url';


function ThingDetail(props) {

  const [state, dispatch] = useThing();
  const {selectedThing, hasUpdate} = state

    const handleHideModal = () => {
      if(selectedThing.id && hasUpdate){
        handleUpdateThing();
      }else{
        handleCreateThing();
      }
      props.onHide(selectedThing);
    }


    const handleCreateThing = () => {
      const isEmpty = selectedThing.title.trim() == "" && selectedThing.body.trim() == ""
      if(!isEmpty){
        const newThing = {
          title: selectedThing.title,
          body: selectedThing.body
        }
        return axios.post(props.url,newThing).then((response) => response.data);
      }
    }

      
    const handleUpdateThing = () => {
      const newThing = {
          title: selectedThing.title,
          body: selectedThing.body
      }
      dispatch(actions.updateThing(selectedThing))
      return axios.put(UPDATE_URL(selectedThing.id),newThing).then((response) => response.data);
    }

    const handleDeleteThing = () => {
      props.onRemove(selectedThing.id);
      props.onHide();
    }

      
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide = {handleHideModal}
      >
        <Modal.Header>
          <input className="col-12 no-border" id="contained-modal-title-vcenter" placeholder='Title' value={selectedThing.title}
            onChange={e => dispatch(actions.inputTitle(e.target.value))}
          />
        </Modal.Header>
        <Modal.Body className='body-text'>
          <textarea className="col-12 no-border none-resize" placeholder='Take a note..' value={selectedThing.body}
            onChange={e => dispatch(actions.inputBody(e.target.value))}/>
       
            {props.func=="update" && 
              <div className="d-flex align-items-center justify-content-end">
              <button className="btn" onClick={e => handleDeleteThing()}><FontAwesomeIcon  icon="fa-solid fa-trash"/></button>
       
              <Dropdown>
                <Dropdown.Toggle variant="" aria-expanded="true" id="dropdown-basic">
                <FontAwesomeIcon icon={faTag}/>
                </Dropdown.Toggle>
                <DropdownLabel labels={props.labels} setIsUpdateLabel={props.setIsUpdateLabel} thing={selectedThing}></DropdownLabel>
              </Dropdown>    
            </div>
            }
        </Modal.Body>
      </Modal>
    );
  }

export default ThingDetail