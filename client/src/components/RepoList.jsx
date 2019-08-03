import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    <ol>
      {props.repos.map((repo, i) => {
        return <li key={i}><a href={repo.repoUrl}>{repo.repoName}</a> - {repo.username}</li>
      })}
    </ol>
    {/* There are {props.repos.length} repos. */}
  </div>
)

export default RepoList;