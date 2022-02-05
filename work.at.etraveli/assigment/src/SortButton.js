import React,{useState} from "react";

export default function SortButton(props) {

    const[show,setShow] = useState(false);
    const toggleShowModal = () => {
        setShow(!show);
    }

    return (
        <div  style={{position:"reltive"}}>
            <button className="button" type="button"
                onClick={toggleShowModal}>Sort by</button>
                    {show && (<div className="popup" style={{position:"absolute", 
                    zIndex: 1, backgroundColor: "#fff", marginTop:4}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <div className="sort_title">Sort By</div>
                    <div style={{fontWeight: "bold",fontSize:16}}  onClick={toggleShowModal}>
                        x
                    </div>
                </div>
            <button className="button" style={{marginRight:6}} onClick={props.sortBy("episode")}>Episode</button>
            <button className="button" onClick={props.sortBy("year")}>Year</button></div>)}
        </div>
    )

}