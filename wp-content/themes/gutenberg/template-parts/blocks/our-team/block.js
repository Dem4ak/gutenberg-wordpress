import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload, InspectorControls, BlockControls} from '@wordpress/block-editor';
import { Fragment } from'@wordpress/element';
import { Button, PanelBody, TextControl, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import {closeSmall, dragHandle} from "@wordpress/icons";

import './style.scss';

const SortableItem = SortableElement(
    ({ items, myIndex, onChangeImage, onChangeText, onChangeTitle, onChangePosition, RemoveItem }) => (
        <div className="employee" style={{position:'relative'}}>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position:'absolute',
                    left: 0,
                    top: '-20px',

                }}
            >
                <Button className='button-drag-item' icon={dragHandle} />
                <Button
                    className='button-remove-item'
                    icon={closeSmall}
                    onClick={() => RemoveItem(myIndex)}
                />
            </div>
            <div className="employee__image">
                <MediaUpload
                    onSelect={(media) =>
                        onChangeImage(media, myIndex)
                    }
                    type='image'
                    value={items[myIndex].imageID}
                    render={({open}) => (
                        <Button
                            className='tab_item__image add-image'
                            onClick={open}
                        >
                            {
                                !items[myIndex].imageURL
                                    ? ('Add Image')
                                    : <img alt={items[myIndex].imageALT} src={items[myIndex].imageURL} />
                            }
                        </Button>
                    )}
                />
            </div>
            <div className="employee__info">
                <RichText
                    className={"employee__info-title"}
                    placeholder='Title'
                    tagName='div'
                    allowedFormats={[]}
                    value={items[myIndex].title}
                    onChange={(title) => onChangeTitle(title, myIndex)}
                />
                <RichText
                    className={"employee__info-position"}
                    placeholder='Position'
                    tagName='div'
                    allowedFormats={[]}
                    value={items[myIndex].position}
                    onChange={(position) => onChangePosition(position, myIndex)}
                />
                <RichText
                    className={"employee__info-text"}
                    placeholder='Text'
                    tagName='div'
                    allowedFormats={[]}
                    value={items[myIndex].text}
                    onChange={(text) => onChangeText(text, myIndex)}
                />
            </div>
        </div>
    )
);
const SortableList = SortableContainer(({ items, onChangeImage, onChangeText, onChangeTitle, onChangePosition, RemoveItem }) => {
    return (
        <div className={"our_team__list"}>
            {items.map((value, index) => (
                <SortableItem
                    key={`item-${value}`}
                    index={index}
                    myIndex={index}
                    items={items}
                    onChangeImage={onChangeImage}
                    onChangeTitle={onChangeTitle}
                    onChangeText={onChangeText}
                    onChangePosition={onChangePosition}
                    RemoveItem={RemoveItem}
                />
            ))}
        </div>
    );
});
registerBlockType('gutenberg/our-team', {
    title: __('Our Team'),
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
        items: {
            type: 'array',
            default: [],
        },
    },

    edit(props) {



        const { setAttributes } = props;

        const AddItem = () => {
            const items = [...props.attributes.items];
            items.push({
                imageURL: '',
                imageALT: '',
                imageID: '',
                title: '',
                text: '',
                position: '',
            });
            props.setAttributes({ items });
        };

        const RemoveItem = (index) => {
            const items = [...props.attributes.items];
            items.splice(index, 1);
            props.setAttributes({ items });
        };

        const onChangeTitle = (value, index) => {
            const items = [...props.attributes.items];
            items[index].title = value;
            props.setAttributes({ items });
        };

        const onChangeText = (value, index) => {
            const items = [...props.attributes.items];
            items[index].text = value;
            props.setAttributes({ items });
        };

        const onChangeImage = (media, index) => {
            const items = [...props.attributes.items];
            items[index].imageURL = media.url;
            items[index].imageALT = media.alt;
            props.setAttributes({items});
        };

        const onChangePosition = (value, index) => {
            const items = [...props.attributes.items];
            items[index].position = value;
            props.setAttributes({ items });
        };

        const onSortEnd = ({ oldIndex, newIndex }) => {
            props.setAttributes({
                items: arrayMoveImmutable(props.attributes.items, oldIndex, newIndex),
            });
        };
        return (
            <Fragment>
                <div className="wrapper_our_team">
                    <div className="container">
                        <div className="our_team">
                            <RichText
                                className={"our_team__title"}
                                placeholder='Title'
                                tagName='div'
                                value={props.attributes.title}
                                onChange={(title) => props.setAttributes({title})}
                            />
                            <RichText
                                className={"our_team__subtitle"}
                                placeholder='Subtitle'
                                tagName='div'
                                value={props.attributes.subtitle}
                                onChange={(subtitle) => props.setAttributes({subtitle})}
                            />
                            <SortableList
                                distance={10}
                                axis={'xy'}
                                items={props.attributes.items}
                                onSortEnd={onSortEnd}
                                onChangeImage={onChangeImage}
                                onChangeTitle={onChangeTitle}
                                onChangeText={onChangeText}
                                onChangePosition={onChangePosition}
                                RemoveItem={RemoveItem}
                            />
                            <Button
                                className='button-add-item'
                                isSecondary
                                onClick={AddItem.bind(this)}
                                style={{
                                    display: 'block',
                                    margin: '25px auto'
                                }}
                            >
                                {__('Add Item')}
                            </Button>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    },

    save(props) {
        return (
            <Fragment>
                <div className="wrapper_our_team">
                    <div className="container">
                        <div className="our_team">
                            <RichText.Content
                                className={"our_team__title"}
                                tagName='div'
                                value={props.attributes.title}
                            />
                            <RichText.Content
                                className={"our_team__subtitle"}
                                tagName='div'
                                value={props.attributes.subtitle}
                            />
                            <div className="our_team__list">
                                {props.attributes.items.map((item, index) => (
                                    <div className="employee">
                                        <div className="employee__image">
                                            <img src={item.imageURL} alt={item.imageALT} />
                                        </div>
                                        <div className="employee__info">
                                            <RichText.Content
                                                className={"employee__info-title"}
                                                tagName='div'
                                                value={item.title}
                                            />
                                            <RichText.Content
                                                className={"employee__info-position"}
                                                tagName='div'
                                                value={item.position}
                                            />
                                            <RichText.Content
                                                className={"employee__info-text"}
                                                tagName='div'
                                                value={item.text}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    },
});
