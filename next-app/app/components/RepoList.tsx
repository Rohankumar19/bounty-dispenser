'use client';
import React, { useState } from 'react';

interface Issues {
  title: string;
  number: number;
}

interface ReportData {
  owner: string | null;
  description: string | null;
  name: string | null;
  stars: number | null;
  forks: number | null;
  languages: string[];
  issues: Issues[];
}

// React.FC<> is used for type checking the props that are passed
const RepoList: React.FC<ReportData> = ({
  owner,
  description,
  name,
  stars,
  forks,
  languages,
  issues,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (!owner || !name) {
    return <div>Data Loading</div>;
  }

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
                    className="grid"
                    style={{
                      gridTemplateColumns: '100px 1fr',
                    }}
                    key={issue.number}
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
    </div>
  );
};

export default RepoList;
