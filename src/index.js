const core = require('@actions/core')
const github = require('@actions/github')
const validateBranchWorkflow = require('./validate-workflow')

try {
  const targetBranch = github.context.payload.pull_request.base.ref
  const sourceBranch = github.context.payload.pull_request.head.ref
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
