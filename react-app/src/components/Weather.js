/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2018 Adobe Systems Incorporated
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
import React, {Component} from 'react';
import ReactWeather from 'react-open-weather';
import {MapTo} from '@adobe/cq-react-editable-components';

require('./Weather.css');

const WeatherEditConfig = {

    emptyLabel: 'Weather',

    isEmpty: function() {
        return !this.props || !this.props.cqModel || !this.props.cqModel.city || this.props.cqModel.city.trim().length < 1;
    }
};

class Weather extends Component {

    /**
     * Returns the apiKey from the model.
     *
     * @returns {String} The apiKey from the model
     */
    get apiKey() {
        return this.props.cqModel && this.props.cqModel.apiKey;
    }

    render() {
        let city;
        if (this.props.cqModel) {
            city = this.props.cqModel.city;
            if (this.apiKey) {
                return <ReactWeather key={'react-weather' + Date.now()} 
                    forecast="today" apikey={this.apiKey} type="city" city={city} />
            } else {
                return <div className="rw-box weather-error">No api key defined! Weather data cannot be retrieved</div>
            }
        }

        return null;
    }
}

MapTo('we-retail-journal/global/components/weather')(Weather, WeatherEditConfig);
