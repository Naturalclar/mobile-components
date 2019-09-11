import * as React from "react";
import { Text } from "react-native";
import Colors from "../constants/Colors";

interface Props {
  children: React.ReactNode;
  size?: number;
  bold?: boolean;
  color?: string;
  numberOfLines?: number;
  onPress?: () => void;
}

export const Typography: React.FC<Props> = ({
  size = 16,
  children,
  bold = false,
  color = Colors.fontBlack,
  numberOfLines,
  onPress
}: Props): JSX.Element => (
  <Text
    style={{
      fontSize: size,
      lineHeight: size * 1.34,
      fontWeight: bold ? "bold" : "normal",
      color
    }}
    numberOfLines={numberOfLines}
    onPress={onPress}
  >
    {children}
  </Text>
);
