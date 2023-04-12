import styled from "@emotion/styled";
import { Typography } from "@mui/material";

interface textDecoration {
  textDecoration: string;
}

export const TaskStyled = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TaskText = styled(Typography)<textDecoration>`
  text-decoration: ${(props) => props.textDecoration};
`;
