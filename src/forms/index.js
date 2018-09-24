import React from 'react';
import { Form, Field } from 'react-final-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const MyForm = (props) => {
  const { handleSubmit, pristine, invalid, submitting } = props

  return <form onSubmit={handleSubmit}>
    {!submitting &&
      <div>
        <Field name="firstName" component="input" placeholder="First Name" />
        <span>{props.errors.firstName}{props.hasSubmitErrors && props.submitErrors.firstName}</span>
        <br/>
        <Field name="lastName" component="input" placeholder="Last Name" />
        <span>{props.errors.lastName}{props.hasSubmitErrors && props.submitErrors.lastName}</span>
        <br/>
        <button type="submit" disabled={pristine || (invalid && !props.hasSubmitErrors)}>
          Submit
        </button>
      </div>
    }

    {submitting &&
      <div>loading...</div>
    }
  </form>}

const MyFormWrapper = ({setName, setLoading}) => <Form
  render={MyForm}
  onSubmit={async (values) => {
    if (Math.random() > 0.50) {
      setLoading(true)
      await sleep(500)
      setName(values)
      setLoading(false)
    } else {
      await sleep(500)
      return {
        firstName: 'some server side error',
        lastName: ':('
      }
    }

  }}
  validate={(values) => {
    const keys = ['firstName', 'lastName']
    const errors = {}
    for (const key of keys) {
      if (values[key] && values[key].length < 4) {
        errors[key] = 'Must be at least four chars long'
      }
      if (!values[key]) {
        errors[key] = 'required'
      }
    }
    return errors
  }}
/>

export class Forms extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: undefined
    }
  }

  setLoading(loading) {
    this.setState({loading})
  }

  setName({firstName, lastName}) {
    this.setState({
      name: `${firstName} ${lastName}`
    })
  }

  clearName() {
    this.setState({name: undefined})
  }

  render() {
    return <div>
      <h1>React Final Forms</h1>
      {!this.state.loading && !this.state.name &&
        <div>
          <MyFormWrapper setName={this.setName.bind(this)} setLoading={this.setLoading.bind(this)}/>
        </div>
      }

      {!this.state.loading && this.state.name &&
        <div>
          <div>Name from state {this.state.name}</div>
          <button onClick={this.clearName.bind(this)}>Clear name</button>
        </div>
        }

      {this.state.loading &&
        <div>loading...</div>
      }
    </div>
  }
}