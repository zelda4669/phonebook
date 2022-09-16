import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    let request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    let request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    let request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const deleteEntry = (id) => {
    return axios.delete(`${baseUrl}/${id}`)

}

const phonebookService = { getAll, create, update, deleteEntry }

export default phonebookService