import React from 'react';
import NavigationBar from '../components/NavigationBar';
import RepoList from '../components/RepoList';

const page = () => {
  return (
    <>
      <RepoList />
      <NavigationBar />
    </>
  );
};

export default page;
