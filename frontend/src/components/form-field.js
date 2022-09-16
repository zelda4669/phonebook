const Field = ({label, value, handler}) => {
    return (
        <div>
            {label}: <input value={value} onChange={handler}/>
        </div>
    )
}

export default Field