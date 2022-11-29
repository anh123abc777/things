import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownLabel from '../label/DropdownLabel';
import { useThing } from '~/hooks';
import { actions } from '~/hooks';
import ListImages from '~/components/ListImages';
import DropdownFeature from './DropdownFeature';
import { IconButton, TextareaAutosize } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { pink } from '@mui/material/colors';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import * as thingServices from '~/services/thingServices';

function ThingDetails(props) {
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

    const handleCreateThing = async () => {
        if (selectedThing.title && selectedThing.body && images) {
            const formData = new FormData();
            formData.append('thing[title]', selectedThing.title);
            formData.append('thing[body]', selectedThing.body);
            if (!!images) {
                images.map((image) => {
                    formData.append('thing[images][]', image);
                });
            }

            const res = await thingServices.create(formData);
            dispatch(actions.createThing(res));
        }
    };

    const handleUpdateThing = async () => {
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

        const res = await thingServices.update(selectedThing.id, formData);
        dispatch(actions.updateThing(res));
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

    const handleRemoveImage = useCallback((image) => {
        if (image?.id) {
            thingServices.removeImages(image.id);
        }
        setImages(images.filter((el) => el !== image));
        dispatch(actions.editThing());
    }, []);

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleHideModal}>
            <ListImages images={images} onRemoveImage={handleRemoveImage}></ListImages>
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
                    minRows={6}
                    placeholder="Body"
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

export default ThingDetails;
