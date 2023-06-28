/*
  The MIT License

  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import range from 'lodash/range';
import React, { useMemo } from 'react';
import {
  ArrayControlProps,
  composePaths,
  createDefaultValue,
  findUISchema,
  Helpers,
  ControlElement,
} from '@reactjsonforms/core';
import {
  JsonFormsDispatch,
  withJsonFormsArrayControlProps,
} from '@reactjsonforms/react';
import type { VanillaRendererProps } from '../../index';
import { withVanillaControlProps } from '../../util';
import { ArrowUpIcon, ArrowDownIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
} from '@chakra-ui/react';

const { convertToValidClassName } = Helpers;

export const ArrayControl = ({
  classNames,
  data,
  label,
  path,
  schema,
  errors,
  addItem,
  removeItems,
  moveUp,
  moveDown,
  uischema,
  uischemas,
  getStyleAsClassName,
  renderers,
  rootSchema,
  translations,
}: ArrayControlProps & VanillaRendererProps) => {
  const controlElement = uischema as ControlElement;
  const childUiSchema = useMemo(
    () =>
      findUISchema(
        uischemas,
        schema,
        uischema.scope,
        path,
        undefined,
        uischema,
        rootSchema
      ),
    [uischemas, schema, uischema.scope, path, uischema, rootSchema]
  );
  const isValid = errors.length === 0;
  const validationClass = getStyleAsClassName('array.control.validation');
  const divClassNames = [validationClass]
    .concat(
      isValid ? '' : getStyleAsClassName('array.control.validation.error')
    )
    .join(' ');
  const buttonClassAdd = getStyleAsClassName('array.control.add');
  const childControlsClass = getStyleAsClassName('array.child.controls');
  const buttonClassUp = getStyleAsClassName('array.child.controls.up');
  const buttonClassDown = getStyleAsClassName('array.child.controls.down');
  const buttonClassDelete = getStyleAsClassName('array.child.controls.delete');
  const controlClass = [
    getStyleAsClassName('array.control'),
    convertToValidClassName(controlElement.scope),
  ].join(' ');

  return (
    <div className={controlClass}>
      <Flex justifyContent='space-between'>
        <Heading as='h3' size='md'>
          {label}
        </Heading>
        <Button
          className={buttonClassAdd}
          onClick={addItem(path, createDefaultValue(schema))}
        >
          Add to {label}
        </Button>
      </Flex>
      <div className={divClassNames}>{errors}</div>
      <Accordion className={classNames.children} allowMultiple>
        {data ? (
          range(0, data.length).map((index) => {
            const childPath = composePaths(path, `${index}`);
            return (
              <AccordionItem key={index}>
                <AccordionButton>
                  <Flex justifyContent='space-between' width='100%'>
                    <Avatar
                      as='h4'
                      size='sm'
                      name={`${index + 1}`}
                      color='gray.800'
                      bgColor='gray.100'
                    />
                    <ButtonGroup className={childControlsClass}>
                      <IconButton
                        icon={<ArrowUpIcon />}
                        className={buttonClassUp}
                        aria-label={translations.upAriaLabel}
                        onClick={() => {
                          moveUp(path, index)();
                        }}
                      >
                        {translations.up}
                      </IconButton>
                      <IconButton
                        icon={<ArrowDownIcon />}
                        className={buttonClassDown}
                        aria-label={translations.downAriaLabel}
                        onClick={() => {
                          moveDown(path, index)();
                        }}
                      >
                        {translations.down}
                      </IconButton>
                      <IconButton
                        icon={<DeleteIcon />}
                        className={buttonClassDelete}
                        aria-label={translations.removeAriaLabel}
                        onClick={() => {
                          if (
                            window.confirm(
                              'Are you sure you wish to delete this item?'
                            )
                          ) {
                            removeItems(path, [index])();
                          }
                        }}
                      >
                        {translations.removeTooltip}
                      </IconButton>
                    </ButtonGroup>
                  </Flex>
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <JsonFormsDispatch
                    schema={schema}
                    uischema={childUiSchema || uischema}
                    path={childPath}
                    key={childPath}
                    renderers={renderers}
                  />
                </AccordionPanel>
              </AccordionItem>
            );
          })
        ) : (
          <p>{translations.noDataMessage}</p>
        )}
      </Accordion>
    </div>
  );
};

export const ArrayControlRenderer = ({
  schema,
  uischema,
  data,
  path,
  rootSchema,
  uischemas,
  addItem,
  getStyle,
  getStyleAsClassName,
  removeItems,
  moveUp,
  moveDown,
  id,
  visible,
  enabled,
  errors,
  translations,
}: ArrayControlProps & VanillaRendererProps) => {
  const controlElement = uischema as ControlElement;
  const labelDescription = Helpers.createLabelDescriptionFrom(
    controlElement,
    schema
  );
  const label = labelDescription.show ? labelDescription.text : '';
  const controlClassName = `control ${Helpers.convertToValidClassName(
    controlElement.scope
  )}`;
  const fieldSetClassName = getStyleAsClassName('array.layout');
  const buttonClassName = getStyleAsClassName('array.Button');
  const childrenClassName = getStyleAsClassName('array.children');
  const classNames: { [className: string]: string } = {
    wrapper: controlClassName,
    fieldSet: fieldSetClassName,
    Button: buttonClassName,
    children: childrenClassName,
  };

  return (
    <ArrayControl
      classNames={classNames}
      data={data}
      label={label}
      path={path}
      schema={schema}
      errors={errors}
      addItem={addItem}
      removeItems={removeItems}
      moveUp={moveUp}
      moveDown={moveDown}
      uischema={uischema}
      uischemas={uischemas}
      getStyleAsClassName={getStyleAsClassName}
      rootSchema={rootSchema}
      id={id}
      visible={visible}
      enabled={enabled}
      getStyle={getStyle}
      translations={translations}
    />
  );
};

export default withVanillaControlProps(
  withJsonFormsArrayControlProps(ArrayControlRenderer)
);
