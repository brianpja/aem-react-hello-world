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

require('./Image.css');

/**
 * Default Edit configuration for the Image component that interact with the Core Image component and sub-types
 *
 * @type EditConfig
 */
const ImageEditConfig = {

    dragDropName: 'image',

    emptyLabel: 'Image',

    isEmpty: function() {
        return !this.props || !this.props.cqModel || !this.props.cqModel.src || this.props.cqModel.src.trim().length < 1;
    }
};

/**
 * Expected usage of the Image Component.
 *
 * <Image
 *      cqModel='the whole Object holding information for the image from the model.json response' />
 *
 * Please see the package.json for the proxy settings.
 */
class Image extends Component {

    hasLink() {
        return this.props && this.props.cqModel && this.props.cqModel.link;
    }

    get content() {
        let alt;
        let displayPopupTitle;
        let src;
        let title;
        let id;

        if (this.props.cqModel) {
            alt = this.props.cqModel.alt;
            displayPopupTitle = this.props.cqModel.displayPopupTitle; // TODO: it is missing in the JSON
            src = this.props.cqModel.src;
            title = this.props.cqModel.title;
            id = extractModelId(this.props);
        }

        return <img id={id} src={src} alt={alt} title={displayPopupTitle && title}/>
    }

    get linkedContent() {
        let alt;
        let fileReference;
        let link;
        let title;

        if (this.props.cqModel) {
            alt = this.props.cqModel.alt;
            fileReference = this.props.cqModel.fileReference; // TODO: it is missing in the JSON
            link = this.props.cqModel.link;
            title = this.props.cqModel.title;
        }

        return <a href={link} data-title={title || alt} data-asset={fileReference}>
                {this.content}
            </a>
    }

    render() {
        let innerContent;

        if (this.hasLink()) {
            innerContent = this.linkedContent;
        } else {
            innerContent = this.content
        }

        return (<div className="cmp-image">
                {innerContent}
            </div>);
    }
}

MapTo('weretail/components/content/image')(Image, ImageEditConfig);
