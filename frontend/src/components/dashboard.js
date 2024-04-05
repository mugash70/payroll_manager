import React from 'react';
import { Flex, Box, Heading, Text, Button } from '@chakra-ui/react';
import Sidebar from './common/sidebar'
const dashboard = () => {
  return (
    <Flex direction="column" h="100vh" p={4}>
        <Sidebar/>
      <Box mb={4}>
        <Heading size="lg">Dashboard</Heading>
      </Box>
      <Box flex="1">
        <Text mb={4}>Welcome to your dashboard!</Text>
        {/* Your dashboard content goes here */}
      </Box>
      <Box>
        <Button colorScheme="blue">Logout</Button>
      </Box>
    </Flex>
  );
};

export default dashboard;
