import React, { Component } from 'react';
import axios from 'axios'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            companies: []
         }
    }

    async componentDidMount(){
        const {data} = await axios.get('/companies')
        this.setState({
            companies: data
        })
    }

    addCompany = async() =>{
        const {data} = await axios.post('/add')
        this.setState({
            companies: [...this.state.companies, data]
        })
    }

    deleteCompany = async(id) => {
        await axios.delete(`/delete/${id}`)
        this.setState({
            companies: this.state.companies.filter(company => {
                return company.id !== id
            })
        })
    }

    render() { 
        console.log('This is my state!! ', this.state)
        const {companies} = this.state
        return ( 
            <div>
                <button onClick={this.addCompany}> Add company </button>
                {companies.map(company => {
                    return(
                        <div key={company.id}>
                            <div> {company.name} </div>
                            <button onClick={() => this.deleteCompany(company.id)}> X </button>
                        </div>
                    )
                })}
            </div>
         );
    }
}

 
export default App;