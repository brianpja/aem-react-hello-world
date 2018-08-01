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
import {MapTo} from '@adobe/cq-react-editable-components';
import {Link} from "react-router-dom";

require('./Navigation.css');

class Navigation extends Component {

    getRecursiveNavigationContent(item) {
        if (!item) {
            return;
        }

        let childItems;

        if (item.children && item.children.length) {
            childItems = <ul>
                { item.children && item.children.map((childItem) => {
                    return this.getRecursiveNavigationContent(childItem);
                })
                }</ul>;
        }

        return <li key={ item.path }>
            <Link className="nav-item" to={ item.url }>{ item.title }</Link>
            {childItems}
        </li>;
    }

    render() {
        const model = this.props.cqModel;
        if (model) {
            // Generates the navigation links of the application
            return (
                <header>
                    <nav>
                        <ul className="nav-container">
                            { model.items && model.items.map((item) =>
                                this.getRecursiveNavigationContent(item))
                            }
                        </ul>
                    </nav>
                </header>
            );
        }

        return null;
    }
}

export default MapTo("weretail/components/structure/navigation")(Navigation);
