/* eslint-disable react/display-name */
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
import React from 'react';
import { ArrayTranslations } from '@reactjsonforms/core';
import { Dialog, Button, Portal, CloseButton } from '@chakra-ui/react';

export interface DeleteDialogProps {
  open: boolean;
  onClose(): void;
  onConfirm(): void;
  onCancel(): void;
  translations: ArrayTranslations;
}

export interface WithDeleteDialogSupport {
  openDeleteDialog(path: string, data: number): void;
}

export const DeleteDialog = React.memo(
  ({ open, onClose, onConfirm, onCancel, translations }: DeleteDialogProps) => {
    // const cancelRef = React.useRef(null);

    return (
      <Dialog.Root
        size={'xs'}
        open={open}
        // leastDestructiveRef={cancelRef}
        onOpenChange={onClose}
      >
        <Portal>
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header fontSize='lg' fontWeight='bold'>
                <Dialog.Title>{translations.deleteDialogTitle}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>{translations.deleteDialogMessage}</Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant='outline' onClick={onCancel}>
                    {translations.deleteDialogDecline}
                  </Button>
                </Dialog.ActionTrigger>
                <Button onClick={onConfirm}>
                  {translations.deleteDialogAccept}
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size='sm' />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    );
  }
);
