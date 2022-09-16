const Notification = ({ type, message }) => {
    const alertStyleConfirmation = {
        color: 'green',
        background: 'lightgreen',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    const alertStyleError = {
        color: 'red',
        background: 'lightred',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if(message === null) {
        return null
    }

    if(type === 'confirm') {
        return(
        <div style={alertStyleConfirmation}>
            {message}
        </div>
    )
    } else if(type === 'error') {
        return(
            <div style={alertStyleError}>
                {message}
            </div>
        )
    }

    
}

export default Notification