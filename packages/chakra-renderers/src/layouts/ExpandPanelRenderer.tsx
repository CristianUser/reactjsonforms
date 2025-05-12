/* eslint-disable react/display-name */
import merge from 'lodash/merge';
import get from 'lodash/get';
import React, { Dispatch, ReducerAction, useMemo } from 'react';
import { ComponentType } from 'enzyme';
import {
  JsonFormsDispatch,
  JsonFormsStateContext,
  withJsonFormsContext,
} from '@reactjsonforms/react';
import {
  ArrayTranslations,
  composePaths,
  ControlElement,
  findUISchema,
  getFirstPrimitiveProp,
  JsonFormsCellRendererRegistryEntry,
  JsonFormsRendererRegistryEntry,
  JsonFormsUISchemaRegistryEntry,
  JsonSchema,
  moveDown,
  moveUp,
  Resolve,
  update,
} from '@reactjsonforms/core';
import { ArrowUpIcon, ArrowDownIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Accordion,
  Avatar,
  ButtonGroup,
  Flex,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { Tooltip } from '../components/ui/tooltip';
import Hidden from '../util/Hidden';

interface OwnPropsOfExpandPanel {
  enabled: boolean;
  index: number;
  path: string;
  uischema: ControlElement;
  schema: JsonSchema;
  expanded: boolean;
  renderers?: JsonFormsRendererRegistryEntry[];
  cells?: JsonFormsCellRendererRegistryEntry[];
  uischemas?: JsonFormsUISchemaRegistryEntry[];
  rootSchema: JsonSchema;
  enableMoveUp: boolean;
  enableMoveDown: boolean;
  config: any;
  childLabelProp?: string;
  handleChange?(panel: string): (event: any, expanded: boolean) => void;
  translations: ArrayTranslations;
}

interface StatePropsOfExpandPanel extends OwnPropsOfExpandPanel {
  key: React.Key;
  childLabel: string;
  childPath: string;
  enableMoveUp: boolean;
  enableMoveDown: boolean;
}

/**
 * Dispatch props of a table control
 */
export interface DispatchPropsOfExpandPanel {
  disabled?: boolean;
  collapsible?: any;
  removeItems(path: string, toDelete: number[]): (event: any) => void;
  moveUp(path: string, toMove: number): (event: any) => void;
  moveDown(path: string, toMove: number): (event: any) => void;
  [additionalProps: string]: any;
}

export interface ExpandPanelProps
  extends StatePropsOfExpandPanel,
    DispatchPropsOfExpandPanel {}

const ExpandPanelRenderer = (props: ExpandPanelProps) => {
  const {
    childLabel,
    childPath,
    index,
    key,
    moveDown,
    moveUp,
    enableMoveDown,
    enableMoveUp,
    removeItems,
    path,
    rootSchema,
    schema,
    uischema,
    uischemas,
    renderers,
    cells,
    config,
    translations,
  } = props;

  const foundUISchema = useMemo(
    () =>
      findUISchema(
        uischemas as JsonFormsUISchemaRegistryEntry[],
        schema,
        uischema.scope,
        path,
        undefined,
        uischema,
        rootSchema
      ),
    [uischemas, schema, uischema.scope, path, uischema, rootSchema]
  );

  const appliedUiSchemaOptions = merge({}, config, uischema.options);

  const getExtra = () => {
    return (
      <ButtonGroup>
        <Tooltip key='1' content='Move up'>
          <IconButton
            aria-label={translations.upAriaLabel || ''}
            onClick={moveUp(path, index)}
            disabled={!enableMoveUp}
          >
            <ArrowUpIcon />
          </IconButton>
        </Tooltip>
        <Tooltip key='2' content='Move down'>
          <IconButton
            aria-label={translations.downAriaLabel || ''}
            onClick={moveDown(path, index)}
            disabled={!enableMoveDown}
          >
            <ArrowDownIcon />
          </IconButton>
        </Tooltip>
        {appliedUiSchemaOptions.showSortButtons ? (
          <Tooltip key='3' content='Delete'>
            <IconButton
              aria-label={translations.removeAriaLabel || ''}
              onClick={removeItems(path, [index])}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </ButtonGroup>
    );
  };

  return (
    <>
      <Accordion.Item key={key} value={key.toString()}>
        <Accordion.ItemTrigger>
          <Flex justifyContent='space-between' width='100%'>
            <Flex alignItems='center'>
              <Avatar.Root
                as='h4'
                size='sm'
                me='2'
                color='gray.800'
                bgColor='gray.100'
              >
                <Avatar.Fallback name={`${index + 1}`} />
              </Avatar.Root>
              <Hidden hidden={!childLabel}>
                <Text>{childLabel}</Text>
              </Hidden>
            </Flex>
            {getExtra()}
          </Flex>
        </Accordion.ItemTrigger>
        <Accordion.ItemContent pb={4}>
          <JsonFormsDispatch
            schema={schema}
            uischema={foundUISchema}
            path={childPath}
            key={childPath}
            renderers={renderers}
            cells={cells}
          />
        </Accordion.ItemContent>
      </Accordion.Item>
    </>
  );
};

/**
 * Maps state to dispatch properties of an expand pandel control.
 *
 * @param dispatch the store's dispatch method
 * @returns {DispatchPropsOfArrayControl} dispatch props of an expand panel control
 */
export const ctxDispatchToExpandPanelProps: (
  dispatch: Dispatch<ReducerAction<any>>
) => DispatchPropsOfExpandPanel = (dispatch) => ({
  removeItems:
    (path: string, toDelete: number[]) =>
    (event: any): void => {
      event.stopPropagation();
      dispatch(
        update(path, (array) => {
          toDelete
            .sort()
            .reverse()
            .forEach((s) => array.splice(s, 1));
          return array;
        })
      );
    },
  moveUp:
    (path: string, toMove: number) =>
    (event: any): void => {
      event.stopPropagation();
      dispatch(
        update(path, (array) => {
          moveUp(array, toMove);
          return array;
        })
      );
    },
  moveDown:
    (path: string, toMove: number) =>
    (event: any): void => {
      event.stopPropagation();
      dispatch(
        update(path, (array) => {
          moveDown(array, toMove);
          return array;
        })
      );
    },
});

/**
 * Map state to control props.
 * @param state the JSON Forms state
 * @param ownProps any own props
 * @returns {StatePropsOfControl} state props for a control
 */
export const withContextToExpandPanelProps = (
  Component: ComponentType<ExpandPanelProps>
): ComponentType<OwnPropsOfExpandPanel> =>
  function WithContextToExpandPanelProps({
    ctx,
    props,
  }: JsonFormsStateContext & ExpandPanelProps) {
    const dispatchProps = ctxDispatchToExpandPanelProps(ctx.dispatch);
    const { childLabelProp, schema, path, index, uischemas } = props;
    const childPath = composePaths(path, `${index}`);
    const childData = Resolve.data(ctx.core.data, childPath);
    const childLabel = childLabelProp
      ? get(childData, childLabelProp, '')
      : get(childData, getFirstPrimitiveProp(schema), '');

    return (
      <Component
        {...props}
        {...dispatchProps}
        childLabel={childLabel}
        childPath={childPath}
        uischemas={uischemas}
      />
    );
  };

export const withJsonFormsExpandPanelProps = (
  Component: ComponentType<ExpandPanelProps>
): ComponentType<OwnPropsOfExpandPanel> =>
  withJsonFormsContext(withContextToExpandPanelProps(Component));

export default withJsonFormsExpandPanelProps(ExpandPanelRenderer);
