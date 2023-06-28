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
import React, { useCallback, useState } from 'react';
import isEmpty from 'lodash/isEmpty';

import {
  CombinatorRendererProps,
  createCombinatorRenderInfos,
  createDefaultValue,
  isOneOfControl,
  JsonSchema,
  OwnPropsOfControl,
  RankedTester,
  rankWith,
} from '@reactjsonforms/core';
import {
  JsonFormsDispatch,
  withJsonFormsOneOfProps,
} from '@reactjsonforms/react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Tab,
  TabList,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import CombinatorProperties from './CombinatorProperties';
import Hidden from '../util/Hidden';
import _ from 'lodash';
export interface OwnOneOfProps extends OwnPropsOfControl {
  indexOfFittingSchema?: number;
}

const oneOf = 'oneOf';
const OneOfRenderer = ({
  handleChange,
  schema,
  path,
  renderers,
  cells,
  rootSchema,
  visible,
  indexOfFittingSchema,
  uischema,
  uischemas,
  data,
}: CombinatorRendererProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [selectedIndex, setSelectedIndex] = useState(indexOfFittingSchema || 0);
  const [newSelectedIndex, setNewSelectedIndex] = useState(0);
  const oneOfRenderInfos = createCombinatorRenderInfos(
    (schema as JsonSchema).oneOf as JsonSchema[],
    rootSchema,
    oneOf,
    uischema,
    path,
    uischemas
  );

  const openNewTab = (newIndex: number) => {
    handleChange(path, createDefaultValue(_.get(schema, ['oneOf', newIndex])));
    setSelectedIndex(newIndex);
  };

  const confirm = useCallback(() => {
    onClose();
    openNewTab(newSelectedIndex);
  }, [handleChange, createDefaultValue, newSelectedIndex]);
  const handleTabChange = useCallback(
    (newOneOfIndex: number) => {
      setNewSelectedIndex(newOneOfIndex);
      if (isEmpty(data)) {
        openNewTab(newOneOfIndex);
      } else {
        onOpen();
      }
    },
    [setSelectedIndex, data]
  );

  return (
    <Hidden hidden={!visible}>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Your data will be cleared if you navigate away from this tab. Do you
            want to proceed?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' ml={3} onClick={confirm}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <CombinatorProperties
        schema={schema}
        combinatorKeyword={'oneOf'}
        path={path}
      />
      <Tabs index={selectedIndex} onChange={handleTabChange} w='100%'>
        <TabList>
          {oneOfRenderInfos.map((oneOfRenderInfo, idx) => (
            <Tab key={idx}>{oneOfRenderInfo.label}</Tab>
          ))}
        </TabList>
        {oneOfRenderInfos.map(
          (oneOfRenderInfo, oneOfIndex) =>
            selectedIndex === oneOfIndex && (
              <JsonFormsDispatch
                key={oneOfIndex}
                schema={oneOfRenderInfo.schema}
                uischema={oneOfRenderInfo.uischema}
                path={path}
                renderers={renderers}
                cells={cells}
              />
            )
        )}
      </Tabs>
    </Hidden>
  );
};

export const oneOfControlTester: RankedTester = rankWith(3, isOneOfControl);
export default withJsonFormsOneOfProps(OneOfRenderer);
