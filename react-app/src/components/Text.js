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
import {extractModelId} from '../Utils';
import {MapTo} from '@adobe/cq-react-editable-components';

require('./Text.css');

/**
 * Default Edit configuration for the Text component that interact with the Core Text component and sub-types
 *
 * @type EditConfig
 */
const TextEditConfig = {

    emptyLabel: 'Text',

    isEmpty: function() {
        return !this.props || !this.props.cqModel || !this.props.cqModel.text || this.props.cqModel.text.trim().length < 1;
    }
};

/**
 * Text React component
 */
class Text extends Component {

    get richTextContent() {
        let text, id;

        if (this.props.cqModel) {
            text = this.props.cqModel.text;
            id = extractModelId(this.props);
        }

        return <div id={id} dangerouslySetInnerHTML={{__html:  text}}/>;
    }

    get textContent() {
        let text;

        if (this.props.cqModel) {
            text = this.props.cqModel.text;
        }

        return <div>{text}</div>;
    }

    render() {
        let isRichText;

        if (this.props.cqModel) {
            isRichText = this.props.cqModel.richText;
        }

        let innerContent;

        if (isRichText) {
            innerContent = this.richTextContent;
        } else {
            innerContent = this.textContent;
        }

        return innerContent;
    }
}

MapTo('weretail/components/content/text')(Text, TextEditConfig);
