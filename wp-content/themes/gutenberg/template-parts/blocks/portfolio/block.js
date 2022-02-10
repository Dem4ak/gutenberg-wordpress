import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload, InspectorControls, BlockControls} from '@wordpress/block-editor';
import { Fragment } from'@wordpress/element';
import { Button, PanelBody, TextControl, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import './style.scss';

registerBlockType('gutenberg/portfolio', {
    title: __('Portfolio'),
    icon: 'carrot',
    supports: {
        className: false,
    },
    attributes: {
        title: {
            type: 'string',
        },
        subtitle: {
            type: 'string',
        },
        text: {
            type: 'string',
        },
        link: {
            default: '<a href="#">More <i class="icon icon-arrow"></i></a>',
            type: 'string',
        },
        imageID: {
            type: 'string',
        },
        imageURL: {
            type: 'string',
        },
        imageALT: {
            type: 'string',
        },
    },

    edit(props) {

        return (
            <Fragment>
                <BlockControls>
                    <div className='components-toolbar'>
                        <MediaUpload
                            onSelect={(media) => {
                                props.setAttributes({
                                    imageALT: media.alt,
                                    imageURL: media.url
                                });
                            }}
                            type='image'
                            value={props.attributes.imageID}
                            render={({open}) => (
                                <ToolbarButton
                                    className='components-icon-button components-toolbar__control'
                                    icon='format-image'
                                    onClick={open}
                                ></ToolbarButton>
                            )}
                        />
                    </div>
                </BlockControls>
                <div className="wrapper_portfolio">
                    <div className="container">
                        <div className="portfolio">
                            <div className="portfolio__image">
                                {props.attributes.imageURL ? (
                                    <img
                                        alt={props.attributes.imageALT}
                                        src={props.attributes.imageURL}
                                    />
                                ) : (<img src="/wp-content/themes/gutenberg/assets/images/mac.jpg" alt="macbook"/>)}
                            </div>
                            <div className="portfolio__content">
                                <RichText
                                    className="portfolio__content-title"
                                    value={props.attributes.title}
                                    tagName={'div'}
                                    onChange={(title)=>props.setAttributes({title})}
                                    placeholder={"Title"}
                                />
                                <RichText
                                    className="portfolio__content-subtitle"
                                    value={props.attributes.subtitle}
                                    tagName={'div'}
                                    onChange={(subtitle)=>props.setAttributes({subtitle})}
                                    placeholder={"Sub Title"}
                                />
                                <RichText
                                    className="portfolio__content-text"
                                    value={props.attributes.text}
                                    tagName={'div'}
                                    multiline={'p'}
                                    onChange={(text)=>props.setAttributes({text})}
                                    placeholder={"Text"}
                                />
                                <RichText
                                    className="portfolio__content-link"
                                    value={props.attributes.link}
                                    tagName={'div'}
                                    onChange={(link)=>props.setAttributes({link})}
                                    placeholder={"Link"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    },

    save(props) {
        return (
            <Fragment>
                <div className="wrapper_portfolio">
                    <div className="container">
                        <div className="portfolio">
                            <div className="portfolio__image">
                                {props.attributes.imageURL ? (
                                    <img
                                        alt={props.attributes.imageALT}
                                        src={props.attributes.imageURL}
                                    />
                                ) : (<img src="/wp-content/themes/gutenberg/assets/images/mac.jpg" alt="macbook"/>)}
                            </div>
                            <div className="portfolio__content">
                                <RichText.Content
                                    className="portfolio__content-title"
                                    value={props.attributes.title}
                                    tagName={"div"}
                                />
                                <RichText.Content
                                    className="portfolio__content-subtitle"
                                    value={props.attributes.subtitle}
                                    tagName={"div"}
                                />
                                <RichText.Content
                                    className="portfolio__content-text"
                                    value={props.attributes.text}
                                    tagName={"div"}
                                />
                                <RichText.Content
                                    className="portfolio__content-link"
                                    value={props.attributes.link}
                                    tagName={"div"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    },
});
