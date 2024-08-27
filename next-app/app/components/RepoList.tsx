'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
require('dotenv').config();

const RepoList = () => {
  interface issues {
    title: string;
    number: number;
  }

  interface ReportData {
    onwer: string;
    description: string;
    name: string;
    stars: number;
    forks: number;
    languages: string[];
    issues: issues[];
  }

  const [reportData, setReportData] = useState<ReportData>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    async function getRepo() {
      try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
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
        console.log(data);

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
        console.log(issuesData);

        setReportData({
          onwer: data.owner.login,
          name: data.name,
          description: data.description,
          stars: data.stargazers_count,
          forks: data.forks_count,
          languages: language,
          issues: issuesData,
        });
      } catch (err) {
        console.log(err);
      }
    }

    getRepo();
  }, []);

  return (
    <div className=" bg-main-background h-screen p-4">
      <div className="p-4 text-3xl">Repositories</div>
      <hr className="border-black border-1" />
      {/* ? is for optional checking if reportData is null */}
      {reportData ? (
        <div>
          <div
            className="border-2 m-4 border-card-border w-80 h-80 grid p-4 rounded-lg text-md grid-rows-5 gap-1 text-card-text bg-card-background transition-transform transform shadow-custom hover:-translate-y-2"
            style={{ gridTemplateRows: '30px 30px 1fr' }}
            onClick={toggleModal}
          >
            <div className="text-2xl">{reportData.onwer}</div>
            <div>{reportData.name}</div>
            <div>{reportData.description}</div>
            <div>Stars: {reportData.stars}</div>
            <div>Forks: {reportData.forks}</div>
            <div>
              {reportData.languages.slice(0, 5).map((lan) => (
                <span key={lan}>{lan}, </span>
              ))}
            </div>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-70 border-black border-2 flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg w-3/4 max-w-2xl h-3/4 overflow-auto">
                <div className="text-3xl mb-2">Issues</div>
                <hr className="mb-2 border-black" />
                <div>
                  {reportData.issues.map((issue, index) => (
                    <div
                      className="grid"
                      style={{
                        gridTemplateColumns: '100px 1fr',
                      }}
                    >
                      <div key={issue.number} className="m-2">
                        #{issue.number}
                      </div>
                      <div key={index} className="m-2">
                        {issue.title}
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center self-center">
                    <button
                      className="w-20 bg-main-background border-black border-2 p-2 rounded-md"
                      onClick={toggleModal}
                    >
                      close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="m-4">loading please wait</div>
      )}
    </div>
  );
};

export default RepoList;
