'use client';
import React, { useState, useEffect } from 'react';

interface Issues {
  title: string;
  number: number;
}

interface ReportData {
  githubAccouuntName: string | null;
  owner: string | null;
  description: string | null;
  name: string | null;
  stars: number | null;
  forks: number | null;
  languages: string[];
  issues: Issues[];
}

interface IssuesWorkingOn {
  onwer: string;
  repo: string;
  issueNumber: number;
}

// React.FC<> is used for type checking the props that are passed
const RepoList: React.FC<ReportData> = ({
  githubAccouuntName,
  owner,
  description,
  name,
  stars,
  forks,
  languages,
  issues,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [IssuesWorkingOn, setIssuesWorkingOn] = useState<IssuesWorkingOn[]>([]);

  useEffect(() => {
    const updateIssues = async () => {
      if (!isModalOpen) {
        console.log(IssuesWorkingOn);
        try {
          console.log('working');
          const response = await fetch(
            `http://localhost:8000/api/user/${githubAccouuntName}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(IssuesWorkingOn),
            },
          );

          const data = await response.json();
          console.log(data);
        } catch (err) {
          console.log(err);
        }
        setIssuesWorkingOn([]);
      }
    };

    updateIssues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  if (!owner || !name) {
    return <div>Data Loading</div>;
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const updateIssues = (
    currentIssueNumber: number,
    checkboxStatus: boolean,
  ) => {
    if (checkboxStatus) {
      setIssuesWorkingOn([
        ...IssuesWorkingOn,
        {
          onwer: owner as string,
          repo: name as string,
          issueNumber: currentIssueNumber,
        },
      ]);
    } else {
      setIssuesWorkingOn((prevIssue) =>
        prevIssue.filter((issue) => issue.issueNumber !== currentIssueNumber),
      );
    }
  };

  return (
    <div className=" bg-main-background h-screen p-4">
      <div className="p-4 text-3xl">Repositories</div>
      <hr className="border-black border-1" />
      <div>
        <div
          className="border-2 m-4 border-card-border w-80 h-80 grid p-4 rounded-lg text-md grid-rows-5 gap-1 text-card-text bg-card-background transition-transform transform shadow-custom hover:-translate-y-2"
          style={{ gridTemplateRows: '30px 30px 1fr' }}
          onClick={toggleModal}
        >
          <div className="text-2xl">{owner}</div>
          <div>{name}</div>
          <div>{description}</div>
          <div>Stars: {stars}</div>
          <div>Forks: {forks}</div>
          <div>
            {languages.slice(0, 5).map((lan) => (
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
                {issues.map((issue, index) => (
                  <div
                    className="grid gap-4"
                    style={{
                      gridTemplateColumns: '100px 1fr',
                      gridAutoFlow: 'column',
                    }}
                    key={issue.number}
                  >
                    <div className="m-2">#{issue.number}</div>
                    <div className="m-2">{issue.title}</div>
                    <div>
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          updateIssues(issue.number, e.target.checked)
                        }
                      />
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
    </div>
  );
};

export default RepoList;
