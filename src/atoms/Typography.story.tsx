import * as React from "react";
import { storiesOf } from "@storybook/react";
import { View } from "react-native";
import { Typography } from "./Typography";
import { StorybookContainer } from "../utils";
import { text } from "@storybook/addon-knobs";

storiesOf("atoms", module)
  .addDecorator(StorybookContainer)
  .add("Typography", () => (
    <View>
      <Typography>Regular Text</Typography>
      <Typography bold>Bold Text</Typography>
      <Typography numberOfLines={1}>
        Long Text in a single line. Long Text in a single line . Long Text in a
        single line.
      </Typography>
      <Typography color={text("color", "blue")}>Colored Text</Typography>
    </View>
  ));
