import { LinkLabel, LiContainer } from "./styles";
import { useLocation } from "react-router-dom";

interface TabProps {
  path: string;
  label: string;
  selected: boolean;
}

const Tab = ({ path, label, selected }: TabProps) => {
  return (
    <LiContainer selected={selected}>
      <LinkLabel to={path} selected={selected}>
        {label}
      </LinkLabel>
    </LiContainer>
  );
};

export default Tab;
