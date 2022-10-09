import Labels from "./label/labels";
import NewLabel from "./label/newlabel";

function Sidebar(props){

    return (
       	<nav id="sidebar" className={props.isActive ? "active " : null}>	
           <div className="nav-header py-2">
                <h2 className="text-center">Label</h2>
           </div>
           <Labels onShowThingsOfLabel={props.onShowThingsOfLabel} setIsUpdateLabel={props.setIsUpdateLabel} labels={props.labels} setLabels={props.setLabels}></Labels>
        </nav>	
        
    );
}

export default Sidebar;