import React, { useState, useEffect, useLayoutEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownLabel from '../label/DropdownLabel';
import { useThing } from './hooks';
import { actions } from '.';
import { THINGS_URL, THING_URL } from './thingUrl';
import Images from './pics/Images';
import DropdownFeature from './DropdownFeature';
import { Button, IconButton, TextareaAutosize } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { pink } from '@mui/material/colors';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

function ThingDetail(props) {
    const [state, dispatch] = useThing();
    const { selectedThing, hasUpdate } = state;
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (selectedThing) {
            setImages(selectedThing.images_url);
        }
        console.log(selectedThing.images);
    }, [selectedThing]);

    useEffect(() => {
        return () => {
            images &&
                images.map((image, i) => {
                    URL.revokeObjectURL(image);
                });
        };
    }, [images]);

    const handleHideModal = () => {
        if (hasUpdate) {
            if (selectedThing?.id != null) {
                handleUpdateThing();
            } else {
                handleCreateThing();
            }
        }
        props.onHide();
    };

    const handleCreateThing = () => {
        if (!isEmpty()) {
            const formData = new FormData();
            formData.append('thing[title]', selectedThing.title);
            formData.append('thing[body]', selectedThing.body);
            if (images) {
                images.map((image) => {
                    formData.append('thing[images][]', image);
                });
            }

            axios({
                method: 'post',
                url: THINGS_URL,
                data: formData,
                validateStatus: false,
            }).then((response) => {
                dispatch(actions.createThing(response.data));
                return response.json;
            });
        }
    };

    const isEmpty = () => {
        return selectedThing.title.trim() == '' && selectedThing.body.trim() == '' && images == null;
    };

    const handleUpdateThing = () => {
        const formData = new FormData();
        formData.append('thing[title]', selectedThing.title);
        formData.append('thing[body]', selectedThing.body);
        if (images) {
            images.map((image) => {
                if (image?.preview) {
                    formData.append('images', image);
                }
            });
        }
        axios({
            method: 'PATCH',
            url: THING_URL(selectedThing.id),
            data: formData,
        }).then((response) => {
            dispatch(actions.updateThing(response.data));
        });
    };

    const handleDeleteThing = () => {
        props.onHide(selectedThing);
    };

    const handlePreviewImages = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        dispatch(actions.editThing());
        if (images) {
            setImages([...images, file]);
        } else {
            setImages([file]);
        }
    };

    const handleRemoveImage = (image) => {
        console.log(image);
        if (image?.id) {
            axios.delete(`http://localhost:3000/api/v1/things/${image.id}/delete_image_attachment`);
        }
        setImages(images.filter((el) => el !== image));
        dispatch(actions.editThing());
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleHideModal}>
            <Images images={images} onRemoveImage={handleRemoveImage}></Images>
            <Modal.Header>
                <TextareaAutosize
                    className="col-12 no-border none-resize"
                    id="contained-modal-title-vcenter"
                    style={{ width: '100%' }}
                    placeholder="Title"
                    value={selectedThing.title}
                    onChange={(e) => dispatch(actions.inputTitle(e.target.value))}
                />
            </Modal.Header>
            <Modal.Body className="body-text">
                <TextareaAutosize
                    className="col-12 no-border none-resize"
                    style={{ width: '100%' }}
                    value={selectedThing.body}
                    onChange={(e) => dispatch(actions.inputBody(e.target.value))}
                />

                {selectedThing?.id && (
                    <div className="d-flex align-items-center justify-content-end">
                        <IconButton onClick={(e) => handleDeleteThing()}>
                            <DeleteForeverIcon fontSize="large" sx={{ color: pink[500] }} />
                        </IconButton>

                        <Dropdown>
                            <Dropdown.Toggle variant="" aria-expanded="true" id="dropdown-basic" className="caret-off">
                                <TurnedInIcon fontSize="large" />
                            </Dropdown.Toggle>
                            <DropdownLabel setIsUpdateLabel={props.setIsUpdateLabel}></DropdownLabel>
                        </Dropdown>
                        <IconButton component="label" sx={{ color: 'black' }}>
                            <InsertPhotoIcon fontSize="large" />
                            <input type="file" hidden onChange={(e) => handlePreviewImages(e)} />
                        </IconButton>
                        <DropdownFeature></DropdownFeature>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default ThingDetail;
