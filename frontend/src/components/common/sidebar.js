import { Flex, Box, VStack, Text, IconButton, Divider } from '@chakra-ui/react';
import { RiCloseLine } from 'react-icons/ri';

const Sidebar = ({ onClose }) => {
  return (
    <Box
      pos="fixed"
      top="0"
      left="0"
      h="100vh"
      w="250px"
      bg="gray.800"
      color="white"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      zIndex="999"
    >
      <Flex justify="space-between" align="center" p={4}>
        <Text fontSize="xl" fontWeight="bold">
          Sidebar
        </Text>
        <IconButton
          aria-label="Close sidebar"
          icon={<RiCloseLine />}
          onClick={onClose}
          variant="ghost"
          color="white"
          fontSize="24px"
          _hover={{ color: 'gray.300' }}
        />
      </Flex>
      <Divider />
      <VStack spacing={4} p={4}>
        <Text>Link 1</Text>
        <Text>Link 2</Text>
        <Text>Link 3</Text>
        {/* Add more sidebar links */}
      </VStack>
    </Box>
  );
};

export default Sidebar;
