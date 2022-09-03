import { LoadMoreButton } from './Button.styled';
import { Box } from '../Box';

export const Button = ({ onClick }) => {
  return (
    <Box display="flex" justifyContent="center">
      <LoadMoreButton type="button" onClick={onClick}>
        Load more...
      </LoadMoreButton>
    </Box>
  );
};
