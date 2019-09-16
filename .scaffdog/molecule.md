---
name: "molecule"
description: "molecule component template"
message: "Please enter the name of component to be created"
root: "./src/molecules"
output: "**/*"
ignore: []
---

# `{{ input }}.tsx`

```jsx
import React from 'react'
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

type Props = {}

export const {{ input }} : React.FC<Props>= ({}: Props):JSX.Element => (
<View style={styles.container}></View>
)

```

# `{{ input }}.story.tsx`

```jsx
import React from 'react';
import { storiesOf } from '@storybook/react';
import { {{ input }} } from './{{input}}'
import { StorybookContainer } from "../utils";

storiesOf("molecules", module)
  .addDecorator(StorybookContainer)
  .add("{{input}}", () => (
  <{{ input }} />
));
```
