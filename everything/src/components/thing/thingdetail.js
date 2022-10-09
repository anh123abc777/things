import React, { useState, useEffect, useLayoutEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownLabel from '../label/dropdownlabel';
import { useThing } from './hooks';
import { actions } from '.';
import { THINGS_URL, THING_URL } from './thingUrl';


function ThingDetail(props) {

  const [state, dispatch] = useThing();
  const { selectedThing, hasUpdate } = state

  const handleHideModal = () => {
    if (selectedThing?.id && hasUpdate) {
      handleUpdateThing();
    } else {
      handleCreateThing();
    }
    props.onHide(selectedThing);
  }


  const handleCreateThing = () => {
    const isEmpty = selectedThing.title.trim() == "" && selectedThing.body.trim() == ""
    if (!isEmpty) {
      const newThing = {
        title: selectedThing.title,
        body: selectedThing.body
      }
      axios({
        method: 'post',
        url: THINGS_URL,
        data: newThing,
        validateStatus: (status) => {
          return true;
        },
      }).then(response => {
        dispatch(actions.createThing(response.data));
      });

    }
  }

  const handleUpdateThing = () => {
    const newThing = {
      title: selectedThing.title,
      body: selectedThing.body
    }
    dispatch(actions.updateThing(selectedThing));
    return axios.put(THING_URL(selectedThing.id), newThing).then((response) => response.data);
  }

  const handleDeleteThing = () => {
    dispatch(actions.deleteThing(selectedThing));
    axios.delete(THING_URL(selectedThing.id));
    props.onHide();
  }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleHideModal}
    >
      <Modal.Header>
        <input className="col-12 no-border" id="contained-modal-title-vcenter" placeholder='Title' value={selectedThing.title}
          onChange={e => dispatch(actions.inputTitle(e.target.value))}
        />
      </Modal.Header>
      <Modal.Body className='body-text'>
        <textarea className="col-12 no-border none-resize" placeholder='Take a note..' value={selectedThing.body}
          onChange={e => dispatch(actions.inputBody(e.target.value))} />

        {selectedThing?.id &&
          <div className="d-flex align-items-center justify-content-end">
            <button className="btn" onClick={e => handleDeleteThing()}><FontAwesomeIcon icon="fa-solid fa-trash" /></button>

            <Dropdown>
              <Dropdown.Toggle variant="" aria-expanded="true" id="dropdown-basic">
                <FontAwesomeIcon icon={faTag} />
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