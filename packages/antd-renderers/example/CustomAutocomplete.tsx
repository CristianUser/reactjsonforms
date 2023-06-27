import {
  AnyAction,
  ControlProps,
  Dispatch,
  OwnPropsOfEnum,
  RankedTester,
  withIncreasedRank,
  Actions,
} from '@jsonforms/core';
import { ExtendedUnwrapped } from '../src/extended';
import { autocompleteOneOfEnumControlTester } from '../src/extended/AntdAutocompleteOneOfEnumControl';
import { withJsonFormsOneOfEnumProps } from '@jsonforms/react';
import React from 'react';
import { Typography } from 'antd';

const MyAutocompleteControl = (props: ControlProps & OwnPropsOfEnum) => {
  return (
    <ExtendedUnwrapped.AutocompleteOneOfEnumControl
      {...props}
      renderOption={(option) => (
        <Typography.Text>{`${option?.value}\t-\t${option?.label}`}</Typography.Text>
      )}
      filterOptions={(options, state) =>
        options.filter(
          (o) =>
            o.label.includes(state.inputValue) ||
            o.value.includes(state.inputValue)
        )
      }
    />
  );
};

const myAutocompleteTester: RankedTester = withIncreasedRank(
  1,
  autocompleteOneOfEnumControlTester
);

const ConnectedControl = withJsonFormsOneOfEnumProps(MyAutocompleteControl);

export const ExampleExtension = (dispatch: Dispatch<AnyAction>) => (
  <div>
    <button
      onClick={() =>
        dispatch(
          Actions.registerRenderer(myAutocompleteTester, ConnectedControl)
        )
      }
    >
      Register Custom OneOf Autocomplete
    </button>
    <button
      onClick={() =>
        dispatch(
          Actions.unregisterRenderer(myAutocompleteTester, ConnectedControl)
        )
      }
    >
      Unregister Custom OneOf Autocomplete
    </button>
  </div>
);
