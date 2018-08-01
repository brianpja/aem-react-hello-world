import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {getVerifyObserver} from "./Utils";
import Navigation from '../src/components/Navigation';
import {PageModelManager} from '@adobe/cq-react-editable-components';


describe('Navigation ->', () => {

    const PAGE_MODEL_URL = 'react-page.model.json';
    const NAVIGATION_MODEL_PATH = 'navigation';
    const ROOT_NODE_CLASS_NAME = "route-node";

    const PRODUCTS_NAME = 'Products';
    const PRODUCT_NAME_1 = 'Product 1';
    const PRODUCT_NAME_2 = 'Product 2';
    const PRODUCTS_PATH = '/content/products';
    const PRODUCT_PATH_1 = '/content/products/product_1';
    const PRODUCT_PATH_2 = '/content/products/product_2';

    const PAGE_MODEL_JSON = {
        "designPath": "/libs/settings/wcm/designs/default",
        "title": "React sample page - Navigation",
        "lastModifiedDate": 1512116041058,
        "templateName": "sample-template",
        "cssClassNames": "page",
        "language": "en-US",
        ":itemsOrder": [
            "navigation"
        ],
        ":items": {
            "navigation": {
                items: [
                    {
                        path: '/content/home',
                        title: 'Home',
                        children: []
                    },
                    {
                        path: '/content/about',
                        title: 'About Us',
                        children: []
                    },
                    {
                        path: PRODUCTS_PATH,
                        title: PRODUCTS_NAME,
                        children: [
                            {
                                path: PRODUCT_PATH_1,
                                title: PRODUCT_NAME_1
                            },
                            {
                                path: PRODUCT_PATH_2,
                                title: PRODUCT_NAME_2
                            }
                        ]
                    }
                ]
            }
        },
        ":type": "we-retail-react/components/structure/page"
    };

    let server;

    let observer;

    let observerConfig = { attributes: true, subtree: true, childList: true };

    let rootNode;

    beforeEach(() => {
        rootNode = document.createElement('div');
        rootNode.className = ROOT_NODE_CLASS_NAME;
        document.body.appendChild(rootNode);

        server = sinon.fakeServer.create();

        server.respondWith("GET", PAGE_MODEL_URL,
            [200, { "Content-Type": "application/json" }, JSON.stringify(PAGE_MODEL_JSON)]);

        server.respondImmediately = true;

        return PageModelManager.init(PAGE_MODEL_URL).then(model => {
            assert.deepEqual(PAGE_MODEL_JSON, model, 'Returns the page model object');
        });
    });

    afterEach(() => {
        if (rootNode) {
            document.body.removeChild(rootNode);
            rootNode = undefined;
        }
    });

    describe('instantiation ->', () => {
        it('should generate the expected DOM', (done) => {
            // Expect the page title to be passed to the wrapped component
            observer = getVerifyObserver(function (mutation) {
                // should add the navigation component
                if (mutation.type !== 'childList' || !mutation.addedNodes || mutation.addedNodes.length < 0){
                    return false;
                }

                const navigation = mutation.addedNodes[0];

                if ('HEADER' !== navigation.tagName) {
                    return false;
                }

                const products = navigation.querySelector('[href="' + PRODUCTS_PATH + '.html"]');
                const product1 = navigation.querySelector('[href="' + PRODUCT_PATH_1 + '.html"]');
                const product2 = navigation.querySelector('[href="' + PRODUCT_PATH_2 + '.html"]');

                return products && products.text === PRODUCTS_NAME && product1 && product1.text === PRODUCT_NAME_1 && product2 && product2.text === PRODUCT_NAME_2;
            }, done);

            observer.observe(rootNode, observerConfig);

            ReactDOM.render(<BrowserRouter><Navigation cqModelDataPath={NAVIGATION_MODEL_PATH}/></BrowserRouter>, rootNode);
        });
    });
});
