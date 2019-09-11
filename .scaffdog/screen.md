---
name: 'screen'
description: 'screen component template'
message: 'Please enter the name of component to be created'
root: './src/screens'
output: '**/*'
ignore: []
---

# `{{ input }}.tsx`

```jsx
import React, {Dispatch} from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { RootState, ThunkAction } from "../../types";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

interface Props {}

export const {{ input }} = ({}: Props) => (
<View style={styles.container}></View>
)

export class {{ input }} extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
      </View>
    )
  }
}

const StateToProps = (state: RootState) => {
  return {

  }
}

const DispatchToProps = (dispatch: Dispatch<ThunkAction>) => {
  return {

  }
}

export default connect(StateToProps,DispatchToProps)({{ input }})

```

# `{{ input }}.story.tsx`

```jsx
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from '../reducer'
import {{ input }} from './{{input}}'

const initialState = {}
const mockStore = createStore(reducer, initialState, applyMiddleware(thunk))

storiesOf("screens", module)
  .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
  .add("{{input}}", () => (
    <{{ input }} />
));
```
