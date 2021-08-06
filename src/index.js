const validateBranchWorkflow = require('validate-workflow')
const core = require('@actions/core')
const github = require('@actions/github')

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

console.log(validateBranchWorkflow)
