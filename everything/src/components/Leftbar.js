import ListLabel from "./label/ListLabel";

function Leftbar(props){

    return (
       	<nav id="sidebar" className={props.isActive ? "active " : null}>	
           <div className="nav-header py-2">
                <h2 className="text-center">Label</h2>
           </div>
           <ListLabel onShowThingsOfLabel={props.onShowThingsOfLabel} setIsUpdateLabel={props.setIsUpdateLabel} labels={props.labels} setLabels={props.setLabels}></ListLabel>
        </nav>	
        
    );
}

export default Leftbar;