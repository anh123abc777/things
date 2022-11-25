import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useThing, actions } from '~/hooks';

const DropdownLabel = (props) => {
    const [checkedIds, setCheckedIds] = useState(null);
    const [isClick, setIsClick] = useState(null);
    const [state, dispatch] = useThing();
    const { selectedThing, labels } = state;

    useEffect(() => {
        if (selectedThing.labels != null) {
            setCheckedIds(
                selectedThing.labels.map((label) => {
                    return label.id;
                }),
            );
        }
    }, []);

    useEffect(() => {
        if (checkedIds != null && isClick != null) {
            updateLabel();
        }
    }, [checkedIds]);

    const handleCheck = (id) => {
        setIsClick(true);
        setCheckedIds((prev) => {
            const isChecked = checkedIds.includes(id);
            return isChecked ? checkedIds.filter((item) => item !== id) : [...prev, id];
        });
    };

    const updateLabel = () => {
        const listId = {
            list_id: checkedIds,
        };
        axios.put(`http://localhost:3000/api/v1/things/${selectedThing.id}/labels`, listId).then((response) => {
            dispatch(actions.editThing());
            dispatch(actions.updateThingOfLabel({ labelIds: checkedIds, thing: selectedThing }));
        });
    };

    const isChecked = (label) => {
        const labelsOfThing = selectedThing.labels;
        if (labelsOfThing != null) {
            return labelsOfThing.some((labelThing) => {
                return labelThing.id == label.id;
            });
        }
        return false;
    };

    return (
        <Dropdown.Menu className="p-3">
            {labels.map((label) => {
                return (
                    <Form.Check
                        className="py-1"
                        key={label.id}
                        type="checkbox"
                        label={label.name}
                        id={label.id}
                        onChange={() => handleCheck(label.id)}
                        defaultChecked={isChecked(label)}
                    />
                );
            })}
        </Dropdown.Menu>
    );
};

export default DropdownLabel;
