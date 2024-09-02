import React from 'react';
import NavigationBar from '@/app/components/NavigationBar';
import RepoList from '@/app/components/RepoList';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
require('dotenv').config();

interface Issues {
  title: string;
  number: number;
}

interface ReportData {
  githubAccountName: string | null;
  owner: string | null;
  description: string | null;
  name: string | null;
  stars: number | null;
  forks: number | null;
  languages: string[];
  issues: Issues[];
}

// fetching the data on server side and passing it to a client component
const fetchData = async (): Promise<ReportData> => {
  try {
    const token = process.env.GITHUB_TOKEN;
    const url = 'https://api.github.com/repos/nodejs/node';
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch repsonse data');
    }
    const data = await response.json();

    const languageResponse = await fetch(data.languages_url, options);
    if (!languageResponse.ok) {
      throw new Error('Failed to fetch language data');
    }
    const languageData = await languageResponse.json();
    const language = Object.keys(languageData);

    const issuesResponse = await fetch(
      // removing the /number from the url
      data.issues_url.replace('{/number}', ''),
      options,
    );
    if (!issuesResponse.ok) {
      throw new Error('Failed to fetch issues data');
    }
    const issuesData = await issuesResponse.json();

    const session = await getServerSession(authOptions);

    return {
      githubAccountName: session?.user?.githubAccountName,
      owner: data.owner.login,
      name: data.name,
      description: data.description,
      stars: data.stargazers_count,
      forks: data.forks_count,
      languages: language,
      issues: issuesData,
    };
  } catch (err) {
    console.log('error while fetching data' + err);

    return {
      githubAccountName: null,
      owner: null,
      name: null,
      description: null,
      stars: null,
      forks: null,
      languages: [],
      issues: [],
    };
  }
};

const page = async () => {
  const {
    githubAccountName,
    owner,
    name,
    description,
    stars,
    forks,
    languages,
    issues,
  } = await fetchData();

  return (
    <>
      <RepoList
        githubAccouuntName={githubAccountName}
        owner={owner}
        name={name}
        description={description}
        stars={stars}
        forks={forks}
        languages={languages}
        issues={issues}
      />
      <NavigationBar />
    </>
  );
};

export default page;
