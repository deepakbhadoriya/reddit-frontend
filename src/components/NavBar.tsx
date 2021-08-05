import React from 'react';
import { Button, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useLoginMutation, useMeQuery } from '../generated/graphql';

interface NavBarProps {}
const NavBar: React.FC<NavBarProps> = () => {
  const [{ fetching: logoutFetching }, logout] = useLoginMutation();
  const [{ data, fetching }] = useMeQuery();

  let body = null;

  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href='/login'>
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href='/register'>
          <Link>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <>
        {data.me.username}
        <Button ml={3} variant='link' onClick={() => logout()} isLoading={logoutFetching}>
          Logout
        </Button>
      </>
    );
  }

  return (
    <Flex bg='tomato' p={4} ml={'auto'} justifyContent='flex-end'>
      {body}
    </Flex>
  );
};
export default NavBar;
