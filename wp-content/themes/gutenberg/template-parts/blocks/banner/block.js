import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload, InspectorControls, BlockControls} from '@wordpress/block-editor';
import { Fragment } from'@wordpress/element';
import { Button, PanelBody, TextControl, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import './style.scss';

registerBlockType('gutenberg/banner', {
    title: __('Banner'),
    icon: 'carrot',
    supports: {
        className: false,
    },
    attributes: {
        title: {
            type: 'string',
        },
        text: {
            type: 'string',
        },
        button_text: {
            type: 'string',
        },
        button_link: {
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
                <InspectorControls>
                    <PanelBody title={__('Options')}>
                        <TextControl
                            label={__('Button URL')}
                            onChange={(button_link) => props.setAttributes({button_link})}
                            value={props.attributes.button_link}
                        />
                    </PanelBody>
                </InspectorControls>
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
                <div className="wrapper_banner">
                    {props.attributes.imageURL ? (
                        <img
                            alt={props.attributes.imageALT}
                            src={props.attributes.imageURL}
                        />
                    ) : (<img src="/wp-content/themes/gutenberg/assets/images/header_bg.jpg" alt="header background" />)}

                        <div className="banner">
                            <RichText
                                className="banner__title"
                                value={props.attributes.title}
                                tagName={'h1'}
                                onChange={(title)=>props.setAttributes({title})}
                                placeholder={"Title"}
                            />
                            <RichText
                                className="banner__text"
                                value={props.attributes.text}
                                tagName={'div'}
                                onChange={(text)=>props.setAttributes({text})}
                                placeholder={"Text"}
                            />
                            <a href="#" className="banner__btn">
                                <RichText
                                    value={props.attributes.button_text}
                                    onChange={(button_text)=>props.setAttributes({button_text})}
                                    placeholder={"Button Text"}
                                />
                            </a>
                        </div>
                </div>
            </Fragment>
        );
    },

    save(props) {
        return (
            <Fragment>
                <div className="wrapper_banner">
                    {props.attributes.imageURL ? (
                        <img
                            alt={props.attributes.imageALT}
                            src={props.attributes.imageURL}
                        />
                    ) : (<img src="/wp-content/themes/gutenberg/assets/images/header_bg.jpg" alt="header background" />)}

                    <div className="banner">
                        <RichText.Content
                            className="banner__title"
                            value={props.attributes.title}
                            tagName={'h1'}
                        />
                        <RichText.Content
                            className="banner__text"
                            value={props.attributes.text}
                            tagName={'div'}
                        />
                        <a href={props.attributes.button_link} className="banner__btn">{props.attributes.button_text}</a>
                    </div>
                </div>
            </Fragment>
        );
    },
});
