import { configure, addDecorator, addParameters } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";

function loadStories() {
  const req = require.context("../src", true, /\.story\.tsx?$/);
  req.keys().forEach(story => req(story));
}

addDecorator(withKnobs({ escapeHTML: false }));
addParameters({
  viewport: { defaultViewport: "iphone6" },
  options: {
    showPanel: true,
    panelPosition: "right"
  }
});

configure(loadStories, module);
