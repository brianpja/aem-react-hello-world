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
import {Container, MapTo, withModel, PageModelManager} from '@adobe/cq-react-editable-components';
import { Route, Redirect } from 'react-router';

require('./fonts.css');
require('./main.css');

/**
 * Returns a model path from the given URL
 * @param {string} url     - Path from which to extract a model path
 * @return {string|undefined}
 */
function getModelPath(url) {
    if (!url) {
        return;
    }

    let dotIndex = url.indexOf(".");
    return url.substr(0, dotIndex > -1 ? dotIndex : url.length);
}

/**
 * Should the App redirect to the home page
 *
 * @param {string} modelUrl     - Path of the current model
 * @return {boolean}
 */
function canRedirectHome(modelUrl) {
    const currentUrl = getModelPath(window.location.pathname);
    // 1. if a model url has been provided
    // 2. if the current URL is located under the content
    // 3. if app root model path equals the current URL
    return modelUrl && modelUrl.indexOf('/content/') > -1 && modelUrl === currentUrl;
}

// This component is the application entry point
class App extends Container {

    getRedirect() {
        const rootModelUrl = getModelPath(PageModelManager.getRootModelUrl());

        if (canRedirectHome(rootModelUrl)) {
            // Redirect to the home url
            return <Redirect to={ rootModelUrl + '/home.html' }/>;
        }
    }

    render() {
        const classNames = this.props.cqModel && this.props.cqModel.cssClassNames || '';
        const redirect = this.getRedirect();

        if (this.innerContent && this.innerContent.length > 0) {
            return (
                <div className={'app ' + classNames}>
                    { redirect }
                    { this.innerContent }
                </div>
            );
        } else {
            return null;
        }
    }
}

export default withModel(App);
