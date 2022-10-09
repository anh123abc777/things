import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useThing } from '../thing';

const DropdownLabel = (props) => {

    const [checkedIds, setCheckedIds] = useState(null);
    const [isClick, setIsClick] = useState(null);
    const [state, dispatch] = useThing();
    const { selectedThing, labels } = state;

    useEffect(() => {
        if (props.thing.labels != null) {
            setCheckedIds(props.thing.labels.map(label => {
                return label.id;
            }))
        }
    }, [props.thing])

    useEffect(() => {
        if (checkedIds != null && isClick != null) {
            updateLabel();
        }
    }, [checkedIds]);

    const handleCheck = (id) => {
        setIsClick(true);
        setCheckedIds(prev => {
            const isChecked = checkedIds.includes(id)
            return isChecked ? checkedIds.filter(item => item !== id) : [...prev, id]
        })
    }

    const updateLabel = () => {
        const listId = {
            list_id: checkedIds
        }
        axios.put(`http://localhost:3000/api/v1/things/${props.thing.id}/labels`, listId).then((response) => response.data);
        props.setIsUpdateLabel(true);
    }


    const isChecked = (label) => {
        const labelsOfThing = props.thing.labels;
        if (labelsOfThing != null) {
            return labelsOfThing.some(labelThing => {
                return labelThing.id == label.id
            })
        }
        return false;
    }

    return (
        <Dropdown.Menu className='p-3'>

            {labels.map(label => {
                return (
                    <Form.Check className='py-1'
                        type="checkbox"
                        label={label.name}
                        id={label.id}
                        onChange={() => handleCheck(label.id)}
                        defaultChecked={isChecked(label)}
                    />
                )
            })}
        </Dropdown.Menu>
    )
}

export default DropdownLabel;