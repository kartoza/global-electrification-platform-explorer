import React, { Component, Fragment } from 'react';
import { PropTypes as T } from 'prop-types';

import { environment } from '../../config';

import ShadowScrollbars from '../ShadowScrollbar';
import Charts from './Charts';
import Legend from './Legend';

class Summary extends Component {
  /**
   * Check if scenario has data and render panel accordingly
   */
  renderPanel () {
    const { isReady, getData } = this.props.scenario;

    if (isReady()) {
      const scenario = getData();
      if (Object.keys(scenario.layers).length > 0) {
        return (
          <Fragment>
            <Legend scenario={scenario} />
            <div className='sum-block sum-block--charts'>
              <h2 className='sum-block__title'>Charts</h2>
              <Charts scenario={scenario} />
            </div>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <div className='sum-block sum-block--message'>
              <h2 className='sum-block__title'>Scenario not found</h2>
              <p>
                No data is available for this scenario. Please choose a different set of levers.
              </p>
            </div>
          </Fragment>
        );
      }
    } else {
      return (
        <Fragment>
          <div className='sum-block sum-block--message'>
            <h2 className='sum-block__title'>Loading</h2>
            <p>Fetching data for scenario...</p>
          </div>
        </Fragment>
      );
    }
  }

  render () {
    return (
      <section className='exp-summary'>
        <header className='exp-summary__header'>
          <div className='exp-summary__headline'>
            <h1 className='exp-summary__title'>Summary</h1>
          </div>
        </header>
        <div className='exp-summary__body'>
          <ShadowScrollbars theme='light'>
            {this.renderPanel()}
          </ShadowScrollbars>
        </div>
        <footer className='exp-summary__footer'>
          <button
            type='button'
            className='exp-download-button disabled'
            title='Download the data'
          >
            <span>Export</span>
          </button>
        </footer>
      </section>
    );
  }
}

if (environment !== 'production') {
  Summary.propTypes = {
    scenario: T.object,
    model: T.object
  };
}

export default Summary;
