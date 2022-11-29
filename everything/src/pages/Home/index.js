import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import NewThing from '~/components/NewThing';
import ThingDetails from '~/components/ThingDetails';
import { actions, useThing } from '~/hooks';
import Things from '~/components/Things';
import CustomSnackbar from '~/components/CustomSnackbar';
import * as thingServices from '~/services/thingServices';
import * as labelServices from '~/services/labelServices';

library.add(fas, far);

const API_URL = 'http://localhost:3000/api/v1/things/';

function Home() {
    const [state, dispatch] = useThing();
    const { things, showThingDetails, isUpdateLabel } = state;
    const [open, setOpen] = useState({ isShow: false, message: '', thing: {} });

    useEffect(() => {
        handleLoadLabels();
        handleLoadThings();
    }, []);

    const handleLoadLabels = async () => {
        const res = await labelServices.getAll();
        dispatch(actions.loadLabels(res));
    };

    const handleLoadThings = async () => {
        const rs = await thingServices.getAll();
        dispatch(actions.loadThing(rs));
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
        thingServices.remove(open.thing.id);
        dispatch(actions.deleteThing(open.thing));
    };

    return (
        <div className="wrapper">
            <div className="content-wrapper col">
                <nav></nav>
                <div className="content">
                    <NewThing></NewThing>
                    <div className="p-3 mt-4 match-parent">
                        <Things things={things} />
                    </div>
                    {showThingDetails && (
                        <ThingDetails
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
