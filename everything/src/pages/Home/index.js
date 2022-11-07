import axios from "axios";
import { useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import NewThing from "~/components/thing/NewThing";
import ThingDetail from "~/components/thing/ThingDetail";
import Leftbar from "~/components/Leftbar";
import { actions, useThing } from "~/components/thing";
import Things from "~/components/thing/Things";

library.add(fas, far)


const API_URL = "http://localhost:3000/api/v1/things/";

function Home() {

  const [state, dispatch] = useThing();
  const { things, showThingDetails, isUpdateLabel } = state;
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if(isUpdateLabel){
      handleLoadLabels()
    }
  }, [isUpdateLabel]);

  useEffect(() => {
    handleLoadLabels()
    handleRefresh();
  }, []);

  const handleLoadLabels = () => {
    axios.get("http://localhost:3000/api/v1/labels").then((response) => response.data).then((items) => {
      setLabels(items);
      dispatch(actions.loadLabels(items))
    });
  }

  const handleRefresh = () => {
    axios.get(API_URL).then((response) => response.data).then((items) => {
      dispatch(actions.loadThing(items));
    });
  }

  const [isActive, setActive] = useState(false);

  const handleCollapseSidebar = () => {
    setActive(!isActive);
  }


  return (
    <div className="wrapper">
      <Leftbar isActive={isActive} labels={labels} setLabels={setLabels}></Leftbar>
      <div className="content col">
        <nav>
          <button type="button" id="sidebarCollapse" onClick={e => handleCollapseSidebar()} className="btn">
            <i className="fa fa-align-justify"></i>
          </button>

        </nav>
        <div className="content-wrapper">
          <NewThing></NewThing>
          <div className='p-3'>
            <Things things={things} />
          </div>
          {showThingDetails && <ThingDetail
            show={showThingDetails}
            onHide={() => { dispatch(actions.closeThing()) }}
          />}
        </div>
      </div>
    </div>
  );
}

export default Home;