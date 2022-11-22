import axios from 'axios';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import NewThing from '~/components/thing/NewThing';
import ThingDetail from '~/components/thing/ThingDetail';
import Leftbar from '~/components/Leftbar';
import { actions, useThing } from '~/components/thing';
import Things from '~/components/thing/Things';
import CustomSnackbar from '~/components/CustomSnackbar';
import { THING_URL } from '~/components/thing/thingUrl';

library.add(fas, far);

const API_URL = 'http://localhost:3000/api/v1/things/';

function Home() {
    const [state, dispatch] = useThing();
    const { things, showThingDetails, isUpdateLabel } = state;
    const [labels, setLabels] = useState([]);
    const [open, setOpen] = useState({ isShow: false, message: '', thing: {} });

    useEffect(() => {
        if (isUpdateLabel) {
            handleLoadLabels();
        }
    }, [isUpdateLabel]);

    useEffect(() => {
        handleLoadLabels();
        handleLoadThings();
    }, []);

    const handleLoadLabels = () => {
        axios
            .get('http://localhost:3000/api/v1/labels')
            .then((response) => response.data)
            .then((items) => {
                setLabels(items);
                dispatch(actions.loadLabels(items));
            });
    };

    const handleLoadThings = () => {
        axios
            .get(API_URL)
            .then((response) => response.data)
            .then((items) => {
                dispatch(actions.loadThing(items));
            });
    };

    const [isActive, setActive] = useState(false);

    const handleCollapseSidebar = () => {
        setActive(!isActive);
    };

    const showSnackbar = (message, thing) => {
        setOpen({ isShow: true, message: message, thing: thing });
    };

    const handleClose = () => {
        setOpen({ ...open, isShow: false });
    };

    const handleUndo = () => {
        dispatch(actions.undoDeleteThing());
    };

    const handleDelete = () => {
        // console.log(open.thing.id);
        axios.delete(THING_URL(open.thing.id));
        dispatch(actions.deleteThing(open.thing));
    };

    return (
        <div className="wrapper">
            {/* <Leftbar isActive={isActive} labels={labels} setLabels={setLabels}></Leftbar> */}
            <div className="content-wrapper col">
                <nav></nav>
                <div className="content">
                    <NewThing></NewThing>
                    <div className="p-3 mt-4 match-parent">
                        <Things things={things} />
                    </div>
                    {showThingDetails && (
                        <ThingDetail
                            show={showThingDetails}
                            onHide={(thing) => {
                                dispatch(actions.closeThing());
                                if (!!thing) {
                                    dispatch(actions.beforeDeleteThing(thing));
                                    showSnackbar('delete thing', thing);
                                }
                            }}
                        />
                    )}
                </div>
            </div>
            <CustomSnackbar
                message={open.message}
                open={open.isShow}
                onClose={handleClose}
                onUndo={handleUndo}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default Home;
