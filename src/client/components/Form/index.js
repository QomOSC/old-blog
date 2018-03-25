import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

import bind from 'Root/js/bind';

import styles from './index.less';


class Form extends Component {
  static propTypes = {
    formStyle: PropTypes.string,
    inputs: PropTypes.arrayOf(PropTypes.shape({
      tag: PropTypes.string.isRequired,
      attrs: PropTypes.object.isRequired
    })).isRequired,
    children: PropTypes.node
  }

  state = {
    displayValidateError: false
  };

  @bind
  checkInputsValidate(e) {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      this.setState({ displayValidateError: true });
      return;
    }
    this.setState({ displayValidateError: false });

    this.props.submitFunction(this.refs);
  }

  render() {
    const { displayValidateError } = this.state;

    return (
      <Fragment>

        {this.props.children}

        <form
          className={`${styles.form} ${this.props.formStyle}
          ${displayValidateError ? 'displayValidateError' : ''}`}
          onSubmit={this.checkInputsValidate}
          noValidate>

          <fieldset>
            {this.props.inputs.map((v, i) =>
              <div key={i}>
                {(() => {
                  v.attrs.ref = v.attrs.name;
                  if (v.tag === 'button') {
                    v.attrs.dangerouslySetInnerHTML = {
                      __html: v.html
                    };
                  }

                  return <v.tag {...v.attrs}
                    className={`${styles[v.tag]} ${v.attrs.className}`} />;
                })()}
              </div>
            )}
          </fieldset>

        </form>

      </Fragment>
    );
  }
}

export default Form;
