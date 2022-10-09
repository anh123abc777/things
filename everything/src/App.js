import './App.css';
import Things from './components/thing/things';
import axios from "axios";
import { useEffect, useState, useCallback, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Newthing from './components/thing/newthing';
import ThingDetail from './components/thing/thingdetail';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import Sidebar from './components/sidebar';
import { actions, useThing } from './components/thing';

library.add(fas, far)


const API_URL = "http://localhost:3000/api/v1/things/";

function App() {

  const [state, dispatch] = useThing();
  const { things, selectedThing, showThingDetails } = state;
  const [labels, setLabels] = useState([]);
  const [funcModal, setFuncModal] = useState();
  const [thingUrl, setThingUrl] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [isUpdateLabel, setIsUpdateLabel] = useState(false);
  const [isUpdatedThings, setIsUpdatedThings] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/labels").then((response) => response.data).then((items) => {
      setLabels(items);
      dispatch(actions.loadLabels(items))
    });
    setIsUpdateLabel(false);
  }, [isUpdateLabel]);

  useEffect(() => {
    handleRefresh();
    // if(selectedLabel==null){
    //   handleRefresh();
    // }else {
    //   setThings(selectedLabel.things);
    // }
    // [selectedLabel]
  }, []);

  useEffect(() => {
    if (isUpdatedThings) {
      handleRefresh();
      setIsUpdatedThings(false);
    }
  }, [isUpdatedThings]);

  const handleShowThing = (func, url) => {
    setFuncModal(func);
    setThingUrl(url);
    setShowModal(true);
  }
  const handleRefresh = () => {
    axios.get(API_URL).then((response) => response.data).then((items) => {
      dispatch(actions.loadThing(items));
    });
  }

  const handleUpdateThings = updatedThing => {
    if (updatedThing.id) {
      handleUpdateThing(updatedThing);
    }
  }

  const handleUpdateThing = (updatedThing) => {
    things.map(thing => {
      if (thing.id == updatedThing.id) {
        thing.title = updatedThing.title;
        thing.body = updatedThing.body;
      }
    });
    // setThings(things);
  }


  const handleRemoveThing = (id) => {
    axios.delete(API_URL + id).then((response) => response.data);
    setIsUpdatedThings(true);
  }

  const [isActive, setActive] = useState(false);

  const handleCollapseSidebar = () => {
    setActive(!isActive);
  }

  const handelShowThingsOfLabel = (label) => {
    setSelectedLabel(label);
  }

  return (
    <div className="wrapper">
      <Sidebar isActive={isActive} onShowThingsOfLabel={handelShowThingsOfLabel} setIsUpdateLabel={setIsUpdateLabel} labels={labels} setLabels={setLabels}></Sidebar>
      <div className="content col">
        <nav>
          <button type="button" id="sidebarCollapse" onClick={e => handleCollapseSidebar()} className="btn">
            <i className="fa fa-align-justify"></i>
          </button>

        </nav>
        <div className="content-wrapper">
          <Newthing></Newthing>
          <div className='p-3'>
            <Things things={things} />
          </div>
          {showThingDetails && <ThingDetail
            // labels={labels} 
            // func={funcModal} 
            // onRemove={(id) => handleRemoveThing(id)} 
            // setIsUpdateLabel={setIsUpdateLabel} 
            // setIsUpdatedThings={setIsUpdatedThings}
            show={showThingDetails}
            onHide={() => { dispatch(actions.closeThing()) }}
          />}
          {/* onHide={(thing) => {setShowModal(false); handleUpdateThings(thing); setIsUpdatedThings(true) }} */}
        </div>
      </div>
    </div>
  );
}

export default App;
