const core = require('@actions/core')
const github = require('@actions/github')
const validateBranchWorkflow = require('./validate-workflow')

try {
  /* const token = core.getInput('GITHUB_TOKEN')
  const octikit = github.getOctokit(token)

  const PrNumber = github.context.payload.pull_request.number
  const repoOwner = github.context.payload.repository.owner.login
  const repoName = github.context.payload.repository.name
  octikit.request('/repos/{owner}/{repo}/pulls/{pull_number}', {
    owner: repoOwner,
    repo: repoName,
    pull_number: PrNumber
  })
  */
  console.log(JSON.stringify(github.context.payload.pull_request))
  const targetBranch = github.context.base_ref
  const sourceBranch = github.context.head_ref
  core.info('Target branch: ' + targetBranch)
  core.info('Source branch: ' + sourceBranch)
  console.log(github.context)
  const validationResult = validateBranchWorkflow(targetBranch, sourceBranch)
  if (!validationResult) {
    core.setFailed('Source and Target branch does not satisfy gitflow workflow')
  }
} catch (err) {
  core.setFailed(err.message)
}
