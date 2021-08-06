const core = require('@actions/core')
const github = require('@actions/github')
const validateBranchWorkflow = require('./validate-workflow')

try {
  const targetBranch = github.context.base_ref
  const sourceBranch = github.context.head_ref
  const validationResult = validateBranchWorkflow(targetBranch, sourceBranch)
  if (!validationResult) {
    core.setFailed('Source and Target branch does not satisfy gitflow workflow')
  }
} catch (err) {
  core.setFailed(err.message)
}
