import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface WrapperProps {
  variant?: 'small' | 'regular';
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant = 'regular' }) => (
  <Box mt={8} mx='auto' maxW={variant === 'regular' ? '800px' : '400px'} w='100%'>
    {children}
  </Box>
);

export default Wrapper;
