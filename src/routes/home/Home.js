/* global ga:true */
/* global window:true */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* eslint-disable react/sort-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable class-methods-use-this */
import Form from 'carbon-components-react/lib/components/Form/Form';
import TextInput from 'carbon-components-react/lib/components/TextInput/TextInput';
import Button from 'carbon-components-react/lib/components/Button/Button';
import { request } from 'graphql-request';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';

const LOG = `mutation log ($infoText: String, $debugText: String, $errorText: String) {
  log(infoText: $infoText, debugText: $debugText, errorText: $errorText) {
    infoText
    debugText
    errorText
  }
}`;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onInputChanged = this.onInputChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChanged(event) {
    if (event && event.target && event.target.id) {
      let { value } = event.target;
      this.setState({
        [event.target.id]: value,
      });
    }
  }

  onSubmit() {
    const vars = {
      infoText: this.state.infoText,
      debugText: this.state.debugText,
      errorText: this.state.errorText
    };
    request('/graphql', LOG, vars)
      .then(res => {
        this.setState({
          infoText: '',
          debugText: '',
          errorText: '',
        });
      })
      .catch(err => {
        console.error('log failed ', err);
        this.setState({
          error: err,
        });
      });
  }

  renderForm() {
    let formTitle = 'Log test';
    const infoLabel = 'Enter info log';
    const debugLabel = 'Enter debug log';
    const errorLabel = 'Enter error log';
    const submitButtonLabel = 'Log';
    if (typeof window !== 'undefined' && window.app_name) {
      formTitle = `Log test (${window.app_name})`;
    }

    return (
      <div className={s.log_form}>
        <div className={s.form_title}>{formTitle}</div>
        <Form>
          <TextInput
            id='infoText'
            labelText={infoLabel}
            onChange={this.onInputChanged}
            value={this.state.infoText}
          />
          <TextInput
            id='debugText'
            labelText={debugLabel}
            onChange={this.onInputChanged}
            value={this.state.debugText}
          />
          <TextInput
            id='errorText'
            labelText={errorLabel}
            onChange={this.onInputChanged}
            value={this.state.errorText}
          />
          <div className="bx--form-item">
            <Button
              className={s.submit_btn}
              kind="primary"
              onClick={this.onSubmit}
            >
              {submitButtonLabel}
            </Button>
          </div>
        </Form>
      </div>
    );
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          {this.renderForm()}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
