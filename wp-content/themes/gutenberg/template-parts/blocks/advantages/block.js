import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload, InspectorControls, BlockControls} from '@wordpress/block-editor';
import { Fragment } from'@wordpress/element';
import { Button, PanelBody, TextControl, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import {closeSmall, dragHandle} from "@wordpress/icons";

import './style.scss';

registerBlockType('gutenberg/advantages', {
    title: __('Advantages'),
    icon: 'carrot',
    supports: {
        className: false,
    },
    attributes: {
        items: {
            type: 'array',
            default: [],
        },
    },

    edit(props) {

        const SortableItem = SortableElement(
            ({ items, myIndex, onChangeText, onChangeTitle, onChangeLink, RemoveItem }) => (
                <div className="advantage">
                    <div
                        style={{
                            width: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button className='button-drag-item' icon={dragHandle} />
                        <Button
                            className='button-remove-item'
                            icon={closeSmall}
                            onClick={() => RemoveItem(myIndex)}
                        />
                    </div>
                    <RichText
                        className={"advantage__title"}
                        placeholder='Title'
                        tagName='div'
                        value={items[myIndex].title}
                        onChange={(title) => onChangeTitle(title, myIndex)}
                    />
                    <RichText
                        className={"advantage__text"}
                        placeholder='Text'
                        tagName='div'
                        value={items[myIndex].text}
                        onChange={(text) => onChangeText(text, myIndex)}
                    />
                    <RichText
                        className={"advantage__link"}
                        placeholder='Text'
                        tagName='div'
                        value={items[myIndex].link}
                        onChange={(link) => onChangeLink(link, myIndex)}
                    />
                </div>
            )
        );
        const SortableList = SortableContainer(({ items, onChangeText, onChangeTitle, onChangeLink, RemoveItem }) => {
            return (
                <div className={"advantages"}>
                    {items.map((value, index) => (
                        <SortableItem
                            key={`item-${value}`}
                            index={index}
                            myIndex={index}
                            items={items}
                            onChangeTitle={onChangeTitle}
                            onChangeText={onChangeText}
                            onChangeLink={onChangeLink}
                            RemoveItem={RemoveItem}
                        />
                    ))}
                </div>
            );
        });


        const { setAttributes } = props;

        const AddItem = () => {
            const items = [...props.attributes.items];
            items.push({
                title: '',
                text: '',
                link: '<a href="#">More <i class="icon icon-arrow"></i></a>',
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

        const onChangeLink = (value, index) => {
            const items = [...props.attributes.items];
            items[index].link = value;
            props.setAttributes({ items });
        };

        const onSortEnd = ({ oldIndex, newIndex }) => {
            props.setAttributes({
                items: arrayMoveImmutable(props.attributes.items, oldIndex, newIndex),
            });
        };
        return (
            <Fragment>
                <div className="wrapper_advantages">
                    <div className="container">
                        <SortableList
                            distance={10}
                            axis={'xy'}
                            items={props.attributes.items}
                            onSortEnd={onSortEnd}
                            onChangeTitle={onChangeTitle}
                            onChangeText={onChangeText}
                            onChangeLink={onChangeLink}
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
            </Fragment>
        );
    },

    save(props) {
        return (
            <Fragment>
                <div className="wrapper_advantages">
                    <div className="container">
                        <div className="advantages">
                            {props.attributes.items.map((item, index) => (
                                <div className="advantage">
                                    <RichText.Content
                                        className={"advantage__title"}
                                        tagName='div'
                                        value={item.title}
                                    />
                                    <RichText.Content
                                        className={"advantage__text"}
                                        tagName='div'
                                        value={item.text}
                                    />
                                    <RichText.Content
                                        className={"advantage__link"}
                                        tagName='div'
                                        value={item.link}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    },
});
