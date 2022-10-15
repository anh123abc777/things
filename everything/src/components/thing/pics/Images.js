const Images = (props) => {
    return (
        <div>
            {props.images && (
            props.images.map(image => {
                return (
                <img key={image} className="col-12" src={image?.preview || image} alt="" width="80%"/>
                )
            })
            )}
        </div>
    )
}

export default Images