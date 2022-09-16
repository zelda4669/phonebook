import Person from './person'
import Search from './search'

const Phonebook = ({ search, handleSearch, nameSearch, handleDelete }) => {
    return (
        <div>
            <h2>Contacts</h2>
            <Search search={search} handleSearch={handleSearch} />
            <ul>
                {nameSearch.map(person =>
                <Person key={person.id} number={person.id} person={person} handleDelete={handleDelete} />
                )}
            </ul>
        </div>
    )
}

export default Phonebook